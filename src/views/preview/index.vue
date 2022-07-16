<template>
    <div>
        <div class="nav">
            <Nav></Nav>
        </div>
        <div class="main-container">
            <div class="title-info">
                <div class="doc-trim">
                    pic
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
                <PdfView></PdfView>
            </div>
            <div class="doc-operation">
                fldsjflsdj
            </div>
            <div class="doc-comment">
                fsdljfdsljf
            </div>

        </div>
    </div>

</template>

<script>
import PdfView from "./index2"

import Nav from "@/components/Nav"
import DocRequest from "@/api/document"
import {parseTime} from "@/utils/index"

export default {
    data() {
        return {
            title: "",
            userName: "",
            docId: "",
            tags: [],
            createTime: new Date()

        }
    },
    components: {
        PdfView, Nav
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let docId = this.$route.query.docId;
            var params = {
                docId: docId
            }
            DocRequest.getData(params).then(response => {
                console.log(response)
                this.title = response.data.title;
                this.userName = response.data.userName;
                this.tags = response.data.tagVOList;
                var docTime = response.data.createTime;
                this.createTime = parseTime(new Date(docTime), '{y}年{m}月{d}日 {h}:{i}:{s}');
            })
        }
    }

}
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #ffcc4f;
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
            //background-color: red;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
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
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 40px;
                    height: 40px;
                    //background-color: #42b983;
                }
                .doc-info-tag {
                    height: 40px;
                    line-height: 40px;
                }
                .doc-info-detail {
                    //font-weight: bold;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                }

            }
        }
        .doc-preview {
            margin: 20px 0;
            overflow-y: auto;
            height: 800px;
            padding: 10px 0;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
            border-radius: 8px;
            background-color: #fffeff;
        }
        .doc-operation {
            height: 200px;

            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
            border-radius: 8px;
            background-color: #fffeff;
        }
        .doc-comment {

            margin: 20px 0;

            background-color: #42b983;
            min-height: 120px;

            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
            border-radius: 8px;
            background-color: #fffeff;
        }
    }

</style>