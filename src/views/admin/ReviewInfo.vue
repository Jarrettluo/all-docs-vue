<template>
    <div class="main" ref="tableRef">
        <Table ref="reviewInfoTable" width="100%" :height="height" size="small" :columns="columns" :data="data">
            <template #checkSate="{row ,index}">
                <Tag v-if="row.checkState === true" color="success">通过</Tag>
                <Tag v-else-if="row.checkState === false" color="error">拒绝</Tag>
                <Tag v-else color="primary">未知</Tag>
            </template>
            <template #readState="{row ,index}">
                <Tag v-if="row.readState === true" type="border" color="success">已读</Tag>
                <Tag v-else type="border" color="primary">未读</Tag>
            </template>
            <template #action="{ row, index }">
                <Button type="error" size="small" @click="remove(index)">清 除</Button>
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
                        @on-change="pageChange"
                        show-total
                        show-sizer
                        @on-page-size-change="pageSizeChange"
                    />
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import {parseTime} from "@/utils"
import reviewRequest from '@/api/docReview'
export default {
    name: "ReviewInfo",
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
                    key: 'time',
                    width: 220
                },
                {
                    title: '文档名称',
                    key: 'name',
                    minWidth: 200,
                    maxWidth: 330
                    // fixed: 'left'
                },
                {
                    title: '提交用户',
                    key: 'userName',
                    width: 200
                },
                {
                    title: '审核状态',
                    // key: 'checkState',
                    slot: 'checkSate',
                    width: 120
                },
                {
                    title: '理由',
                    key: 'viewInfo',
                    minWidth: 200
                },
                {
                    // 已读/未读
                    title: '状态',
                    slot: 'readState',
                    width: 120
                    // width: 300
                },
                {
                    title: '操作',
                    slot: 'action',
                    fixed: 'right',
                    width: 90
                }
            ],
            data: [],
            height: 600,

            currentPage: this.$route.query.page || 1,
            totalItems: 5,
            pageSize: this.$route.query.size || 20,

        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })
        },
        async getDocData() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            reviewRequest.getReviewLog(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data;
                    this.data = []
                    let obj = {}
                    for (let resultElement of result) {
                        obj['id'] = resultElement['id']
                        obj['name'] = resultElement['docName']
                        obj['user'] = resultElement['createUser'] || '未知'
                        obj['time'] = parseTime(new Date(resultElement['createDate']), '{y}年{m}月{d}日 {h}:{i}:{s}'); //
                        obj['checkState'] = resultElement['checkState']
                        obj['viewInfo'] = resultElement['reviewLog']
                        obj['readState'] = resultElement['readState']
                        obj['userName'] = resultElement['userName'] || '未知'
                        this.data.push(obj)
                        obj = {}
                    }
                    this.totalItems = res.data.total

                    this.$router.replace({
                        path: '/admin/docReview',
                        query: {
                            panel: "info",
                            page: this.currentPage,
                            size: this.pageSize
                        }
                    })

                }
            }).catch(() => {
                this.$Message.warning("操作失败！")
            })
        },
        async remove(index) {
            let item = this.data[index]
            let param = {
                ids: [item.id]
            }
            reviewRequest.removeReviewLog(param).then(res => {
                if (res.code === 200) {
                    this.getDocData()
                    this.$Message.success("清除成功！")
                } else {
                    this.$Message.warning("操作失败！")
                }
            }).catch(() => {
                this.$Message.warning("操作失败！")
            })
        },
        async removeBatch() {
            let currentSelection = this.$refs.reviewInfoTable.getSelection();
            if (currentSelection.length < 1) {
                this.$Message.warning("请勾选！")
                return
            }

            let ids = []
            for (let item of currentSelection) {
                ids.push(item.id)
            }
            let param = {
                ids: ids
            }
            await reviewRequest.removeReviewLog(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("清除成功！")
                } else {
                    this.$Message.error("操作失败!")
                }
                this.getDocData()
            }).catch(err => {
                this.$Message.error("操作失败:" + err)
            })

        },
        pageChange(page) {
            this.currentPage = page
            this.getDocData()
        },
        pageSizeChange(size) {
            this.pageSize = size
            this.getDocData()
        },
    }
}
</script>

<style scoped lang="scss">

.main {
    width: 100%;
    height: 100%;
    position: relative;

    .bottom-zone {
        position: absolute;

        bottom: 50px;
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

</style>