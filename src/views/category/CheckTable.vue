<template>
    <div style="margin: -20px 0;">
        <div style="line-height: 48px;">
            <Space>
                筛选:
                <Input v-model="filterWord" prefix="ios-search" placeholder="输入关键字" style="width: auto;margin-right: 12px;"/>
                <Button @click="search">搜索</Button>
            </Space>
        </div>
        <div class="docTable">
            <div class="table-container">
                <Table border ref="selection" :columns="columns" :data="data" :loading="loading">
                    <template #name="{ row }">
                        <p>{{row.title}}</p>
                    </template>
                </Table>
            </div>
            <div class="page-container">
                <Page
                    :model-value="currentPage"
                    :total="totalItems"
                    :page-size="pageSize"
                    @on-change="pageChange"
                />
            </div>
        </div>

    </div>

</template>

<script>
import DocumentRequest from "@/api/document"
import {parseTime} from "@/utils"
import fileTool from "@/utils/fileUtil"

export default {
    name: 'CheckTable',
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '名称',
                    minWidth: 260,
                    slot: 'name',
                    // key: "title"
                    resizable: true,
                    fixed: 'left'
                },
                {
                    title: '大小',
                    width: 120,
                    key: 'size',
                    align: 'center',
                    resizable: true,
                    render: (h, params) => {
                        return h('div', [
                            h('span', fileTool.bytesToSize(params.row.size))
                        ]);
                    }
                },
                {
                    title: '分类',
                    width: 240,
                    key: 'categoryVO',
                    align: 'center',
                    resizable: true,
                    // slot: 'category'
                    render: (h, params) => {
                        let temp = ""
                        if (params.row['categoryVO'] != null) {
                            temp = params.row['categoryVO'].name
                            if (temp !== null && temp !== undefined && temp.length > 10) {
                                temp = temp.substring(0, 10) + "..."
                            }
                        }

                        return h('div', [
                            h('span', temp)
                        ]);
                    }
                },
                {
                    title: '创建人',
                    width: 120,
                    key: 'userName',
                    align: 'center',
                    resizable: true
                },
                {
                    title: '创建时间',
                    width: 220,
                    key: 'createTime',
                    align: 'center',
                    resizable: true,
                    render: (h, params) => {
                        let temp = ""
                        let time = params.row.createTime
                        if (time != null) {
                            temp = parseTime(new Date(time), '{y}年{m}月{d}日 {h}:{i}:{s}');
                        }
                        return h('div', [
                            h('span', temp)
                        ]);
                    }
                }
            ],
            data: [],
            currentPage: 1,
            totalItems: 100,
            pageSize: 10,
            loading: true,
            modal1: false,
            modal_loading: false,
            remove_item: {},
            action_modal: false,
            action_loading: false,
            document_info: {},

            infoVisible: false,
            filterWord: ""
        }
    },
    filters: {
        sizeFilter: function (value) {
            return fileTool.bytesToSize(value)
        }
    },
    props: {
        type: {type: String, requires: true, default: 'ALL'},
        keyword: {type: String, requires: false},
        cateId: {type: String, requires: true}
    },
    mounted() {
        // this.getListData()
    },
    computed: {
        filterColumns() {
            //根据自己的要求去显示和隐藏某一列  我这里想要隐藏操作列
            if (this.type === "CATEGORY" || this.type === "TAG") {
                // if (this.type != "ADD") {
                //     return this.columns.filter(col => col.type !== 'selection')
                // }
                return this.columns.filter(col => col.key !== 'categoryVO' && col.type !== "selection");
            } else if (this.type === "ALL") {
                return this.columns.filter(col => col.type !== "selection");
            } else {
                return this.columns
            }
        },
        currentType: function () {
            if (["ALL", 'CATEGORY', 'TAG'].indexOf(this.type) < 0) {
                return 'ALL';
            }
            return this.type;
        },
        // allSelected: function() {
        //     console.log(this.$refs.selection)
        //     return this.$refs.selection;
        // }
    },
    methods: {
        show(index) {
            this.action_modal = true
            this.infoVisible = false
            let checked_doc = Object.create(this.data[index])
            this.document_info = checked_doc;
            this.document_info["time"] = parseTime(new Date(checked_doc.createTime),
                '{y}年{m}月{d}日 {h}:{i}:{s}')
            this.document_info["size1"] = fileTool.bytesToSize(checked_doc.size)
            if (checked_doc['categoryVO'] === null || !checked_doc['categoryVO'].hasOwnProperty("name") || checked_doc['categoryVO'].name === null) {
                this.document_info['category'] = "无"
            } else {
                this.document_info['category'] = checked_doc['categoryVO'].name
            }
            this.document_info['tags'] = checked_doc['tagVOList'] || [];
            this.document_info['description'] = checked_doc['description'] || "无";
        },
        remove(index) {
            this.modal1 = true
            this.remove_item = this.data[index];
        },
        del() {
            this.$emit("removeDoc", this.remove_item)
            this.modal1 = false
        },

        search() {
            this.currentPage = 1;
            this.pageSize = 10;
            this.getListData(this.cateId, this.filterWord)
        },
        getListData(categoryId, filterWord) {
            const params = {
                "categoryId": categoryId || this.cateId,
                "tagId": categoryId || this.cateId,
                "type": this.currentType,
                "filterWord": filterWord || this.filterWord,
                "page": this.currentPage - 1,
                "rows": this.pageSize,
            }
            console.log(params)
            DocumentRequest.getDataWithCheck(params).then(res => {
                this.loading = false
                if (res.code === 200) {
                    let documents = res.data['documents'];
                    documents.forEach( item => {
                        if(item.checked === true) {
                            item['_checked'] = true
                            item['_disabled'] = true
                        }
                    })
                    this.data = documents;
                    this.totalItems = res.data['totalNum'];
                } else {
                    this.data = []
                    this.$Message.error('请稍后重试！');
                }
            })
        },
        getSelect() {
            return this.$refs.selection.getSelection();
        },
        pageChange(page) {
            this.currentPage = page
            this.getListData(this.cateId, this.filterWord);
        },
        preview(value) {
            this.$router.push({
                path: '/preview',
                query: {
                    docId: value
                }
            })
        },
        asyncOK() {
            setTimeout(() => {
                this.action_modal = false;
            }, 2000);
        }
    }
}
</script>

<style scoped>

.page-container {
    text-align: right;
    padding: 5px;
}
</style>