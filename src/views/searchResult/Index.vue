<template>
    <div>
        <div style="background-color: red; ">
            <Nav></Nav>
        </div>
        <div class="doc-group" style="display: inline-block">
<!--            <SearchItem class="doc-item"></SearchItem>-->
<!--            <DocItem></DocItem>-->
            <SearchItem v-for="item in data"
                        :id = "item.id"
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

export default {
    name: "Index.vue",
    data() {
        return {
            data: []
        }
    },
    components: {
        Nav, Footer, DocItem, SearchItem
    },
    mounted() {
        this.getListData()
    },
    methods: {
        getListData() {
            let keyword = this.$route.query.keyWord
            if(keyword == "") return;
            const params = {
                "categoryId": "",
                "filterWord": keyword,
                "page": 0,
                "rows": 10,
                "tagId": "",
                "type": "FILTER"
            }
            DocumentRequest.getListData(params).then(response => {
                this.data = response.data
                this.listLoading = false
                console.log(this.data)
                if(this.data == null) {
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
    }
}
</script>

<style scoped>
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



</style>