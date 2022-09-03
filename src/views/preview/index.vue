<template>
    <div>
        <div class="nav">
            <Nav></Nav>
        </div>
        <div class="main-container">
            <div class="title-info">
                <div class="doc-trim" style="text-align: center">
                    <img :src=" thumbId | imgSrc " alt="thumb" style="width: 36px;max-height: 48px;border: 1px solid #dcdee2; border-radius: 2px">
                </div>
                <div class="doc-info">
                    <div class="doc-info-title">
                        {{title}}
                    </div>
                    <div class="doc-info-tag">
                        <Tag color="lime">lime</Tag>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                    </div>
                    <div class="doc-info-detail">
                        {{ userName }} {{ createTime }}
                    </div>

                </div>
            </div>
            <div class="doc-preview">
<!--                <PdfView></PdfView>-->
                <component :is="component"
                           v-if="component" />
            </div>
            <div class="doc-operation-body">
                <doc-operation />
            </div>
            <div class="doc-comment">
                <comment-page />
            </div>

        </div>
    </div>

</template>

<script>
// import PdfView from "./PngView"



import Nav from "@/components/Nav"
import DocRequest from "@/api/document"
import {parseTime} from "@/utils/index"

import DocOperation from "./docOperation"

import CommentPage from "./CommentPage"

export default {
    data() {
        return {
            title: "",
            userName: "",
            docId: "",
            tags: [],
            createTime: new Date(),
            thumbId: "",
            component: null,
        }
    },
    components: {
        Nav, DocOperation, CommentPage
    },
    mounted() {
        this.init()
    },
    filters: {
        imgSrc(value) {
            if(value === "" || value == null) {
                return "http://81.69.247.172:8082/files/image2/d2d9933cf295443990b2bed036a534ec";
            } else {
                return "http://81.69.247.172:8082/files/image2/" + value;
            }
        }
    },
    methods: {
        init() {
            let docId = this.$route.query.docId;
            var params = {
                docId: docId
            }
            DocRequest.getData(params).then(response => {
                // console.log(response)
                this.title = response.data.title;
                this.userName = response.data.userName;
                this.tags = response.data.tagVOList;
                this.thumbId = response.data.thumbId;
                var docTime = response.data.createTime;
                this.createTime = parseTime(new Date(docTime), '{y}年{m}月{d}日 {h}:{i}:{s}');

                if(response.code == 200) {
                    let title = response.data.title
                    let suffix = title.split(".")[title.split('.').length - 1];
                    switch (suffix) {
                        case 'pdf':
                            this.component = () => import('@/views/preview/index2')
                            break
                        case 'png':
                        case 'jpg':
                        case 'jpeg':
                            this.component = () => import('@/views/preview/PngView')
                            break
                        case 'html':
                        case 'txt':
                            this.component = () => import('@/views/preview/HtmlView')
                            break
                        case 'docx':
                        case 'doc':
                            this.component = () => import('@/views/preview/WordView3')
                            break
                        case 'pptx':
                            this.component = () => import('@/views/preview/PPTxView')
                            break
                        default:
                            this.component = () => import('@/views/preview/ErrorView')
                            break
                    }
                }
            })
        }
    }

}
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #f4d057;
        width: 100%;
        height: 50px;
        //position: absolute;
        //left: 0;
        //top: 0;
    }
    .main-container {
        width: 1200px;
        //height: 100vh;
        //background-color: yellowgreen;
        padding: 25px;
        margin: auto;
        box-sizing: content-box;
        .title-info {
            height: 185px;
            width: 1200px;
            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3000);
            border-radius: 8px;
            background-color: #fffeff;
            padding: 36px;
            display: block;
            .doc-trim {
                float: left;
                width: 40px;
                //background-color: lightblue;
                height: 40px;
                line-height: 40px;
                display: block;
            }
            .doc-info {
                display: block;
                float: left;
                padding: 0 10px;
                text-align: left;
                .doc-info-title {
                    font-size: 24px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #000000;
                    line-height: 33px;
                }
                .doc-info-tag {
                    height: 40px;
                    line-height: 40px;
                }
                .doc-info-detail {
                    height: 40px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                    line-height: 20px;
                }

            }
        }
        .doc-preview {
            margin: 20px 0;
            overflow-y: auto;
            height: 100vh;
            padding: 10px 0;
            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3000);
            border-radius: 8px;
            background-color: #fffeff;
        }
        .doc-operation-body {
            height: 200px;
            //line-height: 200px;
            text-align: center;
            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3000);
            border-radius: 8px;
            background-color: #fffeff;
        }
        .doc-comment {

            margin: 20px 0;

            background-color: #42b983;
            min-height: 120px;

            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3000);
            border-radius: 8px;
            background-color: #fffeff;

            padding: 36px 40px;
        }
    }

</style>