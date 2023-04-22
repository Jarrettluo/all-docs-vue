<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formItem" label-position="top">
                <Form-item label="文档链接">
                    <Input v-model="formItem.url" placeholder="请输入链接"></Input>
                </Form-item>
            </Form>
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
            this.uploadFileByUrl()
        },
        async uploadFileByUrl() {

            let data = {
                url: this.formItem.url,
                name: "",
                category: this.$refs['paramForm'].getCategory(),
                tags: this.$refs['paramForm'].getSelectedTags(),
                description: this.$refs['paramForm'].getDesc()
            }
            this.$Message.info(data)
            await DocRequest.docUploadByUrl(data, null).then(res => {
                if (res.code === 200) {
                    // this.uploadProcess = 1;
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("上传出错：" + res.message)
                    // this.uploadProcess = 0.00
                }

                setTimeout(() => {
                    this.processFlag = false;
                    this.filename = ''
                }, 1000)
            }).catch(err => {
                this.$Message.error("上传出错！")
                // this.processFlag = false
                // this.uploadProcess = 0.0
            })
        }
    }
}
</script>

<style scoped>

</style>
