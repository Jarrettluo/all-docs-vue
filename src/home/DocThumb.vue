<template>
    <div class="thumb-group" :style="flag|styleByFlag">
        <div class="thumb-pic">
            <img :src="docId | imgSrc " >
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
        title: String,
        docId: String,
    },
    watch: {
        // docId: function (value) {
        //     console.log(value)
        //     this.wordURL = this.imgSrc(value);
        // }
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
                return 'others'
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
                    case  'xlsx':
                        return 'excel'
                    default:
                        return suffix.slice(0, 1)

                }
            }
        },
        imgSrc(value) {
            console.log(value)
            if(value === "" || value == null) {
                return "http://81.69.247.172:8082/files/image2/d2d9933cf295443990b2bed036a534ec";
            } else {
                return "http://81.69.247.172:8082/files/image2/" + value;
            }
        }
    },
    methods: {
        imgSrc1(value) {
            console.log(value)
            if(value === "" || value == null) {
                return "http://81.69.247.172:8082/files/image2/d2d9933cf295443990b2bed036a534ec";
            } else {
                return "http://81.69.247.172:8082/files/image2/" + value;
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

            overflow: hidden;//img如果超出这个div会隐藏超出部分
            display: flex;//flex布局
            align-items: center;//让img放在div的中间，居中
            img {
                width: 100%;
            }

            .doc-tag {
                position: absolute;
                bottom: -1px;
                right: -1px;
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