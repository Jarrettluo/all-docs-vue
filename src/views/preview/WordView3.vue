<template>
    <div class="home1">
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
    mounted(){
        let docId = this.$route.query.docId;

        let wordURL = 'http://81.69.247.172:8082/files/view/' + docId
        console.log(wordURL)
        axios({
            method: 'get',
            responseType: 'blob', // 设置响应文件格式
            data: {},
            url: wordURL,
        }).then(res => {

            const blob = new Blob([res.data], { type: "application/msword" });

            // let showFile = window.URL.createObjectURL(blob);
            // window.open(showFile);   //查看功能需要浏览器打开

            // console.log(res)
            // let data = res.data
            // // console.log(data)
            docx.renderAsync(blob,this.$refs.file) // 渲染到页面预览
        })
    }
}
</script>

<style scoped>

</style>