<template>
    <div class="main" ref="tableRef">
        <Table width="100%" :height="height" border :columns="columns" :data="data">
            <template #name="{ row }">
                <!--            <strong>{{ row.name }}</strong>-->
                {{row.username}}
            </template>
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">屏蔽</Button>
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
                        :model-value="currentPage"
                        :total="totalItems"
                        :page-size="pageSize"
                        @on-change="pageChange"
                    />
                </Col>
            </Row>
        </div>

        <Modal v-model="remove_modal" width="360">
            <template #header>
                <p style="color:#f60;text-align:left">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除警告</span>
                </p>
            </template>
            <div style="text-align:left;white-space:normal">
                <p style="word-wrap: break-word;word-break: break-all;">您准备删除{{remove_item.username}}</p>
                <p>是否确定删除？</p>
            </div>
            <template #footer>
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </template>
        </Modal>
    </div>

</template>

<script>

import UserRequest from '@/api/user'
import {parseTime} from "@/utils/index"

export default {
    name: "UserTable",
    data () {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: "left",
                },
                {
                    title: '用户名',
                    minWidth: 260,
                    slot: 'name',
                    resizable: true,
                    fixed: "left",
                },
                {
                    title: '创建时间',
                    width: 220,
                    key: 'createDate',
                    align: 'center',
                    resizable: true,
                    render: (h, params) => {
                        let temp = ""
                        let time = params.row.createDate
                        if( time != null ){
                            temp = parseTime(new Date(time), '{y}年{m}月{d}日 {h}:{i}:{s}');
                        }
                        return h('div', [
                            h('span',  temp)
                        ]);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                    fixed: "right",
                }
            ],
            data: [],
            currentPage: 1,
            totalItems: 5,
            pageSize: 10,

            remove_modal: false,
            modal_loading: false,
            remove_item: {},

            height: 600,
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        this.init();
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 60;
            })
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
            })
        },
        remove (index) {
            this.remove_item = this.data[index];
            this.remove_modal = true;
        },
        del() {
            // this.data.splice(index, 1);
            let param = {
                id: this.remove_item.id
            }
            UserRequest.deleteData(param).then(res => {
                // console.log(res)
                this.init();
            }).catch(res => {
                console.log(res)
            })
        },
        async init() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            UserRequest.getUserList(param).then(res => {
                if (res.code === 200) {
                    let resData = res.data;
                    this.data = resData.result;
                    this.currentPage = resData.pageNum
                    this.pageSize = resData.pageSize
                    this.totalItems = resData.total
                }
            }).catch(res => {
                console.log(res)
            })
        },
        pageChange(page) {
            this.currentPage = page
            this.init()
        },
        removeBatch() {
            this.$Message.error("功能尚未开发，请等待！")
        }
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

    .page-container {
        /*background-color: yellow;*/
        text-align: right;
        padding: 5px;
    }
</style>