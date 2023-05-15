<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formTop" label-position="top">
                <Form-item label="文档选择">
                    <div class="fileUpload">
                        <a href="javascript:" class="file">选择文件夹
                            <input type="file" name="" id="file2" @change="selectFolder($event)" multiple directory mozdirectory webkitdirectory>
                        </a>
                    </div>
                    <div class="file-container">
                    </div>
                </Form-item>
            </Form>
            <div class="upload-swap" v-show="fileName.length > 0">
                <ul>
                    <li v-for="i in fileName">{{ i }}</li>
                </ul>
            </div>
            <Progress v-if="showProgress" :percent="uploadProcess*100" hide-info></Progress>

            <attr-input
                ref="paramForm"
                @startUpload="startUpload"
            ></attr-input>
        </Col>
        <Col span="12">

        </Col>
    </Row>

</template>

<script>

import AttrInput from '@/components/Form/AttrInput'
import DocRequest from '@/api/document'

export default {
    name: "UploadDirectory",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
            selectedFiles: [],
            fileName: [],
            showProgress: false,
            uploadProcess: 0
        }
    },
    components: {
        AttrInput
    },
    methods: {
        selectFolder(e) {
            // 文件夹下所有文件
            this.selectedFiles = e.target.files;
            for(let i = 0; i< this.selectedFiles.length; i ++) {
                let file = this.selectedFiles[i]
                if (this.fileName.indexOf(file.name) < 0) {
                    this.fileName.push(file.name)
                }
            }

        },
        async startUpload() {
            if (this.selectedFiles == null || this.selectedFiles.length == 0) {
                return;
            }
            // 下面的代码将创建一个空的FormData对象:
            const formData = new FormData()
            for(let i = 0; i< this.selectedFiles.length; i ++) {
                formData.append("files", this.selectedFiles[i])
            }

            // 添加自定义参数，不传可删除
            formData.append('category', this.$refs['paramForm'].getCategory() || "")
            formData.append('tags', this.$refs['paramForm'].getSelectedTags() || [])
            formData.append('skipError', this.$refs['paramForm'].getSkipError() || false)
            formData.append('description', this.$refs['paramForm'].getDesc() || "")

            const config = {
                onUploadProgress: (progressEvent) => {
                    // progressEvent.loaded:已上传文件大小
                    // progressEvent.total:被上传文件的总大小
                    this.uploadProcess = Number(
                        ((progressEvent.loaded / progressEvent.total) * 0.99).toFixed(2)
                    );
                },
            };
            this.showProgress = true
            await DocRequest.docUploadBatch(formData, config).then(res => {
                if (res.code === 200) {
                    this.$Message.success("成功！" + res.data)
                    this.uploadProcess = 1;
                } else {
                    this.$Message.error("上传出错：" + res.message)
                    this.uploadProcess = 0;
                }
                this.showProgress = false
            }).catch(err => {
                this.$Message.error("上传出错！")
                this.showProgress = false
                this.uploadProcess = 0;
            })
            this.selectedFiles = []
            this.fileName = []
        }
    }

}
</script>

<style scoped lang="scss">
.fileUpload {
    width: 120px;
    line-height: 32px;
    background-color: #ffcc4f;
    border-radius: 8px;
    border: 1px #f5bb3a solid;
    text-align: center;
    color: #fffeff;

    &:hover {
        cursor: pointer;
    }

    a {
        color: #fffeff;
        width: 120px;
    }

    .file input {
        //width: 120px;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0; /*关键点*/
        filter: alpha(opacity=0); /*兼容ie*/
        font-size: 100px; /* 增大不同浏览器的可点击区域 */
        cursor: pointer;
    }
}

//.file-container {
//    max-height: 200px;
//    overflow-y: auto;
//    width: 100%;
//    padding: 5px 10px 5px 0;
//    font-size: 10px;
//}

.upload-swap {
    background-color: #eeeeee;
    text-decoration: none;
    max-height: 120px;
    overflow-y: auto;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 10px;
}

</style>