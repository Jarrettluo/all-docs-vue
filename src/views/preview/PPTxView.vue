<template>
    <div class="word-wrap">
        <!--        <div id="wordView" v-html="wordText" />-->
        <!--        <img :src="wordURL" width="100%">-->
        <iframe :src="wordURL" width="100%" height="100%" frameborder="no">

        </iframe>
    </div>
</template>

<script>

// docx文档预览(只能转换.docx文档，转换过程中复杂样式被忽，居中、首行缩进等)
import mammoth from "mammoth";


import axios from 'axios'

export default {

    name: "WordView",
    data() {
        return {
            wordURL: 'http://81.69.247.172:8082/files/view/' + this.$route.query.docId
        };
    },
    created() {
        // this.getWordText();
    },
    methods: {
        getWordText() {
            const xhr = new XMLHttpRequest();
            let docId = this.$route.query.docId;

            let wordURL = 'http://81.69.247.172:8082/files/view/' + docId

            axios({
                method: 'get',
                responseType: 'blob', // 设置响应文件格式
                data: {},
                url: wordURL,
            }).then(res => {
                console.log(res)
                const responseData = res.data;
                if (responseData != null) {
                    let pdfUrl = window.URL.createObjectURL(new Blob([responseData], { type: "application/ppt" }));
                    window.open(pdfUrl)
                }
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.word-wrap {
    margin-top: -10px;
    //padding: 15px;
    img {
        width: 100%;
    }
    height: 100vh;
}
</style>