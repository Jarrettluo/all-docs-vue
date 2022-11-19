<template>
    <div class="word-wrap">
        <div id="wordView" v-html="wordText" />
    </div>
</template>

<script>

// docx文档预览(只能转换.docx文档，转换过程中复杂样式被忽，居中、首行缩进等)
import mammoth from "mammoth";
import { BackendUrl } from '@/api/request'

export default {
    name: "WordView",
    data() {
        return {
            wordText: "",
            wordURL: 'vue-mobile/media/word.docx'//文件地址
        };
    },
    created() {
        this.getWordText();
    },
    methods: {
        getWordText() {
            const xhr = new XMLHttpRequest();
            let docId = this.$route.query.docId;

            this.wordURL = BackendUrl() + '/files/view/' + docId

            xhr.open("get", this.wordURL, true);
            // xhr.responseType = "arraybuffer";
            // xhr.onload = () => {
            //     if (xhr.status == 200) {
            //         console.log(xhr)
            //         mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then((resultObject) => {
            //             this.$nextTick(() => {
            //                 this.wordText = resultObject.value;
            //             });
            //         });
            //     }
            // };

            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
                if (xhr.status == 200) {
                    console.log(xhr)
                    mammoth.convertToHtml({ arrayBuffer: xhr.response }).then((resultObject) => {
                        this.$nextTick(() => {
                            this.wordText = resultObject.value;
                        });
                    });
                }
            };
            xhr.send();
        }
    }
}
</script>

<style lang="scss" scoped>
    .word-wrap {
        padding: 15px;
        img {
            width: 100%;
        }
    }
</style>