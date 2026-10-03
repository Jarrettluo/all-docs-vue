<template>
    <div class="operation-container">
        <div class="item"
             :class="{
            'disabled': isDisabled,
            'pushed': (item.index === '1' && likeStatus === 1) || (item.index === '2' && collectStatus === 1),
            'animating': animatingItem === item.index
            }"
             v-for="item in data" @click="operate(item)">
            <div class="item-logo">
                <img :src="item.src" :alt="item.src">
            </div>
            <div class="operation-title">
                {{ itemName(item) }}
            </div>
        </div>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';

import Document from "@/api/document";

import StaticSource from "@/api/staticSourceUrl"

import { throttle } from '@/utils/throttle';


export default {
    name: "docOperation",
    data() {
        return {
            data: [
                {
                    name: "竖个大拇指",
                    nameLiked: "已点赞",
                    src: require("@/assets/source/like.png"),
                    index: "1"
                },
                {
                    name: "马上收藏",
                    nameCollected: "已收藏",
                    src: require("@/assets/source/heart.png"),
                    index: "2"
                },
                {
                    name: "立马下载",
                    src: require("@/assets/source/download.png"),
                    index: "3"
                },
            ],
            docId: this.$route.query.docId,

            isDisabled: false,
            animatingItem: null
        }
    },
    props: {
        likeStatus: Number,
        collectStatus: Number
    },
    computed: {
        itemName() {
            return (item) => {
                if (item.index === "1") {
                    return this.likeStatus === 1 ? item.nameLiked : item.name;
                }
                if (item.index === "2") {
                    return this.collectStatus === 1 ? item.nameCollected : item.name;
                }
                return item.name;
            }
        }
    },
    mounted() {

    },
    methods: {
        operate(item) {
            if (item.index === "3") {
                // window.open(StaticSource.docPreviewUrl(this.docId), "_blank");
                this.generateDownLoadLink(this.docId)
            } else if (item.index === "1" || item.index === "2") {
                this.triggerAnim(item)
                this.$emit("addLike", Number(item.index))
            }
        },
        triggerAnim(item) {
            this.animatingItem = item.index
            setTimeout(() => {
                this.animatingItem = null
            }, 300)
        },
        /*
        * 防止下载链接泄漏，必须经过后台下载核验
        * 产生一个下载码给到前端，前端带校验码进行下载
         */
        async generateDownLoadLink(docId = "") {
            this.disabled = true;
            const param = {
                fileId: docId
            }
            this.$Notice.success({
                title: '开始下载文件',
                desc: ""
            });
            await Document.generateDownloadKey(param).then(response => {
                if (response.code !== 200) {
                    this.$Message.error('请检查后重试！');
                    this.disabled = false;
                } else {
                    this.downloadFile(
                        {
                            fileId: docId,
                            hmac: encodeURIComponent(response.data),
                            userId: localStorage.getItem("id")
                    })
                }
            }).catch(err => {
                this.$Message.error("下载失败");
                this.disabled = false
            })
        },

        // 通过下载链接进行下载，可以获取到下载的进度
        async downloadFile(inParam) {
            try {
                const token = localStorage.getItem("token")

                const xhr = new XMLHttpRequest();
                let param = "?fileId=" + inParam.fileId;
                param = param + "&hmac=" + inParam.hmac;
                param = param + "&userId=" + inParam.userId;
                const url = StaticSource.downloadFileUrl(param);

                xhr.open('GET', url, true);
                xhr.responseType = 'blob'; // 设置响应类型为 blob

                // 添加自定义头部
                xhr.setRequestHeader('Authorization', token); // 例如添加认证头部

                // throttle 函数确保进度更新函数不会在每次事件触发时都被调用，而是在指定的时间间隔内调用一次。
                xhr.onprogress = throttle((event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        this.updateProgress(progress);
                    }
                }, 300);

                // 下载完成处理
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const contentDisposition = xhr.getResponseHeader('Content-Disposition');
                        const filename = contentDisposition ? contentDisposition.split('fileName=')[1] :
                            'default-filename.ext';
                        saveAs(blob, decodeURIComponent(filename));
                        // this.handleDownloadFile(xhr.response);
                    }
                };

                xhr.onerror = function() {
                    console.error('Download failed');
                };

                xhr.send();
            } catch (error) {
                console.error('Download failed', error);
            } finally {
                this.disabled = false;
            }
        },

        updateProgress(percentComplete) {
            if (percentComplete % 25 === 0) {
                this.$Notice.success({
                    title: '下载文件进度：' + percentComplete + "%",
                    desc: ""
                });
            }
        },

        async downloadFile2(param) {
            try {
                // 获取文件下载链接
                const response = await Document.downloadFile(param);
                this.handleDownloadFile(response)
            } catch (error) {
                console.error('Download failed', error);
            } finally {
                this.disabled = false;
            }
        },
        /*
        用户根据下载码对文件进行下载
         */
        async downloadFile1(param) {
            await Document.downloadFile(param)
                .then((response) => {
                    // 获取响应的内容类型
                    const contentType = response.headers['content-type'];

                    // 检查响应内容类型是否为 JSON
                    if (contentType && contentType.includes('application/json')) {
                        this.handleDownloadErrorInfo(response)
                    } else {
                        // 从 response headers 中提取文件名
                        const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
                        let filename = 'default-filename.ext';

                        if (contentDisposition && contentDisposition.includes('attachment')) {
                            // 使用正则表达式提取文件名
                            const filenameMatch = contentDisposition.match(/fileName\*?=['"]?(?:UTF-8'')?(.+?)['"]?(?:;|$)/);

                            // 确保 filenameMatch 不为 null 并且长度足够
                            if (filenameMatch && filenameMatch.length > 1) {
                                filename = decodeURIComponent(filenameMatch[1]);
                            }
                        }

                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(url);
                    }
                    this.disabled = false;
                })
                .catch((error) => {
                    console.error('Download failed', error);
                    this.disabled = false;
                });
        },

        handleDownloadFile(response) {
            // 检查响应的内容类型
            const contentType = response.headers['content-type'];

            if (contentType && contentType.includes('application/json')) {
                // 处理 JSON 响应，通常表示错误信息
                this.handleDownloadErrorInfo(response);
            } else {
                // 从 response headers 中提取文件名
                const contentDisposition = response.headers['content-disposition']
                    || response.headers['Content-Disposition'];
                let filename = 'default-filename.ext';

                if (contentDisposition && contentDisposition.includes('attachment')) {
                    // 使用正则表达式提取文件名
                    const filenameMatch = contentDisposition.match(/fileName\*?=['"]?(?:UTF-8'')?(.+?)['"]?(?:;|$)/);

                    // 确保 filenameMatch 不为 null 并且长度足够
                    if (filenameMatch && filenameMatch.length > 1) {
                        filename = decodeURIComponent(filenameMatch[1]);
                    }
                }

                // 将响应数据转换为 Blob
                const blob = new Blob([response.data], { type: contentType });

                // 使用 FileSaver.js 保存文件
                saveAs(blob, filename);
            }
        },
        handleDownloadErrorInfo(response) {
            // 读取 Blob 数据为文本
            const reader = new FileReader();
            reader.onload = function() {
                const text = reader.result;
                try {
                    const errorData = JSON.parse(text);
                    // 根据错误信息显示提示
                    alert(`下载文件异常: ${errorData.message || '未知异常'}`);
                } catch (e) {
                    // 无法解析 JSON，显示原始错误
                    alert(`下载文件异常: ${text || '未知异常'}`);
                }
            };
            reader.readAsText(response.data); // 读取 Blob 数据为文本
        },
    }
}
</script>

<style scoped>
.operation-container {
    width: 50%;
    min-width: 400px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    height: 200px;
}

.item {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    margin: auto;
    position: relative;

    background: #FACF36;
    border: 2px solid #000000;
}

.item:hover {
    background-color: #f1db77;
    cursor: pointer;
    border: 2px #2d2c2b solid;
}

.pushed {
    background-color: #f1db77;
}

.operation-title {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-weight: 500;
    color: #000000;
    line-height: 20px;
}

.item-logo {
    height: 80px;
    line-height: 80px;
    width: 120px;
}

.item-logo img {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
}

img {
    /*width: 48px;*/
    /*height: 48px;*/
}

.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none; /* Prevents click events */
}

.animating {
    animation: clickAnim 0.3s ease-out;
}

@keyframes clickAnim {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
}
</style>