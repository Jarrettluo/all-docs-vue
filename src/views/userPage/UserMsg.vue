<template>
    <div class="main-container">
        <Tabs value="name1" @on-click="switchTab">
            <TabPane label="文档动态" name="name1">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel container" @scroll="handleScroll">
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
                        <div v-if="isLoading" class="loading-indicator">Loading...</div>
                    </div>
                </div>

            </TabPane>
            <TabPane label="评论信息" name="name2">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel" @scroll="handleCommentScroll">
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
                        <div v-if="isLoading" class="loading-indicator">Loading...</div>
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
            pageSize: 60,

            commentCurrentPage: 1,
            commentTotalItems: 10,
            commentPageSize: 20,

            isLoading: false,
            prevScrollTop:0, //用于跟踪前一个滚动位置
            loadedPages: [],

            prevScrollTop2: 0, // 用于跟踪前一个滚动位置
            loadedPages2: [],
        }
    },
    mounted() {
        this.getAllReviews()
        // this.getPageData()
    },
    methods: {
        // 获取用户的全部评审状态
        async getAllReviews() {
            if (this.isLoading || this.infoList.length === this.totalItems || this.loadedPages.includes(this.currentPage)) {
                return;
            }
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            this.isLoading = true
            this.loadedPages.push(this.currentPage)
            await docReviewRequest.getMyReviewLog(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data
                    this.totalItems = res.data.total

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
                    this.currentPage ++
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            }).finally(
                this.isLoading = false
            )

        },

        async getPageData() {

            if (this.isLoading || this.comments.length === this.commentTotalItems
                || this.loadedPages2.includes(this.commentCurrentPage)) {
                return;
            }
            let param = {
                page: this.commentCurrentPage,
                rows: this.commentPageSize
            }
            this.isLoading = true
            this.loadedPages2.push(this.commentCurrentPage)
            commentRequest.getMyComments(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data
                    for (let resultElement of result) {
                        let tempObj = resultElement
                        tempObj['createTime'] = parseTime(new Date(resultElement['createDate']), '{y}年{m}月{d}日');
                        this.comments.push(tempObj)
                    }
                    this.totalItems = res.data.total
                    this.commentPageSize = res.data.pageSize;
                    this.commentTotalItems = res.data.total;

                    this.commentCurrentPage ++


                } else {
                    this.data = []
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            }).finally(
                this.isLoading = false
            )
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
                    // 这里更新修改的那条记录
                    this.infoList.find(ele => {
                        if (ele.id === item.id) {
                            ele.readState = true;
                            return ele
                        }
                    })
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
        },

        handleScroll(event) {
            const container = event.target;
            const currentScrollTop = container.scrollTop;
            if (
                currentScrollTop > this.prevScrollTop && // 检查滚动方向是向下
                container.scrollHeight - container.scrollTop <= container.clientHeight + 10 &&
                !this.isLoading
            ) {
                this.getAllReviews();
                this.prevScrollTop = currentScrollTop; // 更新前一个滚动位置
            }
        },

        handleCommentScroll(event) {

            const container = event.target;
            const currentScrollTop = container.scrollTop;

            if (
                currentScrollTop > this.prevScrollTop2 && // 检查滚动方向是向下
                container.scrollHeight - container.scrollTop <= container.clientHeight + 10 &&
                !this.isLoading
            ) {
                this.getPageData();
                this.prevScrollTop2 = currentScrollTop; // 更新前一个滚动位置
            }

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
    height: 800px;
    position: relative;
    overflow: auto; /* 让内容溢出时显示滚动条 */

    .info-group {
        width: 100%;
        //height: calc(100% - 60px);

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

        .loading-indicator {
            text-align: center;
            padding: 10px;
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