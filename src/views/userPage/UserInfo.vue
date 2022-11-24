<template>
    <div class="main-container">
        <Tabs value="name1">
            <TabPane label="文档动态" name="name1">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel">
                    <div class="info-group">
                        <div class="info-item" v-for="item in infoList">
                            <div class="info-title">
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
                        <Page :total="100"/>
                    </div>
                </div>

            </TabPane>
            <TabPane label="评论信息" name="name2">
                <!--                <filter-list-page></filter-list-page>-->

                <div class="page-panel">
                    <div class="info-group">
                        <div class="" style="width: 100%; padding: 15px; text-align: left;
                        border-bottom: 1px solid #f1f2f3;
" v-for="item in comments">

                            <div class="tile-span doc-title" style="height: 22px; width: 100%;
                            overflow: hidden; white-space: nowrap;text-overflow: ellipsis;
                            color: #8F6100;
                            ">
                                {{ item.doc }}
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
                                <Icon type="md-trash" style="cursor: pointer"/>
                            </div>
                        </div>
                    </div>
                    <div class="page-bottom">
                        <Page :total="100"/>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {
            infoList: [{
                id: "sdjflsdjf",
                title: "sjdlfjsdljflsdjl休闲鞋文档声嘶力竭咖喱是冯绍峰经历十分骄傲时光",
                checkState: true,
                errorMsg: "文档涉及到不正当信息请注意沙发上，已经删除",
                time: "2022年12月18日",
                readState: true
            }, {
                id: "sdjflsdjf",
                title: "这是标题的呢绒酸辣粉家里睡大觉分类的时间管理及撒非常多的内容呢" +
                    "粉色的分类第三节分类的时间酸辣粉时代峰峻上粉色几分三六九等老公就算了是封疆大吏封疆大吏" +
                    "的垃圾分类睡大觉分类老师的过街老鼠就是来访接待室，发哈分类是个垃圾管理上",
                checkState: true,
                errorMsg: "文档涉及到不正当信息请注意沙发上，已经删除",
                time: "1022rljlfjslf",
                readState: false
            }, {
                id: "sdjflsdjf",
                title: "sjdlfjsdljflsdjl休闲鞋文档声嘶力竭咖喱是冯绍峰经历十分骄傲时光",
                checkState: true,
                errorMsg: "文档涉及到不正当信息请注意沙发上，已经删除",
                time: "1022rljlfjslf",
                readState: false,
            }, {
                id: "sdjflsdjf",
                title: "sjdlfjsdljflsdjl休闲鞋文档声嘶力竭咖喱是冯绍峰经历十分骄傲时光",
                checkState: false,
                errorMsg: "文档涉及到不正当信息请注意沙发上，已经删除",
                time: "1022rljlfjslf",
                readState: true,
            }],
            comments: [{
                id: "dsjflds",
                doc: "sdjfldfld",
                createTime: "2022年10月18日 12：10：12",
                content: "这是评论内容，可以删除"
            }, {
                id: "dsjflds",
                doc: "sdjfldfld",
                createTime: "2022年10月18日 12：10：12",
                content: "这是评论内容，可以删除"
            }, {
                id: "dsjf这是文档的内容lds",
                doc: "sdd方方搜索sjf这是文档sdd方方搜索sjf这是文sdd方方" +
                    "搜索sjf这是文档粉色的范德萨范是对方极乐世界分类德萨的内容ldsjfldfld档粉色的范德萨范德萨的内容ldsjfldfld粉色的范德萨范德萨的内容ldsjfldfld",
                createTime: "2022年10月18日 12:10:12",
                content: "这是评论是对方手里的积分拉萨大家咖喱fslfjsljf阿娇分类收集分类介绍了个是分类收集分类介绍法律手段官商勾结啦时间管理上飞机但是" +
                    "方萨拉升级了房间阿什拉夫就算了内容，可以删除"
            }]
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