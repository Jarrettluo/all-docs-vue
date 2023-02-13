<template>
    <div class="main" ref="tableRef">
        <Table ref="logTable" width="100%" :height="height" border :columns="columns" :data="data">
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
</template>
<script>
import {resolveComponent} from 'vue'

import {parseTime} from "@/utils"
import docLogRequest from '@/api/docLog'

export default {
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
                    width: 200,
                    fixed: 'left'
                },
                {
                    title: '用户',
                    key: 'user',
                    width: 200
                },
                {
                    title: '动作',
                    key: 'action',
                    width: 180
                },
                {
                    title: '文档名称',
                    key: 'name',
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

            actionMap: {
                DELETE: '删除',
                GET: '查询'
            },

            height: 600,
            currentPage: 1,
            totalItems: 10,
            pageSize: 10,
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        // this.getPageData()
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })

        },
        async getPageData() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            docLogRequest.getDocLogList(param).then(res => {
                if (res.code === 200) {
                    let result = res.data.data;
                    this.totalItems = res.data.total;
                    this.data = []
                    let obj = {}

                    for (let resultElement of result) {
                        obj['id'] = resultElement['id']
                        obj['time'] = parseTime(new Date(resultElement['createDate']), '{y}年{m}月{d}日 {h}:{i}:{s}');// resultElement['createTime']
                        obj['user'] = resultElement['userName']
                        obj['action'] = this.actionMap[resultElement['action']] || "未知动作"
                        obj['name'] = resultElement['docName']
                        this.data.push(obj)
                        obj = {}
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },

        remove(index) {
            console.log(this.data[index])
            this.removeFunc([this.data[index].id])
        },

        removeBatch() {

            this.$Message.info('receive cancel');
            let currentSelection = this.$refs.logTable.getSelection();
            if (currentSelection.length < 1) {
                this.$Message.warning("请勾选！")
                return
            }

            let ids = []
            for (let item of currentSelection) {
                ids.push(item.id)
            }
            this.removeFunc(ids)
        },

        async removeFunc(ids) {
            let param = {
                ids: ids
            }
            await docLogRequest.removeDocLog(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("success")
                } else {
                    this.$Message.error("error!")
                }
                this.getPageData()
            }).catch(err => {
                this.$Message.error("error:" + err)
            })
        },
        pageChange(page) {
            this.currentPage = page
            this.getPageData()
        },
    }
}
</script>

<style scoped lang="scss">

.main {
    height: 100%;
    width: 100%;

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