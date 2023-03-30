<template>
    <div class="category-container">
        <div class="cate-left">
            <div class="category-title">
                <p>{{ checkedCategory.name }}</p>
                <div class="category-title-tip">
                    <Tooltip :content="checkedCategory.name" theme="light"
                             placement="top"
                             max-width="200"
                    >
                    </Tooltip>
                </div>
            </div>
            <div class="cate-dropdown">
                <Dropdown @on-click="switchCategory">
                    <a href="javascript:void(0)">
                        切换分类
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem
                                v-for="item in categoryOption"
                                :name="item.id"
                            >
                                {{ item.seeName }}
                            </DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
        </div>
        <div class="cate-right">
            <div class="search-input-top">
                <input :placeholder="placeholder" v-model="searchValue"
                       @keyup.enter="clickToSearch(searchValue)"></input>
                <div class="search-button"
                     style="width: 100px; line-height: 45px; display: flex; align-content: center; flex-wrap: wrap; justify-content: center;"
                     @click="clickToSearch(searchValue)"
                >
                    <img :src="searchSrc" width="16px" height="16px" alt="" style="display: inline-block;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import CategoryRequest from "@/api/category";

export default {
    name: "CategoryFilter",
    data() {
        return {
            logoSrc: require("@/assets/svg/newLogo.svg"),
            searchSrc: require("@/assets/svg/search.svg"),
            placeholder: '请输入您想要查找的文档',
            categoryType: 'CATEGORY',
            searchValue: '',
            categoryOption: [],
            checkedCategory: {id: "ALL", name: "全部分类"},

        }
    },
    mounted() {
        this.getAllItems()
    },
    methods: {
        switchCategory(param) {
            this.checkedCategory = this.categoryOption.find(item => item.id === param)
            if (param === 'ALL') {
                param = ''
            }
            this.$emit("changeCate", param)
        },
        clickToSearch(searchValue) {
            this.$emit("changeKeyWord", searchValue)
        },
        getAllItems() {
            this.loading = true
            const params = {
                type: this.categoryType
            };
            CategoryRequest.getListData(params).then(response => {
                this.loading = false;
                if (response.code !== 200) {
                    return;
                }
                this.listLoading = false
                this.categoryOption = [{id: "ALL", name: "全部分类", seeName: '全部分类', createDate: '', updateDate: ''}]
                if (response.data.length > 0) {
                    response.data.forEach(item => {
                        if (item.name.length > 8) {
                            item['seeName'] = item.name.slice(0, 8) + "..."
                        } else {
                            item['seeName'] = item.name
                        }
                        this.categoryOption.push(item)
                    })
                }
            })
        },
    }
}
</script>

<style scoped lang="scss">
.category-container {
    line-height: 45px;
    width: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    justify-content: space-between;

    .cate-left {
        text-align: left;
        width: 50%;
        display: flex;
        justify-content: flex-start;

        .category-title {
            max-width: calc(100% - 100px);
            height: 45px;
            line-height: 45px;
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC, serif;
            font-weight: 600;
            color: #000000;
            position: relative;

            p {
                -o-text-overflow: ellipsis;
                overflow: hidden; /*超出部分隐藏*/
                text-overflow: ellipsis; /* 超出部分显示省略号 */
                white-space: nowrap; /*规定段落中的文本不进行换行 */
            }

            .category-title-tip {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 2;

                .ivu-tooltip {
                    width: 100%;
                }
            }

        }

        .cate-dropdown {
            text-align: center;
            width: 117px;
            height: 45px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #000000;
            margin-left: 10px;

            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC, serif;
            font-weight: 500;
            color: #000000;
            line-height: 45px;
        }
    }

    .cate-right {
        width: 40%;
        text-align: right;

        .search-input-top {

            width: 100%;
            height: 45px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #000000;
            padding-left: 10px;

            display: flex;
            justify-content: flex-start;
            align-content: center;

            input {
                height: 43px;
                width: 100%;
                text-decoration: none;
                outline: none;
                border: none;
            }

            .search-button {
                &:hover {
                    cursor: pointer;
                    border-radius: 0 8px 8px 0;
                }
            }
        }
    }

}
</style>