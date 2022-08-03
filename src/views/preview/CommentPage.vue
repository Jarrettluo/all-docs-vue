<template>
    <div>
        <Input v-model="value1" type="textarea" :rows="8" placeholder="留下只言片语" />
        <div class="comment-btn">
            <Button @click="postComment">发送评论</Button>
        </div>
        <div class="comment-body">
            <div class="comment-title">
                <span>全部评论  </span>
                <span class="comment-num">{{num}}</span>
            </div>
            <div class="comment-item" v-for="item in comments">
                <div class="comment-item-logo">
                    {{ item.src }}
                </div>
                <div class="comment-item-detail">
                    <div class="comment-item-user">
                        {{ item.userName }}
                    </div>
                    <div class="comment-item-content">
                        {{ item.content}}
                    </div>
                    <div class="comment-item-time">
                        {{item.createTime | transferTime }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {parseTime} from "@/utils/index"

import CommentRequest from "@/api/comment"

export default {
    name: "CommentPage",
    data() {
        return {
            value1: "",
            num: 22,
            comments: [
                {
                    src: "abc",
                    id: 123,
                    userName: "luojiarui",
                    content: "写的非常好！",
                    createTime: new Date(),
                },
                {
                    src: "abc",
                    id: 123,
                    userName: "luojiarui",
                    content: "写的非常好！",
                    createTime: new Date(),
                },
                {
                    src: "abc",
                    id: 123,
                    userName: "luojiarui",
                    content: "写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好写的非常好！",
                    createTime: new Date(),
                }
            ]
        }
    },
    filters: {
        transferTime(value) {
            return parseTime(new Date(value), '{y}年{m}月{d}日 {h}:{i}:{s}');
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        /**
         * 查询该篇文章的全部评论信息
         */
        init() {
            let docId = this.$route.query.docId;
            var params = {
                docId: docId,
                createUser: 1,
            }
            CommentRequest.getListData(params).then(response => {
                console.log(response)
            })
        },
        postComment() {
            console.log("====")
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-body {
        padding: 20px 40px;
        text-align: left;
        .comment-title {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 20px;
            .comment-num {
                font-weight: 400;
                color: #858585;
                line-height: 20px;
            }
        }
        .comment-item {
            border-bottom: 1px solid #EAEAEA;
            padding: 20px 10px;
            display: flex;
            //justify-content: left;
            justify-content: flex-start;
            flex-wrap: wrap;
            .comment-item-logo {
                width: 40px;
                line-height: 40px;
                margin: 0 auto;
                display: inline-block;
            }
            .comment-item-detail {
                //float: left;
                width: calc( 100% - 40px);
                margin: 0 auto;
                display: inline-block;
                //flex: 1;
                .comment-item-user {
                    line-height: 40px;
                    font-weight: bold;
                    font-size: 16px;
                }
                .comment-item-content {
                    //padding: 10px 0px;
                    color: #a5a2a3;
                }
                .comment-item-time {
                    line-height: 40px;
                    color: #a5a2a3;
                }
            }
        }
    }
    .comment-btn {
        text-align: right;
        padding: 10px 0px;
    }
    .ivu-btn {
        width: 95px;
        height: 30px;
        background: #FFF7D6;
        box-shadow: 0px 0px 10px 0px rgba(129,100,0,0.3000);
        border-radius: 8px;
        border: 2px solid #000000;

        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 20px;

    }

    .ivu-btn:hover {
        background-color: #fcf3d2;
        color: rgba(129,100,0,0.3000);
        border-color: rgba(129,100,0,0.3000);
    }
</style>