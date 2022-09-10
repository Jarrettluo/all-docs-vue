<template>
    <div class="thumb-group" :style="flag|styleByFlag">
        <div class="thumb-pic">
            <img :src="wordURL" width="100%" height="99">
            <DocTag :type="docTitle | filterType">
            </DocTag>
        </div>
        <div class="thumb-title" v-if="!flag">
            <span>{{ title }}</span>
        </div>
    </div>
</template>

<script>
import DocTag from "@/home/DocTag";

export default {
    name: "DocThumb",
    components: {
        DocTag
    },
    data() {
        return {
            wordURL: 'http://81.69.247.172:8082/files/image2/d2d9933cf295443990b2bed036a534ec',
            img: "",
            docTitle: this.title, // "金融学院-金融学专业电子白皮书.pdf"
        }
    },
    props: {
        flag: Boolean,
        title: String
    },
    filters: {
        styleByFlag(value) {
            if (value) {
                return {
                    padding: 0,
                    _isHover: false,
                    width: '100px'
                }
            }
        },
        filterType(title) {
            if ( title == null || title == '') {
                return 'ohters'
            } else {
                let arr = title.split(".");
                let suffix = arr.slice(-1)[0]
                switch (suffix){
                    case "pdf":
                        return 'pdf'
                    case 'doc':
                    case 'docx':
                        return 'word'
                    case 'pptx':
                        return 'ppt'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .thumb-group {
        width: 108px;
        padding: 4px;
        .thumb-pic {
            width: 100%;
            height: 140px;
            border-radius: 2px;
            border: 1px solid #AAAAAA;
            position: relative;
            background-color: #ffffff;
            .doc-tag {
                position: absolute;
                bottom: 0px;
                right: 0px;
            }
        }
        .thumb-title {
            width: 100%;
            height: 64px;
            padding: 10px 0px 5px 0px;
            text-align: left;


            span {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 17px;

                overflow: hidden;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }

        &:hover {
            background-color: #eee;
            cursor: pointer;
            border-radius: 4px;
        }
    }
</style>