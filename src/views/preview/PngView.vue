<template>
    <div class="word-wrap">
<!--        <div id="wordView" v-html="wordText" />-->
        <img :src="wordURL" width="100%">
    </div>
</template>

<script>

// docx文档预览(只能转换.docx文档，转换过程中复杂样式被忽，居中、首行缩进等)
import mammoth from "mammoth";
import StaticSource from "@/api/staticSourceUrl"

export default {
    name: "WordView",
    data() {
        return {
            wordURL: StaticSource.docPreviewUrl(this.$route.query.docId)
        };
    },
    created() {
        this.getWordText();
    },
    methods: {
        getWordText() {
            const xhr = new XMLHttpRequest();
            let docId = this.$route.query.docId;

            this.wordURL = StaticSource.docPreviewUrl(docId)
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
}
</style>