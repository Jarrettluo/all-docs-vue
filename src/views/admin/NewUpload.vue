<template>
    <div class="content">
        <Tabs value="name1" style="height: 100%;" @on-click="switchTab">
            <TabPane label="单文件上传" name="name1" style="height: 100%; padding-top: 32px;">
                <doc-upload style="margin: -40px -20px;"></doc-upload>
            </TabPane>
            <TabPane label="多文件上传" name="name2" style="height: 100%; overflow-y: auto">
                <upload-multiple></upload-multiple>
            </TabPane>
            <TabPane label="文件夹上传" name="name3" style="height: 100%;">
                <upload-directory></upload-directory>
            </TabPane>
            <TabPane label="链接上传" name="name4" style="height: 100%;">
                <upload-by-url></upload-by-url>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import DocUpload from "@/views/userPage/DocUpload"
import UploadMultiple from "@/views/admin/UploadMultiple.vue"
import UploadDirectory from "@/views/admin/UploadDirectory2"
import UploadByUrl from "@/views/admin/UploadByUrl"

export default {
    name: "NewUpload",
    components: {
        DocUpload,
        UploadMultiple,
        UploadDirectory,
        UploadByUrl
    },
    data() {
        return {

            switch1: false
        }
    },
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

.ivu-tabs-bar {
    margin-bottom: 32px;
}
</style>