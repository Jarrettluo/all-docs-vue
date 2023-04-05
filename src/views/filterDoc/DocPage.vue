<template>
    <div class="main-container">
        <category-filter @changeCate="changeCate" @changeKeyWord="changeKeyWord"></category-filter>
        <tag-filter @changeTag="changeTag"></tag-filter>
        <div class="tab">
            <Tabs value="name1">
                <TabPane label="最近上传" name="name1">
                    <filter-list-page :data="docList" :total="total" :pageNum="pageNum"
                                      :pageSize="pageSize" @on-page-change="changePage"></filter-list-page>
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
            total: 1,
            pageNum: 1,
            pageSize: 24,
            tagId: '',
            cateId: '',
            keyword: ''
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
            let param = {
                cateId: this.cateId,
                tagId: this.tagId,
                keyword: this.keyword,
                page: this.pageNum,
                rows: this.pageSize
            }
            if (this.requestType === 'collect') {
                CategoryRequest.getMyCollectList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        this.docList = result.data
                        this.pageNum = result.pageNum + 1;
                        this.total = result.total;
                        this.pageSize = result.pageSize
                    }
                }).catch(err => {
                    this.$Message.error("出错：" + err)
                })
            } else if (this.requestType === 'upload') {
                CategoryRequest.getMyUploadList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        this.docList = result.data
                        this.pageNum = result.pageNum + 1;
                        this.total = result.total;
                        this.pageSize = result.pageSize
                    }
                }).catch(err => {
                    this.$Message.error("出错：" + err)
                })
            } else {
                CategoryRequest.getDocList(param).then(res => {
                    if (res.code === 200) {
                        let result = res.data;
                        this.docList = result.data
                        this.pageNum = result.pageNum + 1;
                        this.total = result.total;
                        this.pageSize = result.pageSize
                    }
                }).catch(err => {
                    this.$Message.error("出错：" + err)
                })
            }

        },
        changeCate(cateId) {
            this.cateId = cateId
            this.getRecentDocList()
        },
        changeKeyWord(keyword) {
            this.keyword = keyword
            this.getRecentDocList()
        },
        changeTag(tagId) {
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

</style>