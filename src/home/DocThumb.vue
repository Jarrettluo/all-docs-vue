<template>
    <div class="thumb-group">
        <div class="thumb-pic">
            <img :src="wordURL" width="100%">
            <DocTag type="word">
            </DocTag>
        </div>
        <div class="thumb-title">
            <span>附件1第二轮双一流建设高校及建设学科名单.pdf</span>
        </div>
    </div>
</template>

<script>
import DocTag from "@/home/DocTag1";

export default {
    name: "DocThumb",
    components: {
        DocTag
    },
    data() {
        return {
            wordURL: 'http://81.69.247.172:8082/files/image2/d2d9933cf295443990b2bed036a534ec',
            img: "",
            title: "金融学院-金融学专业电子白皮书.pdf"
        }
    }
}
</script>

<style lang="scss" scoped>
    .thumb-group {
        width: 100px;
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