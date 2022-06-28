<template>
    <Upload
        multiple
        type="drag"
        action="http://81.69.247.172:8082/files/upload">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传</p>
        </div>
    </Upload>
</template>
<script>
export default {
    name: "AddDoc"

}
</script>
