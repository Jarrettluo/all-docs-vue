<template>
    <div class="docTable">
        <div class="table-container">
            <Table border ref="selection" :columns="filterColumns||columns" :data="data" :loading="loading">
                <template #name="{ row }">
                    <p class="doc-title" @click="preview(row.id)">
                        <Badge status="error" v-if="row['docState']==='FAIL'"/>
                        <Badge status="warning" v-else-if="row['docState']==='ON_PROCESS'"/>
                        <Badge status="processing"  v-else-if="row['docState']==='WAITE'" />
                        <Badge status="success"  v-else />
                        {{ row.title }}</p>
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

        <Modal
            v-model="action_modal"
            title="文档详情"
            :loading="action_loading"
            @on-ok="asyncOK">
            <div>
                <p><strong>标题</strong> {{ document_info.title }}</p>
            </div>
            <div style="padding-top: 10px">
                <p><strong>大小</strong> {{ document_info.size1 }}</p>
            </div>
            <div style="padding-top: 10px">
                <p><strong style="vertical-align: bottom;">索引状态</strong>
                    <span>  </span>
                    <Button style="margin-left: 10px" v-if="document_info['docState'] === 'SUCCESS'" type='success'
                            size="small"
                            @click="infoVisible ? infoVisible=false:infoVisible=true">
                        成功
                    </Button>
                    <Button style="margin-left: 10px" v-else-if="document_info['docState'] === 'WAITE'" type='info'
                            size="small"
                            @click="infoVisible ? infoVisible=false:infoVisible=true">
                        等待中
                    </Button>
                    <Button style="margin-left: 10px" v-else-if="document_info['docState'] === 'ON_PROCESS'"
                            type='warning' size="small"
                            @click="infoVisible ? infoVisible=false:infoVisible=true">
                        进行中
                    </Button>
                    <Button style="margin-left: 10px" v-else type='error' size="small"
                            @click="infoVisible ? infoVisible=false:infoVisible=true">
                        失败
                    </Button>
                </p>
                <div v-show="infoVisible"
                     style="background-color: #f6f8fa;color: #da702b;border-radius: 4px;padding: 4px;font-size: 12px;
                margin-top: 8px;
">
                    <span v-if="document_info['docState'] === 'SUCCESS'">
                        索引建立成功，可以下载<span style="color: #408FFF; cursor: pointer"
                                         @click="downloadTxt(document_info)">文本文件</span>。
                        您可以选择 <span style="color: #dc4e2b; cursor: pointer"
                                    @click="rebuildIndex(document_info)">重建索引</span>。
                    </span>
                    <span v-else-if="document_info['docState'] === 'WAITE'">
                        等待中，请稍等。您可以选择 <span style="color: #dc4e2b; cursor: pointer"
                                            @click="rebuildIndex(document_info)">重建索引</span>。
                    </span>
                    <span v-else-if="document_info['docState'] === 'ON_PROCESS'">
                        正在进行中，请稍等
                    </span>
                    <span v-else>
                        立即<span style="color: #dc4e2b; cursor: pointer"
                                @click="rebuildIndex(document_info)">重建索引</span>。
                        错误信息：{{ document_info["errorMsg"] }}
                    </span>
                </div>
            </div>
            <div style="padding-top: 10px">
                <p><strong style="padding-top: 10px;">创建人</strong> {{ document_info.userName }}</p>
            </div>
            <div style="padding-top: 10px">
                <p><strong>分类</strong> {{ document_info['category'] }}</p>
            </div>
            <div style="padding-top: 10px">
                <p><strong style="padding-top: 10px;">标签</strong></p>
                <p v-if="document_info['tags'] === undefined || document_info['tags'].length < 1">无标签</p>
                <Tag :color="item.color" v-else v-for="item in document_info['tags']" :index="item.index">{{
                        item.name
                    }}
                </Tag>
            </div>
            <div style="padding-top: 10px">
                <strong>文档概述</strong>
                <div style="background-color: #f6f8fa;color: #64b687;border-radius: 4px;padding: 4px;font-size: 12px">
                    <p>{{ document_info.description }}</p>
                </div>
            </div>
            <div style="padding-top: 10px">
                <p><strong>创建时间</strong> {{ document_info.time }}</p>
            </div>
        </Modal>

        <Modal v-model="modal1" width="360">
            <template #header>
                <p style="color:#f60;text-align:left">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除警告</span>
                </p>
            </template>
            <div style="text-align:left;white-space:normal">
                <p style="word-wrap: break-word;word-break: break-all;">您准备删除《{{ remove_item.title }}》</p>
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

const stateMap = {
    WAITE: {
        buttonType: 'info',
        buttonContent: '等待中',
        errorInfo: '排队解析中，请稍后！',
    },
    ON_PROCESS: {
        buttonType: 'warning',
        buttonContent: '解析中',
        errorInfo: '正在解析中，请稍后！',
    },
    SUCCESS: {
        buttonType: 'success',
        buttonContent: '成功',
        errorInfo: '',
    },
    FAIL: {
        buttonType: 'error',
        buttonContent: '失败',
        errorInfo: '',
    }
}

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
                    // render: (h, params) => {
                    //     let temp = params.row['title']
                    //     if (params.row['docState'] === 'FAIL') {
                    //         temp += '失败！'
                    //     }
                    //     return h('div', [
                    //         h('span', temp)
                    //     ]);
                    // }
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
                    title: '操作',
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
            action_modal: false,
            action_loading: false,
            document_info: {},

            infoVisible: false
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
                    this.data = res.data['documents'];
                    this.totalItems = res.data['totalNum'];
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
        },
        asyncOK() {
            setTimeout(() => {
                this.action_modal = false;
            }, 2000);
        },
        /**
         * 下载文本文件
         * @param doc
         */
        downloadTxt(doc) {
            let fileId = doc['txtId']
            if (fileId === null || fileId === '') {
                return;
            }
            DocumentRequest.getTxtFile(fileId).then(res => {
                const dom = document.createElement('a');
                dom.href = URL.createObjectURL(res);
                dom.download = doc['title'] + '.txt';
                dom.click();
            }).catch(error => {
                console.log(error)
            })
        },
        /**
         * 对文档进行重新建立索引
         * @param doc
         */
        rebuildIndex(doc) {
            let docId = doc['id']
            if (docId === null || docId === '') {
                return;
            }
            DocumentRequest.getRebuildIndex({docId: docId}).then(res => {
                if (res.code === 200) {
                    this.action_modal = false
                } else {
                    this.$Message.error("重建失败，请检查！")
                }
            })
        }
    }
}
</script>

<style scoped>

.page-container {
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