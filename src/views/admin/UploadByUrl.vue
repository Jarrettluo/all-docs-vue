<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formItem" label-position="top">
                <Form-item label="文档链接">
                    <Input v-model="formItem.input" placeholder="请输入链接"></Input>
                </Form-item>
            </Form>
            <attr-input
                @startUpload="startUpload"
            ></attr-input>

        </Col>
        <Col span="12">
        </Col>
    </Row>

</template>

<script>
import AttrInput from '@/components/Form/AttrInput'

export default {
    name: "UploadDirectory2",
    data() {
        return {
            formItem: {},
            buttonSrc: require("@/assets/source/upload.png"),
        }
    },
    components: {
        AttrInput
    },
    methods: {
        startUpload(value) {
            this.$Message.info(value)
        },
        uploadFileByUrl() {
            return;
        }
    }
}
</script>

<style scoped>

</style>
