<template>
    <div class="docTable">
        <div class="table-container">
            <Table border ref="selection" :columns="filterColumns||columns" :data="data" :loading="loading">
                <template #name="{ row }">
                    <!--            <strong>{{ row.name }}</strong>-->
                    <p class="doc-title" @click="preview(row.id)">{{ row.title }}</p>
                </template>
                <template #action="{ row, index }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
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

        <Modal v-model="modal1" width="360">
            <template #header>
                <p style="color:#f60;text-align:left">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除警告</span>
                </p>
            </template>
            <div style="text-align:left;white-space:normal">
                <p style="word-wrap: break-word;word-break: break-all;">您准备删除《{{remove_item.title}}》</p>
                <p>是否确定删除？</p>
            </div>
            <template #footer>
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </template>
        </Modal>
    </div>

</template>

<script>
import DocumentRequest from "@/api/document"
import {parseTime} from "@/utils"
import fileTool from "@/utils/fileUtil"

export default {

    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    // width: 260,
                    slot: 'name',
                    // key: "title"
                    resizable: true,
                },
                // {
                //     title: '摘要',
                //     key: 'abstract'
                // },
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
                        if (params.row.categoryVO != null) {
                            temp = params.row.categoryVO.name
                            if (temp.length > 10) {
                                temp = temp.substring(0, 10) + "..."
                            }
                        }

                        return h('div', [
                            h('span', temp)
                        ]);
                    }
                },
                // {
                //     title: '标签',
                //     key: 'tag'
                // },
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
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
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
        }
    },
    filters: {
        sizeFilter: function (value) {
            return bytesToSize(value)
        }
    },
    props: {
        type: {type: String, requires: true, default: 'ALL'},
        keyword: {type: String, requires: false},
        cateId: {type: String, requires: true}
    },
    mounted() {
        this.getListData()
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
            this.$Modal.info({
                title: `${this.data[index].title}`,
                content: `size：${this.data[index].size}<br>categoryVO：${this.data[index].categoryVO}<br>tagVOList：${this.data[index].tagVOList}`
            })
        },
        remove(index) {
            this.modal1 = true
            this.remove_item = this.data[index];
        },
        del() {
            this.$emit("removeDoc", this.remove_item)
            this.modal1 = false
        },
        getListData(categoryId, filterWord) {
            const params = {
                "categoryId": categoryId,
                "filterWord": filterWord,
                "page": this.currentPage - 1,
                "rows": this.pageSize,
                "tagId": categoryId,
                "type": this.currentType
            }
            DocumentRequest.getListData(params).then(res => {
                this.loading = false
                if (res.code === 200) {
                    this.data = res.data.documents;
                    this.totalItems = res.data.totalNum;
                } else {
                    this.data = []
                    // this.$Message.error('请稍后重试！');
                }
                this.listLoading = false
                if (this.data == null) {
                    this.data = []
                }
            })
        },
        getSelect() {
            return this.$refs.selection.getSelection();
        },
        pageChange(page) {
            this.currentPage = page
            this.$emit("on-page-change", true)
        },
        preview(value) {
            this.$router.push({
                path: '/preview',
                query: {
                    docId: value
                }
            })
        }
    }
}
</script>

<style scoped>
.content {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}

.table-container {
    /*background-color: red;*/
}

.page-container {
    /*background-color: yellow;*/
    text-align: right;
    padding: 5px;
}

.doc-title {
    color: #8d7b25;
}

.doc-title:hover {
    cursor: pointer;
    font-weight: bold;
}
</style>