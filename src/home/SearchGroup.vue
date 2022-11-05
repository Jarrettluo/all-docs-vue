<template>
    <div class="search-group">
        <div class="search-zone">
            <div class="logo">
                <img :src="logoSrc" width="100%" height="100%" alt=""/>
            </div>
            <div class="search-input">
                <div class="search-input-top">
                    <div class="search-selection">
                        <span>全部</span>
                    </div>
                    <input :placeholder="placeholder" v-model="searchValue"
                           @keyup.enter="clickToSearch(searchValue)"></input>
                    <div class="search-button"
                         style="width: 100px; line-height: 45px; display: flex; align-content: center; flex-wrap: wrap; justify-content: center;"
                         @click="clickToSearch(searchValue)"
                    >
                        <img :src="searchSrc" width="16px" height="16px" alt="" style="display: inline-block;"/>
                    </div>
                </div>
                <div class="search-input-bottom" v-show="hotSearch.length">
                    <span class="title" style="font-width: 500;">推荐搜索：</span>
                    <span class="search-tag" style="margin-left: 20px;"
                          v-for="item in hotSearch"
                          @click="clickToSearch(item)"
                    >{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import StatsRequest from "@/api/stats";

export default {
    name: "SearchGroup",
    data() {
        return {
            logoSrc: require("../assets/svg/newLogo.svg"),
            searchSrc: require("../assets/svg/search.svg"),
            placeholder: '请输入您想要查找的文档',
            hotSearch: [],
            searchValue: ''
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            StatsRequest.getSearchHistory().then(response => {
                if (response.code === 200) {
                    this.hotSearch = response.data.hotSearch;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        clickToSearch(value) {
            if (value !== "") {
                this.$router.push({
                    path: '/searchResult',
                    query: {
                        keyWord: value
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.search-group {
    width: 100%;
    height: 340px;
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 100px;

    .search-zone {
        width: 745px;
        margin: auto;
        display: flex;
        justify-content: flex-start;

        .logo {
            width: 167px;
            height: 45px;
            margin-right: 18px;
        }

        .search-input {
            .search-input-top {
                width: 560px;
                height: 45px;
                background-color: #fff;
                border-radius: 8px;
                border: 1px solid #000;
                display: flex;
                justify-content: flex-start;
                align-content: center;

                .search-selection {
                    width: 140px;
                    border-right: 1px solid #aaa;
                    margin-right: 5px;
                    height: 43px;
                    line-height: 45px;
                    display: inline-block;
                    vertical-align: middle;

                    &:hover {
                        cursor: pointer;
                    }

                    span {
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC, serif;
                        font-weight: 500;
                        color: #000000;
                        line-height: 20px;
                    }
                }

                input {
                    height: 43px;
                    width: 400px;
                    text-decoration: none;
                    outline: none;
                    border: none;
                }

                .search-button {
                    &:hover {
                        cursor: pointer;
                        background-color: #fceac8;
                        border-radius: 0 8px 8px 0;
                    }
                }
            }

            .search-input-bottom {
                margin-top: 20px;
                padding-left: 5px;
                text-align: left;
                font-size: 14px;
                line-height: 20px;

                .title {
                    font-family: PingFangSC-Medium, PingFang SC, serif;
                    font-weight: 500;
                    color: #464646;
                    line-height: 20px;
                }

                .search-tag {
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>