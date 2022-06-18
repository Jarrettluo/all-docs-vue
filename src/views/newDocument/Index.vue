<template>
    <div class="content">
        <span>文件上传</span>
        <add-doc></add-doc>
    </div>
</template>

<script>
import AddDoc from "@/views/newDocument/AddDoc";
export default {
    name: "Index.vue",
    components: {
        AddDoc
    }
}
</script>

<style scoped>
    .content {
        width: calc(100% - 16px);
        height: calc( 100% - 16px) ;
        background-color: #ffffff;
        margin: 8px;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 16px;
        text-align: left;
    }

    span {
        font-size: 16px;
        line-height: 32px;
        margin-bottom: 8px;
    }
</style>