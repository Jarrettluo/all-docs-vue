<template>
    <div class="thumb-group" :style="flag|styleByFlag">
        <div class="thumb-com">
            <div class="thumb-pic">
                <img :src="docId | imgSrc" alt="docId" referrerpolicy="no-referrer">
            </div>
            <DocTag :type="title | filterType">
            </DocTag>
        </div>

        <div class="thumb-title" v-if="!flag">
            <span>{{ title }}</span>
        </div>
    </div>
</template>

<script>
import DocTag from "@/home/DocTag";
import { BackendUrl } from '@/api/request'

export default {
    name: "DocThumb",
    components: {
        DocTag
    },
    data() {
        return {
            img: "",
            docTitle: this.title
        }
    },
    props: {
        flag: Boolean,
        title: String,
        docId: String,
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
            if (title == null || title === '') {
                return 'others'
            } else {
                let arr = title.split(".");
                let suffix = arr.slice(-1)[0]
                switch (suffix) {
                    case "pdf":
                        return 'pdf'
                    case 'doc':
                    case 'docx':
                        return 'word'
                    case 'pptx':
                        return 'ppt'
                    case 'xlsx':
                        return 'excel'
                    default:
                        return suffix.slice(0, 1)
                }
            }
        },
        imgSrc(value) {
            if (value === "" || value == null) {
                return require('@/assets/source/doc.png')
            } else {
                return BackendUrl() + "/files/image2/" + value;
            }
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.thumb-group {
    width: 108px;
    padding: 4px;

    .thumb-com {
        width: 100%;
        height: 140px;
        position: relative;

        .thumb-pic {
            width: 100%;
            height: 140px;
            border-radius: 2px;
            border: 1px solid #AAAAAA;
            position: relative;
            background-color: #ffffff;

            overflow: hidden; //img如果超出这个div会隐藏超出部分
            display: flex; //flex布局
            align-items: center; //让img放在div的中间，居中
            img {
                width: 100%;
            }
        }

        .doc-tag {
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }

    .thumb-title {
        width: 100%;
        height: 64px;
        padding: 10px 0 5px 0;
        text-align: left;


        span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC, serif;
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