<template>
    <div style="background-color: #fff">
        <div class="nav">
            <Nav></Nav>
        </div>
        <div class="doc-group" style="display: inline-block">
            <div style="background-color: #fff">
                <SearchInput ref="searchInput" @on-search="getListData"></SearchInput>
            </div>
            <SearchItem v-for="item in data.slice((currentPage-1)*pageSize, (currentPage)*pageSize)"
                        :id = "item.id"
                        :thumbId = "item.thumbId"
                        :title="item.title"
                        :description="item.description"
                        :time="item.createTime"
                        :user-name="item.userName"
                        :category = "item.categoryVO"
                        :tags = "item.tagVOList"
                        :collect-num="item.collectNum"
                        :comment-num="item.commentNum"
            ></SearchItem>
<!--            {{ data }}-->
<!--            :time = "item.createTime"-->
<!--            :user-name="item.userName"-->
<!--            :category="item.categoryVO.name"-->
<!--            :tags = "item.tagVO"-->

            <div class="page-container" v-show="data.length > 0 ">
                <Page
                    :model-value="currentPage"
                    :total="totalItems"
                    :page-size="pageSize"
                    @on-change="pageChange"
                />
            </div>

            <div style="padding: 30px 10px; color: #555" v-show="data.length < 1">
                <span v-if="!loading">暂无内容，试试其他呢～</span>
                <span v-else>拼命查找中，请等待...</span>
            </div>


        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import SearchItem from "@/views/searchResult/SearchItem";
import DocItem from "@/views/searchResult/DocItem";
import Footer from "@/components/MyFooter";

import DocumentRequest from "@/api/document"

import SearchInput from "./SearchInput"

export default {
    name: "Index.vue",
    data() {
        return {
            data: [],
            currentPage: 1,
            totalItems: 4,
            pageSize: 6,
            loading: true,
        }
    },
    components: {
        Nav, Footer, DocItem, SearchItem, SearchInput
    },
    mounted() {
        this.getListData()
    },
    methods: {
        getListData() {
            this.loading = true
            let keyword = this.$route.query.keyWord
            if(keyword == "") return;
            const params = {
                "categoryId": "",
                "filterWord": keyword,
                "page": this.currentPage - 1,
                "rows": this.pageSize,
                "tagId": "",
                "type": "FILTER"
            }
            DocumentRequest.getListData(params).then(res => {
                this.loading = false;
                if(res.code == 200) {
                    this.totalItems = res.data.totalNum;
                    this.data = res.data.documents;
                } else {
                    this.data = []
                }
                this.listLoading = false
                if(this.data == null || this.data.length == 0) {
                    this.info(false)
                }
            })
        },
        info (nodesc) {
            this.$Notice.info({
                title: '通知信息',
                desc: nodesc ? '' : '没有找到相关文档，试一试其他关键字'
            });
        },

        pageChange(page) {
            this.currentPage = page
            // this.getListData()
        }

    }
}
</script>

<style scoped>

.nav {
    background-color: #ffcc4f;
    width: 100%;
    height: 50px;
}
.doc-group {
    width: 1200px;
    /*position: absolute;*/
    margin-top: 50px;
    margin: auto;
    /*background-color: #dcdee2;*/
    /*background-color: rgba(245, 245, 245, 100);*/
    color: rgba(16, 16, 16, 100);
    text-align: left;
    /*padding-left: 12px;*/
}

.page-container {
    /*background-color: yellow;*/
    text-align: left;
    padding: 25px;
}


</style>