<template>
    <Upload
        multiple
        type="drag"
        action="http://localhost:8082/files/upload"
        :on-error="response"
        :on-success="response"
    >
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #f4d057;"></Icon>
            <p>点击上传</p>
        </div>
    </Upload>
</template>
<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        response(response, file, fileList) {
            this.$Message.info(response)
        }
    }

}
</script>
