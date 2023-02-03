<template>
    <div>
        <div class="nav">
            <Nav></Nav>
        </div>
        <div class="main-container">
            <div class="title-info">
                <div class="doc-trim" style="text-align: center">
                    <img :src=" thumbId | imgSrc " alt="thumb"
                         style="width: 36px;max-height: 48px;border: 1px solid #dcdee2; border-radius: 2px">
                </div>
                <div class="doc-info">
                    <div class="doc-info-title">
                        {{ title }}
                    </div>
                    <div class="doc-info-tag">
                        <Tag :color="item.color" v-for="item in tags" :index="item.index">{{ item.name }}</Tag>
                    </div>
                    <div class="doc-info-detail">
                        👍 {{likeCount}} 👋 {{collectCount}} 😊 {{ userName }}  ⏰ {{ createTime }}
                    </div>

                </div>
            </div>
            <div class="doc-preview">
                <!--                <PdfView></PdfView>-->
                <component :is="component"
                           v-if="component"/>
            </div>
            <div class="doc-operation-body">
                <doc-operation :likeStatus="likeStatus" :collectStatus="collectStatus"
                               @addLike="addLike"
                />
            </div>
            <div class="doc-comment">
                <comment-page/>
            </div>

        </div>
    </div>

</template>

<script>
// import PdfView from "./PngView"
import { BackendUrl } from '@/api/request'

import Nav from "@/components/Nav"
import DocRequest from "@/api/document"
import {parseTime} from "@/utils/index"

import DocOperation from "./docOperation"

import CommentPage from "./CommentPage"

export default {
    data() {
        return {
            title: "",
            userName: "",
            docId: "",
            tags: [],
            createTime: new Date(),
            thumbId: "",
            component: null,
            tagColor: ['orange', 'gold', 'lime', 'cyan', 'blue', 'geekblue', 'magenta'],

            collectCount: 0,
            likeCount: 0,
            likeStatus: 0,
            collectStatus: 0
        }
    },
    components: {
        Nav, DocOperation, CommentPage
    },
    mounted() {

    },
    filters: {
        imgSrc(value) {
            if (value === "" || value == null) {
                return require('@/assets/source/doc.png');
            } else {
                return BackendUrl() + "/files/image2/" + value;
            }
        }
    },
    created() {
        this.init()
        this.getLikeInfo();
    },
    methods: {
        init() {
            this.docId = this.$route.query.docId;
            var params = {
                docId: this.docId
            }
            DocRequest.getData(params).then(response => {
                if (response.code == 200) {
                    this.title = response.data.title;
                    this.userName = response.data.userName;
                    this.thumbId = response.data.thumbId;
                    var docTime = response.data.createTime;
                    this.createTime = parseTime(new Date(docTime), '{y}年{m}月{d}日 {h}:{i}:{s}');

                    let tagList = response.data['tagVOList'];
                    this.tags = this.renderTags(tagList);

                    let title = response.data.title
                    let suffix = title.split(".")[title.split('.').length - 1];
                    switch (suffix) {
                        case 'pdf':
                            this.component = () => import('@/views/preview/index2')
                            break
                        case 'png':
                        case 'jpg':
                        case 'jpeg':
                            this.component = () => import('@/views/preview/PngView')
                            break
                        case 'html':
                        case 'txt':
                            this.component = () => import('@/views/preview/HtmlView')
                            break
                        case 'docx':
                        case 'doc':
                            this.component = () => import('@/views/preview/WordView3')
                            break
                        case 'pptx':
                            this.component = () => import('@/views/preview/PPTxView')
                            break
                        case 'xlsx':
                            this.component = () => import('@/views/preview/excel2')
                            break
                        default:
                            this.component = () => import('@/views/preview/ErrorView')
                            break
                    }
                }
            })
        },

        renderTags(tags) {
            tags.forEach((item, index) => {
                item['index'] = index;
                item['color'] = this.tagColor[parseInt(Math.random() * this.tagColor.length)];
            })
            return tags;
        },

        async getLikeInfo() {
            let param= {
                entityId: this.docId
            }
            await DocRequest.getLikeInfo(param).then(res => {
                if (res.code == 200) {
                    let result = res.data;
                    this.collectCount = result.collectCount || 0;
                    this.likeCount = result.likeCount || 0;
                    this.likeStatus = result.likeStatus || 0;
                    this.collectStatus = result.collectStatus || 0
                } else {
                    this.$Message.info("error")
                }
            }).catch(err => {
                this.$Message.info("error")
            })
        },
        async addLike(entityType) {
            if (entityType !== 1 && entityType !== 2) {
                return
            }

            let params = {
                entityType: entityType,
                entityId: this.docId
            }
            await DocRequest.addLike({params}).then(res => {
                if (res.code == 200) {
                    let result = res.data;
                    if (entityType === 1) {
                        this.likeCount = result.likeCount || 0;
                        this.likeStatus = result.likeStatus || 0;
                        if (this.likeStatus === 0) {
                            this.$Message.info("取消点赞！")
                        } else {
                            this.$Message.success("点赞成功！")
                        }
                    } else {
                        this.collectCount = result.likeCount || 0;
                        this.collectStatus = result.likeStatus || 0;
                        if (this.collectStatus === 0) {
                            this.$Message.info("取消收藏！")
                        } else {
                            this.$Message.success("收藏成功！")
                        }
                    }
                } else {
                    this.$Message.info("error")
                }
            }).catch(err => {
                this.$Message.info("error")
            })
        }

    }

}
</script>

<style lang="scss" scoped>
.nav {
    background-color: #f4d057;
    width: 100%;
    height: 50px;
    //position: absolute;
    //left: 0;
    //top: 0;
}

.main-container {
    width: 1200px;
    //height: 100vh;
    //background-color: yellowgreen;
    padding: 25px;
    margin: auto;
    box-sizing: content-box;

    .title-info {
        height: 185px;
        width: 1200px;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
        padding: 36px;
        display: block;

        .doc-trim {
            float: left;
            width: 40px;
            //background-color: lightblue;
            height: 40px;
            line-height: 40px;
            display: block;
        }

        .doc-info {
            display: block;
            width: calc(100% - 40px);
            float: left;
            padding: 0 10px;
            text-align: left;

            .doc-info-title {
                font-size: 24px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #000000;
                line-height: 33px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .doc-info-tag {
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: flex-start;
                padding-top: 8px;
            }

            .doc-info-detail {
                height: 40px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 20px;
            }

        }
    }

    .doc-preview {
        margin: 20px 0;
        overflow-y: auto;
        height: 100vh;
        padding: 10px 0;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
    }

    .doc-operation-body {
        height: 200px;
        //line-height: 200px;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
    }

    .doc-comment {

        margin: 20px 0;

        background-color: #42b983;
        min-height: 120px;

        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;

        padding: 36px 40px;
    }
}

</style>