<template>
    <Row>
        <Col span="12">
            <!--            <Alert type="success" show-icon>成功提示文案</Alert>-->
            <br>
            <Upload
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
            <div>
                <ul>
                    {{sfjsjl}}
                    {{fileList}}
                    <li v-for="i in fileList">{{ i }}</li>
                </ul>
            </div>
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
            fileList: []
        }
    },
    components: {
        AttrInput
    },
    methods: {
        handleUpload (file) {
            this.fileList = file;
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

            formData.append("files", this.fileList)
            // 添加自定义参数，不传可删除
            formData.append('category', this.$refs['paramForm'].getCategory())
            formData.append('tags', this.$refs['paramForm'].getSelectedTags())
            formData.append('skipError', this.$refs['paramForm'].getSkipError())
            formData.append('description', this.$refs['paramForm'].getDesc())

            await DocRequest.docUploadBatch(formData, null).then(res => {
                if (res.code === 200) {
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("上传出错：" + res.message)
                }
            }).catch(err => {
                this.$Message.error("上传出错！")
            })
        }
    }
}
</script>

<style scoped>


/deep/ .ivu-upload-list {
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>