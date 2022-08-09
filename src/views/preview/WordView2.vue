<template>

</template>

<script>
export default {
    name: "WordView2",
    data() {

    },
    mounted() {
        this.handleView()
    },
    methods: {
        handleView(record) {
            let docId = this.$route.query.docId;

            let wordURL = 'http://81.69.247.172:8082/files/view/' + docId


            const onlineList = ['png','xls','docx','jpg','pdf']
            const typeArr =  "xxx.doc" // record.fileName.split('.') // fileName "20101206120104.jpg"
            const type = "doc"// typeArr.pop().toLowerCase() // 获取文件后缀 jpg
            // if(!onlineList.includes(type)){
            //     this.handleDown(record) // 暂不支持打开此格式 直接下载该文件
            //     return
            // }
            const filterType = [
                { suffix: 'png', mime: 'image/png' },
                { suffix: 'xls', mime: 'application/pdf' },
                { suffix: 'pdf', mime: 'application/pdf' },
                { suffix: 'docx', mime: 'application/pdf' }
            ]
            const typeMine = filterType.find(item => {
                return item.suffix === type
            })
            // this.$loading.show() // 下载的时候出现loading 友好交互
            // const xhr = new XMLHttpRequest();

            this.$axios.get( wordURL ,{ responseType: 'blob' }).then((res) => {
                if(window.navigator.msSaveOrOpenBlob) {
                    //ie
                    var fileData = [res.data]
                    const blobObject = new Blob(fileData, { type: typeMine.mime })
                    const fileName = record.fileName.substr(0, record.fileName.lastIndexOf('.'))+'.'+( (typeMine.mime=='application/pdf')?'pdf':typeMine.suffix )
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName)
                }else{
                    const blob = new Blob([res.data], { type: typeMine.mime })
                    const url = URL.createObjectURL(blob)
                    window.open(url)
                    URL.revokeObjectURL(url) // 释放url
                }
                // this.$loading.hide()
            })
        }

    }
}
</script>

<style scoped>

</style>