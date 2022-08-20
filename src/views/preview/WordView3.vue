<template>
    <div class="home1">
<!--        不支持预览doc，只能预览docx哦-->
        <div ref="file"></div>
    </div>
</template>

<script>
import axios from 'axios'
const docx = require('docx-preview');

// 如果 docx-preview 版本比较新需要 es6 导出
// import { renderAsync } from 'docx-preview'

window.JSZip = require('jszip')

export default {
    name: "WordView3.vue",
    data() {
        return {
            result: null
        }
    },
    mounted(){

        // let result = ""

        let docId = this.$route.query.docId;

        // let wordURL = 'http://81.69.247.172:8082/files/view/' + docId
        // let wordURL = 'http://81.69.247.172/myWord.docx'
        let wordURL = 'http://localhost:8080/设计报告.docx'
        // let wordURL = 'http://localhost:8080/d51e5ec3-6ec7-4df0-9152-d909121d22d4.doc'
        // console.log(wordURL)
        // let that = this;
        axios({
            method: 'get',
            responseType: 'blob', // 设置响应文件格式
            data: {},
            url: wordURL,
        }).then(res => {
            console.log(res)
            // that.result = res
            // res.data.type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            // const blob = new Blob([res.data], { type: "application/msword" });

            // let showFile = window.URL.createObjectURL(blob);
            // window.open(showFile);   //查看功能需要浏览器打开

            // console.log(res)
            // let data = res.data
            // // console.log(data)
            // docx.renderAsync(blob,this.$refs.file) // 渲染到页面预览
            docx.renderAsync(res.data, this.$refs.file)
            // that.xxx()
        })

        // this.$nextTick(() => {
        //     console.log(result)
        // })
    },
    methods: {
        xxx() {
            console.log(this.result)

            // this.result.data.type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        }
    }
}
</script>

<style scoped>

</style>

