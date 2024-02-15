<template>
    <div class="main-container">
        <category-filter @changeCate="changeCate" @changeKeyWord="changeKeyWord"></category-filter>
        <tag-filter @changeTag="changeTag"></tag-filter>
        <div class="tab">
            <Tabs value="name1">
                <TabPane label="最近上传" name="name1">
                    <filter-list-page :data="docList" :total="total" :pageNum="pageNum"
                                      :pageSize="pageSize" @on-page-change="changePage"
                                      :key="key"
                                      v-show="!spinShow"
                    ></filter-list-page>
                    <div v-show="spinShow" style="background: none; height:800px;">
                        <Spin fix>
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Loading</div>
                        </Spin>
                    </div>
                </TabPane>
                <TabPane label="人气排名" name="name2" v-if="false">
                    <filter-list-page></filter-list-page>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import SearchGroup from '@/home/SearchGroup'
import TagFilter from '@/views/filterDoc/TagFilter'
import CategoryFilter from '@/views/filterDoc/CategoryFilter'
import FilterListPage from '@/views/filterDoc/FilterListPage'
import CategoryRequest from "@/api/category"

export default {
    name: "DocPage",
    data() {
        return {
            docList: [],
            total: 100,
            pageNum: 1,
            pageSize: 60,
            tagId: '',
            cateId: '',
            keyword: '',
            spinShow: true,

            loadedPages: [], // 已经查询过的页数存放地址
            key: new Date()
        }
    },
    props: ["requestType"],
    components: {
        SearchGroup,
        TagFilter,
        CategoryFilter,
        FilterListPage
    },
    mounted() {
        this.getRecentDocList()
    },
    methods: {
        async getRecentDocList() {
            if (this.pageNum > this.total / this.pageSize) {
                return;
            }
            if (this.loadedPages.includes(this.pageNum)) {
                return;
            }
            let param = {
                cateId: this.cateId,
                tagId: this.tagId,
                keyword: this.keyword,
                page: this.pageNum,
                rows: this.pageSize
            }
            this.loadedPages.push(this.pageNum)
            if (this.requestType === 'collect') {
                CategoryRequest.getMyCollectList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        result.data.forEach(item => {
                            this.docList.push(item)
                        })
                        this.pageNum = result.pageNum + 1;
                        this.total = result.total;
                        this.pageSize = result.pageSize;
                        this.pageNum ++;
                    }
                    this.spinShow = false
                }).catch(err => {
                    this.$Message.error("出错：" + (err || '请稍后重试'))
                })
            } else if (this.requestType === 'upload') {
                CategoryRequest.getMyUploadList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        result.data.forEach(item => {
                            this.docList.push(item)
                        })
                        this.pageNum = result.pageNum + 1;
                        this.pageNum ++;
                        this.total = result.total;
                        this.pageSize = result.pageSize
                    }
                    this.spinShow = false
                }).catch(err => {
                    this.$Message.error("出错：" + (err || '请稍后重试'))
                })
            } else {
                CategoryRequest.getDocList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        result.data.forEach(item => {
                            this.docList.push(item)
                        })
                        this.pageNum = result.pageNum + 1;
                        this.pageNum ++;
                        this.total = result.total;
                        this.pageSize = result.pageSize
                    }
                    this.spinShow = false
                }).catch(err => {
                    this.$Message.error("出错：" + (err || '请稍后重试'))
                })
            }

        },
        changeCate(cateId) {
            this.spinShow = true;
            this.pageNum = 1;
            this.docList = [];
            this.loadedPages = [];
            this.total = 100;
            this.pageSize = 60;
            this.key = new Date();

            this.cateId = cateId
            this.getRecentDocList()
        },
        changeKeyWord(keyword) {
            this.spinShow = true;
            this.pageNum = 1;
            this.docList = [];
            this.loadedPages = [];
            this.total = 100;
            this.pageSize = 60;
            this.key = new Date();

            this.keyword = keyword
            this.getRecentDocList()
        },
        changeTag(tagId) {
            this.spinShow = true;
            this.pageNum = 1;
            this.docList = [];
            this.loadedPages = [];
            this.total = 100;
            this.pageSize = 60;
            this.key = new Date();

            this.tagId = tagId
            this.getRecentDocList()
        },
        changePage(page) {
            this.pageNum = page
            this.getRecentDocList()
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

.demo-spin-col .circular {
    width:25px;
    height:25px;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}

</style>