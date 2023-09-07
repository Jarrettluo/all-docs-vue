<template>
    <div class="main-container">
        <Tabs value="name1" @on-click="switchTab">
            <TabPane label="文档动态" name="name1">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel">
                    <div class="info-group">
                        <div class="info-item" v-for="item in infoList" @click="userRead(item)">

                            <div class="info-title" v-if="!item.readState">
                                <Badge dot>
                                    <span class="tile-span">{{ item.title }}</span>
                                    <span class="ok-span">  管理员审核</span>
                                    <span class="ok-span" v-if="item.checkState">通过</span>
                                    <span class="no-span" v-else>不通过，原因 {{ item.errorMsg }}</span>
                                </Badge>
                            </div>

                            <div class="info-title" v-else>
                                <span class="tile-span">{{ item.title }}</span>
                                <span class="ok-span">  管理员审核</span>
                                <span class="ok-span" v-if="item.checkState">通过</span>
                                <span class="no-span" v-else>不通过，原因 {{ item.errorMsg }}</span>
                            </div>
                            <div class="info-time">
                                {{ item.time }}
                            </div>
                            <div class="info-mask" v-if="item.readState">
                            </div>
                        </div>
                    </div>
                    <div class="page-bottom">
                        <Page
                            :model-value="currentPage"
                            :total="totalItems"
                            :page-size="pageSize"
                            @on-change="pageChange"
                        />
                    </div>
                </div>

            </TabPane>
            <TabPane label="评论信息" name="name2">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel">
                    <div class="info-group">
                        <div class="" style="width: 100%; padding: 15px; text-align: left;
                        border-bottom: 1px solid #f1f2f3;" v-for="item in comments">

                            <div class="tile-span doc-title" style="height: 22px; width: 100%;
                            overflow: hidden; white-space: nowrap;text-overflow: ellipsis;
                            color: #8F6100;
                            " @click="documentPreview(item)">
                                {{ item.docName }}
                            </div>
                            <div style="padding: 5px 0;">
                                <span>
                                    {{ item.content }}
                                </span>
                            </div>
                            <div>
                                <span class="doc-time">
                                    {{ item.createTime }}
                                </span>
                                <Icon type="md-trash" style="cursor: pointer" @click="removeDocument(item)"/>
                            </div>
                        </div>
                    </div>
                    <div class="page-bottom">
                        <Page
                            :model-value="commentCurrentPage"
                            :total="commentTotalItems"
                            :page-size="commentPageSize"
                            @on-change="commentPageChange"
                        />
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import docReviewRequest from '@/api/docReview'
import {parseTime} from "@/utils"
import commentRequest from '@/api/comment'

export default {
    name: "UserInfo",
    data() {
        return {
            infoList: [],
            comments: [],
            currentPage: 1,
            totalItems: 10,
            pageSize: 20,

            commentCurrentPage: 1,
            commentTotalItems: 10,
            commentPageSize: 20,
        }
    },
    mounted() {
        this.getAllReviews()
        // this.getPageData()
    },
    methods: {
        // 获取用户的全部评审状态
        async getAllReviews() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            docReviewRequest.getMyReviewLog(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data
                    this.totalItems = res.data.total

                    this.infoList = []
                    let tempObj = {}
                    for (let resultKey of result) {
                        tempObj['id'] = resultKey['id']
                        tempObj['title'] = resultKey['docName']
                        tempObj['time'] = parseTime(new Date(resultKey['createDate']), '{y}年{m}月{d}日');
                        tempObj['errorMsg'] = resultKey['reviewLog']
                        tempObj['readState'] = resultKey['readState']
                        tempObj['checkState'] = resultKey['checkState']
                        this.infoList.push(tempObj)
                        tempObj = {}
                    }
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            })
        },

        async getPageData() {
            let param = {
                page: this.commentCurrentPage,
                rows: this.commentPageSize
            }
            commentRequest.getMyComments(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data

                    this.comments = []

                    for (let resultElement of result) {
                        let tempObj = resultElement
                        tempObj['createTime'] = parseTime(new Date(resultElement['createDate']), '{y}年{m}月{d}日');
                        this.comments.push(tempObj)
                    }
                    this.totalItems = res.data.total

                    this.commentCurrentPage = res.data.pageNum;
                    this.commentPageSize = res.data.pageSize;
                    this.commentTotalItems = res.data.total;
                } else {
                    this.data = []
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            })
        },

        pageChange(page) {
            this.currentPage = page
            this.getAllReviews()
        },

        commentPageChange(page) {
            this.commentCurrentPage = page;
            this.getPageData();
        },

        async userRead(item) {
            if (item.readState === true) {
                return;
            }
            let param = {
                ids: [item.id]
            }
            docReviewRequest.updateDocReviewUserRead(param).then(res => {
                if (res.code === 200) {
                    this.getAllReviews()
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'));
            })

        },

        switchTab(name) {
            switch (name) {
                case "name1":
                    this.getAllReviews()
                    break;
                case "name2":
                    this.getPageData()
                    break;
            }
        },
        documentPreview(item) {
            this.$router.push({
                path: '/preview',
                query: {
                    docId: item.docId
                }
            })
        },

        async removeDocument(item) {
            let param = {
                id: item.id,
                userId: item.userId
            }
            commentRequest.deleteData(param).then(res => {
                if (res.code === 200) {
                    let data = res.data
                    this.getPageData()
                }
            }).catch(err => {
                this.$Message.error("出错:" + (err || '请稍后重试'))
            })
        }

    }
}
</script>

<style scoped lang="scss">

.main-container {
    padding: 30px;

    .tab {
        /deep/ .ivu-tabs-nav {
            //width: 64px;
            //height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC, serif;
            font-weight: 400;
            line-height: 22px;
        }


    }

}

.page-panel {
    width: 100%;
    height: 810px;
    position: relative;

    .info-group {
        width: 100%;
        height: calc(100% - 60px);

        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;

        .info-item {
            display: flex;
            justify-content: space-around;
            width: 100%;
            position: relative;
            cursor: pointer;

            .info-title {
                width: calc(100% - 120px);
                padding: 15px;
                text-align: left;

                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC, serif;
                font-weight: 500;
                line-height: 20px;

                .tile-span {
                    color: #8F6100;
                }

                .ok-span {
                    color: #2d2c2b;
                }

                .no-span {
                    color: orangered;
                }
            }

            .info-time {
                width: 120px;
                padding: 15px 0;

                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC, serif;
                font-weight: 400;
                color: #464646;
                line-height: 17px;
            }

            .info-mask {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: #fff;
                opacity: 0.3;
            }


        }

    }

    .page-bottom {
        padding: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

.doc-title {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-weight: 500;
    line-height: 20px;

    color: #8F6100;
    cursor: pointer;
}

.doc-time {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC, serif;
    font-weight: 400;
    color: #464646;
    line-height: 17px;
}


</style>