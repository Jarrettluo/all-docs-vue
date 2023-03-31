<template>
    <div class="content">
        <div class="main" ref="tableRef">
            <Table ref="commentTable" width="100%" :height="height" border :columns="columns" :data="tableData">
                <template #action="{ row, index }">
                    <Button type="error" size="small" @click="remove(index)">删 除</Button>
                </template>
            </Table>
            <div class="bottom-zone">
                <Row>
                    <Col span="12" class="bottom-zone-left">
                        <Button type="primary" ghost @click="removeBatch">全部删除</Button>
                    </Col>
                    <Col span="12" class="bottom-zone-right">
                        <Page
                            :model-value="currentPage"
                            :total="totalItems"
                            :page-size="pageSize"
                            @on-change="pageChange"
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
                    key: 'docName',
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

            currentPage: 1,
            totalItems: 20,
            pageSize: 10,

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

        async remove(index) {
            let item = this.data[index]
            let param = {
                ids: item.id
            }
            commentRequest.deleteData(param).then(res => {
                if (res.code === 200) {
                    this.getPageData()
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        removeBatch() {
            let selection = this.$refs.commentTable.getSelection();
            this.$Message.error("暂未开发，请等待")
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
</style>