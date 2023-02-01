<template>
    <div class="tag-panel">
        <div class="tag-title">文件类型</div>
        <div class="tag-list">
            <div class="tag-item"
                 v-for="tagName in tagNames"
                 @click="selected(tagName)"
                 :class="{activeTag: activeTagName === tagName}"
            >
                {{ tagName.name }}
            </div>
        </div>
    </div>

</template>

<script>

import CategoryRequest from "@/api/category";

export default {
    name: "TagFilter",
    data() {
        return {
            // {id: "All", name: "全部"}
            tagNames: [],
            activeTagName: {id: 'ALL', name: '全部'},
            categoryType: 'TAG'
        }
    },
    mounted() {
        this.getAllItems()
    },
    methods: {
        selected: function (tagName) {
            this.activeTagName = tagName
            let id = tagName.id
            if (id === 'ALL') {
                id = ''
            }
            this.$emit("changeTag", id)

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
                this.tagNames = [{id: "ALL", name: "全部分类", createDate: '', updateDate: ''}]
                if (response.data.length > 0) {
                    response.data.forEach(item => {
                        if (item.name.length > 8) {
                            item['name'] = item.name.slice(0, 8) + "..."
                        } else {
                            item['name'] = item.name
                        }
                        this.tagNames.push(item)
                    })
                }
            })
        },
    }
}
</script>

<style scoped lang="scss">
.tag-panel {
    margin: 30px 0 22px 0;
    display: flex;
    justify-content: left;

    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC, serif;
    font-weight: 600;
    color: #464646;
    line-height: 22px;

    .tag-title {
        width: 64px;
        height: 22px;
        margin-right: 40px;
        white-space: nowrap; /*规定段落中的文本不进行换行 */

    }

    .tag-list {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        max-height: 120px;
        overflow-y: auto;

        .tag-item {
            padding-right: 20px;
            cursor: pointer;

            &:hover {
                color: #F2A500;
            }
        }

        .activeTag {
            color: #F2A500;
        }

    }
}

</style>