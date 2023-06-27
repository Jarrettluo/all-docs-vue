<template>
    <div class="docTable">
        <div class="table-container" ref="docTable">
            <Table border ref="selection" width="100%" :height="height" :columns="filterColumns||columns" :data="data" :loading="loading">
                <template #name="{ row }">
                    <p class="doc-title" @click="preview(row.id)">
                        <Badge status="error" v-if="row['docState']==='FAIL'"/>
                        <Badge status="warning" v-else-if="row['docState']==='ON_PROCESS'"/>
                        <Badge status="processing"  v-else-if="row['docState']==='WAITE'" />
                        <Badge status="success"  v-else />
                        {{ row.title }}</p>
                </template>
                <template #action="{ row, index }">
                    <Button type="success" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit_document(index)">编辑</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div class="bottom-zone">
                <Row>
                    <Col span="12" class="bottom-zone-left">
                        <Button type="primary" ghost @click="removeBatch">全部删除</Button>
                    </Col>
                    <Col span="12" class="bottom-zone-right">
                        <Page
                            :current.sync="currentPage"
                            :total="totalItems"
                            :page-size="pageSize"
                            show-total
                            show-sizer
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                        />
                    </Col>
                </Row>
            </div>

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

        <Modal
            v-model="edit_modal"
            title="文档详情"
            :loading="action_loading"
            @on-ok="asyncUpdateInfo">
            <doc-edit-modal ref="docEdit" :doc-info="doc_info"></doc-edit-modal>
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
import DocEditModal from "@/views/category/DocEditModal";

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

const routeMap = {
    ALL: "/admin/allDocuments",
    CATEGORY: "/admin/category",
    TAG: "/admin/tags"
}

export default {
    components: {DocEditModal},
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
                    minWidth: 260,
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
                    // }，
                    fixed: "left"
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
                    width: 200,
                    align: 'center',
                    fixed: 'right',
                }
            ],
            data: [],
            currentPage: this.$route.query.page || 1,
            totalItems: 100,
            pageSize: this.$route.query.size || 20,
            loading: true,
            modal1: false,
            modal_loading: false,
            remove_item: {},
            action_modal: false,
            action_loading: false,
            document_info: {},

            infoVisible: false,
            height: 600,

            edit_modal: false,
            doc_info: {fdf:"dslfj"}
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
    created() {
        this.initHeight()
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

        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.docTable.offsetHeight - 60;
            })
        },

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
                    this.$router.replace({
                        path: routeMap[this.type] || "/",
                        query: {
                            page: this.currentPage,
                            size: this.pageSize
                        }
                    })
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
        pageSizeChange(size) {
            this.pageSize = size
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
                this.getListData(this.cateId, this.filterWord)
            })
        },

        removeBatch() {
            this.$Message.error("功能正在开发中，请等待！")
        },

        edit_document(index) {
            this.edit_modal = true;
            this.$refs["docEdit"].getAllItems();
            this.$refs["docEdit"].getTagOption();

            let item = this.data[index];
            let name_list = item.title.split('.');
            if (name_list.length > 1) {
                name_list.pop()
            }
            this.doc_info.name = name_list.join(".");
            let tagList = item['tagVOList']

            let tags = []
            tagList.forEach(item => {
                tags.push({
                    name: item.id,
                    value: item.name
                })
            })
            this.doc_info["tags"] = tags;
            this.doc_info["category"] = item['categoryVO']['id'];
            this.doc_info["desc"] = item['description']
        },

        asyncUpdateInfo() {
            this.$refs['docEdit'].updateDocInfo()
        }
    }
}
</script>

<style scoped lang="scss">



.docTable {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    //margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    //padding: -16px;
    text-align: left;

    .table-container {
        height: 100%;
        width: 100%;

        position: relative;

        .bottom-zone {
            position: absolute;

            bottom: -20px;
            left: 0;

            width: 100%;
            height: 80px;
            line-height: 80px;

            .bottom-zone-left {

            }

            .bottom-zone-right {
                text-align: right;
            }
        }
    }
}

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