<template>
    <Row>
        <Col span="12">
            <!--            <Alert type="success" show-icon>成功提示文案</Alert>-->
            <br>
            <Upload
                ref="upload"
                multiple
                type="drag"
                action=""
                :auto-upload="false"
                :before-upload="handleUpload"
            >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #ffcc4f"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
            <div class="upload-swap" v-show="fileName.length > 0">
                <ul>
                    <li v-for="i in fileName">{{ i }}</li>
                </ul>
            </div>

            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url" alt="">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Progress v-if="showProgress" :percent="uploadProcess*100" hide-info></Progress>

            <attr-input
                ref="paramForm"
                @startUpload="startUpload"
            ></attr-input>

        </Col>
        <Col span="12"></Col>
    </Row>
</template>

<script>

import AttrInput from '@/components/Form/AttrInput'
import DocRequest from '@/api/document'

export default {
    name: "UploadMultiple",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
            selectedTags: {},
            switch1: true,
            fileList: [],
            fileName: [],
            uploadList: [],
            uploadProcess: 0,
            showProgress: false
        }
    },
    components: {
        AttrInput
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        handleUpload(file) {
            this.fileList.push(file);
            if (this.fileName.indexOf(file.name) < 0) {
                this.fileName.push(file.name)
            }
            return false;
        },
        //上传服务器
        async startUpload() {
            //判断是否有文件再上传
            if (this.fileList.length === 0) {
                return this.$Message.warning('请选取文件后再上传')
            }
            // 下面的代码将创建一个空的FormData对象:
            const formData = new FormData()

            let tagList = []
            let tags = this.$refs['paramForm'].getSelectedTags()
            if (tags !== null && tags !== undefined) {
                tagList = tags
            }
            let cate = this.$refs['paramForm'].getCategory() || ""

            for (let i = 0; i < this.fileList.length; i++) {
                formData.append("files", this.fileList[i])
            }
            // 添加自定义参数，不传可删除
            formData.append('category', cate)
            formData.append('tags', tagList)
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
                    this.$Message.success("成功:" + res.data)
                    this.uploadProcess = 1
                } else {
                    this.$Message.error("上传出错：" + res.message)
                    this.uploadProcess = 0
                }
                this.showProgress = false
            }).catch(err => {
                console.error("上传出错信息" + err);
                this.$Message.error("上传出错！")
                this.uploadProcess = 0
                this.showProgress = false
            })
            this.fileList = []
            this.fileName = []
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
    }
}
</script>

<style scoped>


/deep/ .ivu-upload-list {
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}

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