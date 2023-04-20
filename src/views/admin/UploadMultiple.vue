<template>
    <Row>
        <Col span="12">
<!--            <Alert type="success" show-icon>成功提示文案</Alert>-->
            <br>
            <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #ffcc4f"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
            <attr-input></attr-input>

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
}
</script>

<style scoped>


/deep/ .ivu-upload-list {
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>