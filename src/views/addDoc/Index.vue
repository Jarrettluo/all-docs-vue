<template>
    <Upload
        multiple
        type="drag"
        :action="actionUrl"
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
import { BackendUrl } from '@/api/request'
export default {
    data() {
        return {
            actionUrl: BackendUrl() + "/files/upload",
        }
    },
    methods: {
        response(response, file, fileList) {
            this.$Message.info(response)
        }
    }

}
</script>
