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
            <Form :model="formTop" label-position="top">
                <Form-item label="分类选择">
                    <Input v-model="formTop.input1"></Input>
                </Form-item>
                <Form-item label="标签选择">
<!--                    <Input v-model="formTop.input2"></Input>-->
                    <tags-input element-id="tags"
                                v-model="selectedTags"
                                :existing-tags="[
                                    { key: 'web-development', value: 'Web Development' },
                                    { key: 'php', value: 'PHP' },
                                    { key: 'javascript', value: 'JavaScript' },
                                ]"
                                typeahead="true">
                    </tags-input>
                </Form-item>
                <Form-item label="文档详情">
                    <Input v-model="formTop.input3" type="textarea" :rows="4"></Input>
                </Form-item>
            </Form>
            异常跳过
            <i-switch v-model="switch1" @on-change="change"></i-switch>
            <submit-button
                :src="buttonSrc"
                label="开始上传"
                @click="login"
            ></submit-button>
        </Col>
        <Col span="12"></Col>
    </Row>
</template>

<script>

import SubmitButton from '@/components/SubmitButton'
import VoerroTagsInput from '@voerro/vue-tagsinput';

// Vue.component('tags-input', VoerroTagsInput);

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
        SubmitButton,
        'tags-input':VoerroTagsInput,

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