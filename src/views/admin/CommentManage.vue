<template>
    <div class="content">
        <div class="main" ref="tableRef">
            <Table ref="commentTable" width="100%" :height="height" border :columns="columns" :data="tableData">
                <template #docName="{ row }">
                    <p class="doc-title" @click="preview(row.docId)">
                        {{ row.docName }}</p>
                </template>
                <template #action="{ row, index }">
                    <Button type="error" size="small" @click="remove(row)">删 除</Button>
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
    </div>
</template>

<script>
import commentRequest from '@/api/comment'
import {parseTime} from "@/utils"

export default {
    name: "CommentManage",
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: "left"
                },
                {
                    title: '时间',
                    key: 'createDate',
                    width: 220,
                    render: (h, params) => {
                        let temp = ""
                        let time = params.row.createDate
                        if (time != null) {
                            temp = parseTime(new Date(time), '{y}年{m}月{d}日 {h}:{i}:{s}');
                        }
                        return h('div', [
                            h('span', temp)
                        ]);
                    }
                },
                {
                    title: '用户',
                    key: 'userName',
                    width: 200
                },
                {
                    title: '文档名称',
                    slot: 'docName',
                    // width: 300
                },
                {
                    title: '内容',
                    key: 'content',
                    width: 380
                },
                {
                    title: '操作',
                    slot: 'action',
                    fixed: 'right',
                    width: 90
                }
            ],
            height: 600,

            currentPage: this.$route.query.page || 1,
            totalItems: 5,
            pageSize: this.$route.query.size || 20,

            tableData: []
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        this.getPageData()
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 60;
            })
        },

        /**
         * 管理评论页面查询列表方法
         * @returns {Promise<void>}
         */
        async getPageData() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            commentRequest.getAllComments(param).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data.data
                    this.totalItems = res.data.total

                    this.$router.replace({
                        path: '/admin/commentManage',
                        query: {
                            page: this.currentPage,
                            size: this.pageSize
                        }
                    })

                } else {
                    this.tableData = []
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        pageChange(page) {
            this.currentPage = page
            this.getPageData()
        },

        pageSizeChange(size) {
            this.pageSize = size
            this.getPageData()
        },
        // 管理员删除一条评论
        async remove(row) {
            let param = {
                ids: [row.id]
            }
            await commentRequest.deleteDataBatch(param).then(res => {
                if (res.code === 200) {
                    this.getPageData()
                    this.$Message.success("删除成功")
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        // 管理员删除一批评论
        async removeBatch() {
            let selection = this.$refs.commentTable.getSelection();
            let array = []
            selection.forEach((element) => array.push(element.id));
            let param = {
                ids: array
            }
            await commentRequest.deleteDataBatch(param).then(res => {
                if (res.code === 200) {
                    this.getPageData()
                    this.$Message.success("删除成功")
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        preview(value) {
            this.$router.push({
                path: '/preview',
                query: {
                    docId: value
                }
            })
        },
    }
}

</script>

<style scoped lang="scss">

.content {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;

    .main {
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

.doc-title {
    color: #8d7b25;
}

.doc-title:hover {
    cursor: pointer;
    font-weight: bold;
}
</style>