<template>
    <Row>
        <Col span="12">
<!--            <Alert type="success" show-icon>成功提示文案</Alert>-->
            <br>
            <Upload
                multiple
                type="drag"
                action="">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #ffcc4f"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
            <attr-input
                @startUpload="startUpload"
            ></attr-input>

        </Col>
        <Col span="12"></Col>
    </Row>
</template>

<script>

import AttrInput from '@/components/Form/AttrInput'
export default {
    name: "UploadMultiple",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
            selectedTags:{},
            switch1: true
        }
    },
    components: {
        AttrInput
    },
    methods: {
        startUpload(value) {
            this.$Message.info(value)
        },
        //上传服务器
        submitUpload() {
            //判断是否有文件再上传
            if (this.fileList.length === 0) {
                return this.$Message.warning('请选取文件后再上传')
            }
            // 下面的代码将创建一个空的FormData对象:
            const formData = new FormData()
            // 你可以使用FormData.append来添加键/值对到表单里面；
            this.fileList.forEach((file) => {
                formData.append('file', file.raw)
            })
            // 添加自定义参数，不传可删除
            formData.append('parentId', '49')
            formData.append('uploadType', '备料单')
            formData.append('versions', 'v4.0')

            //自定义的接口也可以用ajax或者自己封装的接口
            request({
                method: 'POST',
                url: '/uploadFile',   //填写自己的接口
                data: formData        //填写包装好的formData对象
            }).then(res => {
                if (res.data.code == 200) {
                    this.$Message.success('上传成功');
                } else {
                    this.$Message.error('上传失败');
                }
                //清空fileList
                this.fileList = []
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