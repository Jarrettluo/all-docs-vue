<template>
    <div class="search-result" ref="searchResult">
        <div class="top-group">
            <img :src="imgSrc" width="100%" height="100%" alt=""/>
            <SearchGroup ref="searchInput" @on-search="getListData"></SearchGroup>
            <div class="user-zone" v-if="!ad && !tokenExpired">
                <Dropdown>
                    <a class="user-tag" href="javascript:void(0)" style="text-align: center; width: 36px;"
                       @mouseenter="checkLogin">
                        <img :src="0 | userAvatar" alt="">
                    </a>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem @click.native="gotoAdminPage">系统管理</DropdownItem>
                            <DropdownItem @click.native="$router.push('/userPage')">个人主页</DropdownItem>
                            <DropdownItem @click.native="logout()" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
            <div class="user-zone" v-else>
                <a class="user-tag" href="javascript:void(0)" style="text-align: center; width: 36px;"
                   @click="$router.push('/login')">
                    <img :src="defaultAvatar" alt="">
                </a>
            </div>
        </div>
        <div class="doc-group" ref="docGroup" style="">
            <SearchItem v-for="item in data.slice((currentPage-1)*pageSize, (currentPage)*pageSize)"
                        :id="item.id"
                        :thumbId="item.thumbId"
                        :title="item.title"
                        :description="item.description"
                        :time="item.createTime"
                        :user-name="item.userName"
                        :category="item.categoryVO"
                        :tags="item.tagVOList"
                        :collect-num="item.collectNum"
                        :comment-num="item.commentNum"
            ></SearchItem>
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
import SearchGroup from '@/home/SearchGroup'
import UserCard from '@/home/UserCard'
import StaticSourceUrl from "@/api/staticSourceUrl"

export default {
    name: "Index.vue",
    data() {
        return {
            data: [],
            currentPage: 1,
            totalItems: 4,
            pageSize: 6,
            loading: true,

            imgSrc: require("@/assets/source/banner.png"),
            defaultAvatar: require("@/assets/source/user_avater.png"),
            currentData: [],
            tokenExpired: false,
        }
    },

    computed: {
        ad() {
            let item = localStorage.getItem("token");
            return (item === null || item === undefined || item === "");
        }
    },
    filters: {
        userAvatar() {
            let value = localStorage.getItem("avatar")
            if (value === "" || value === 'null' || value === null || value === undefined) {
                return require("@/assets/source/user_avater.png");
            } else {
                return StaticSourceUrl.imageUrl(value);
            }
        }
    },
    components: {
        Nav, Footer, DocItem, SearchItem, SearchInput,

        SearchGroup,
        UserCard
    },
    mounted() {
        this.getListData()
    },
    methods: {
        getListData() {
            this.loading = true
            let keyword = this.$route.query.keyWord
            if (keyword === "") return;
            const params = {
                "categoryId": "",
                "filterWord": keyword,
                "page": this.currentPage - 1,
                "rows": this.pageSize,
                "tagId": "",
                "type": "FILTER",
                "userId": localStorage.getItem("id")
            }
            DocumentRequest.getListData(params).then(res => {
                this.loading = false;
                if (res.code === 200) {
                    this.totalItems = res.data.totalNum;
                    this.data = []
                    let docs = res.data.documents;
                    docs.forEach(
                        item => {
                            item.title = item.title.replace(keyword, "<span class='em-title'>" + keyword + "</span>")
                            this.data.push(item)
                        }
                    )
                } else {
                    this.data = []
                }
                this.listLoading = false
                if (this.data == null || this.data.length === 0) {
                    this.info(false)
                }
                this.$refs['searchResult'].style.height = '1060px'
                if (this.totalItems > 1) {
                    this.$nextTick(item => {
                        this.$refs['searchResult'].style.height = (300+ this.$refs.docGroup.clientHeight) + "px"
                        }
                    )
                }
            })
        },
        info(info) {
            this.$Notice.info({
                title: '通知信息',
                desc: info ? '' : '没有找到相关文档，试一试其他关键字'
            });
        },
        pageChange(page) {
            this.currentPage = page
        },

        async checkLogin() {
            let item = localStorage.getItem("token");
            if (item == null || item === "") {
                return;
            }
            await UserRequest.checkUserLogin().then(res => {
                if (res.code !== 200) {
                    this.$Message.error("token 已过期")
                    localStorage.clear();
                    this.tokenExpired = true
                }
            }).catch(err => {
                this.$Message.error("token 已过期")
                localStorage.clear();
                this.tokenExpired = true
            })
        },

        gotoAdminPage() {
            if (localStorage.getItem('type')==='ADMIN') {
                this.$router.push('/admin/allDocuments')
            } else {
                this.$Message.warning("请使用管理员账号登录！")
            }
        },

        logout() {
            localStorage.clear()
            this.$router.push({
                name: 'Login'
            })
        },



    }
}
</script>

<style scoped lang="scss">

.nav {
    background-color: #ffcc4f;
    width: 100%;
    height: 50px;
}

.search-result {
    width: 100%;
    background-color: #F7F7F7;
    height: 100%;

    .top-group {
        height: 340px;
        width: 100%;
        padding-bottom: 40px;
        z-index: -1;
        text-align: center;
        .user-zone {
            position: absolute;
            right: 40px;
            top: 20px;
            display: flex;
            justify-content: flex-start;
            padding: 5px 5px 0 5px;

            span {
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC, serif;
                font-weight: 400;
                color: #000000;
                padding-right: 10px;
            }

            .user-tag {

                border-radius: 60px;
                box-sizing: content-box;
                img {
                    border-radius: 38px;
                    height: 36px;
                    width: 36px;
                    box-shadow: 0 0 4px #bbbbbb;
                }

            }

            &
            :hover {
                cursor: pointer;
                background-color: rgba(#fff, 0.2);
                border-radius: 40px;
            }

        }

        .button-group {
            height: 120px;
            position: absolute;
            top: 225px;
            width: 1200px;
            left: calc(50% - 600px);
        }

    }

    .doc-group {
        width: 1200px;
        position: absolute;
        margin: auto;
        color: rgba(16, 16, 16, 100);
        text-align: left;

        min-height: 815px;
        background: #FFFFFF;
        box-shadow: 0 0 5px 0 rgba(64,64,64,0.3);
        border-radius: 8px;
        top: 209px;
        left: calc(50% - 600px);
        padding: 20px;

        display: inline-block;

    }

}

.page-container {
    /*background-color: yellow;*/
    text-align: left;
    padding: 25px;
}


</style>