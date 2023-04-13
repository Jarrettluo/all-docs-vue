<template>
    <!-- 上传  options 上传配置-->
    <uploader :options="optionsUpLoader" class="uploader-example" ref="uploader" v-if="importResults || (disableIn!='4' && disableIn!='5' && disableIn!='1')" @file-success="onFileSuccess" @file-complete="fileComplete">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
            <!--  显示文字  -->
            <uploader-btn type="primary" :directory="true" >附件上传</uploader-btn>
        </uploader-drop>
    </uploader>
</template>

<script>
export default {
    name: "UploadDirectory",
    data:{
        //上传配置
        optionsUpLoader: {
            target:'上传URL',
            query: {
                planId: '',
                id:"",
                fileType: '成果', // 合同,成果
                status: '0',
                xmmc:''
            },
            testChunks: false,
            fileStatusText: {
                success: '成功了',
                error: '出错了',
                uploading: '上传中',
                paused: '暂停中',
                waiting: '等待中'
            },
            chunkSize: 1024 * 1024 * 2, // 1MB
            simultaneousUploads: 5, // 并发上传数
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        },
    },
    methods: {
        //成功读取文件后触发
        onFileSuccess(rootFile, file, response, chunk) {
            console.log('onFileSuccess')
            if (!this.loading) {
                this.loading = this.$loading({
                    lock: true,
                    text: '上传中......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            }
        },
        //上传文件夹
        fileComplete() {
            // console.log('fileComplete函数')
            this.complete()
        },
        complete() {
            var _this = this;
            // console.log('complete函数')
            request({
                url: "查询上传成功url",
                params: {
                    planId: this.activeRow.planId,
                    id: this.activeRow.id,
                },

            }).then(res => {
                console.log(res, '上传文件夹接口返回')
                this.loading.close()
                this.$Message.success('文件上传成功')
            })
        },
    }
}
</script>

<style scoped>

</style>