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
import { BackendUrl } from '@/api/request'

import StatisticSource from "@/api/staticSourceUrl"

export default {
    name: "WordView",
    data() {
        return {
            wordURL: StatisticSource.docPreviewUrl(this.$route.query.docId)
        };
    },
    created() {
        this.getWordText();
    },
    methods: {
        getWordText() {
            const xhr = new XMLHttpRequest();
            let docId = this.$route.query.docId;

            this.wordURL = StatisticSource.docPreviewUrl(docId)

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