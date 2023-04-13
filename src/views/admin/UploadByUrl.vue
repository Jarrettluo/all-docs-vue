<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formItem" label-position="top">
                <Form-item label="文档链接">
                    <Input v-model="formItem.input" placeholder="请输入链接"></Input>
                </Form-item>
                <Form-item label="文档分类">
                    <Select v-model="formItem.select" placeholder="请选择">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item label="文档标签">
                    <Input v-model="formItem.input" placeholder="请输入链接"></Input>
                </Form-item>
                <Form-item label="文档详情">
                    <Input v-model="formItem.input3" type="textarea" :rows="4"></Input>
                </Form-item>
            </Form>

            <submit-button
                :src="buttonSrc"
                label="开始上传"
                @click="login"
            ></submit-button>

        </Col>
        <Col span="12">

        </Col>
    </Row>

</template>

<script>
import SubmitButton from '@/components/SubmitButton'


export default {
    name: "UploadDirectory2",
    data() {
        return {
            formItem: {},
            buttonSrc: require("@/assets/source/upload.png"),
        }
    },
    components: {
        SubmitButton
    }
}
</script>

<style scoped>

</style>
