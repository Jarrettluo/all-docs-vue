<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formItem" label-position="top">
                <Form-item label="文档链接">
                    <Input v-model="formItem.url" :placeholder="formPlaceholder.url"></Input>
                </Form-item>
                <Form-item label="文档文件名">
                    <Input v-model="formItem.name" :placeholder="formPlaceholder.name"></Input>
                </Form-item>
            </Form>
            <attr-input
                ref="paramForm"
                @startUpload="startUpload"
                :showSkipError="false"
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
    name: "UploadByUrl",
    data() {
        return {
            formItem: {},
            buttonSrc: require("@/assets/source/upload.png"),
            formPlaceholder: {
                url: "请输入链接，例如：http://xxx.com/abc.pdf。不超过512个字符。",
                name: "请输入文档对应的文档名称，例如：文档名.pdf。非必填，不超过64字符。"
            }
        }
    },
    components: {
        AttrInput
    },
    methods: {
        async startUpload(value) {
            let urlStr = this.formItem.url;
            if (urlStr == null || urlStr === '') {
                return;
            }

            let data = {
                url: urlStr,
                name: this.formItem.name,
                category: this.$refs['paramForm'].getCategory() || "",
                tags: this.$refs['paramForm'].getSelectedTags() || [],
                description: this.$refs['paramForm'].getDesc() || ""
            }
            await DocRequest.docUploadByUrl(data, null).then(res => {
                if (res.code === 200) {
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("上传出错：" + res.message)
                }
            }).catch(err => {
                this.$Message.error("上传出错:" + err)
            })
            this.formItem.url = ""
        }
    }
}
</script>

<style scoped>

</style>
