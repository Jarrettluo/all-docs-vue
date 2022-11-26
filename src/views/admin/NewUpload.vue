<template>
    <div class="content">
        <doc-upload style="margin: -40px -20px;"></doc-upload>
    </div>
</template>

<script>
import DocUpload from "@/views/userPage/DocUpload"
export default {
    name: "NewUpload",
    components: {
        DocUpload
    }
}
</script>

<style scoped lang="scss">

.content {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}
</style>