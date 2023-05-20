<template>
    <div class="main" ref="tableRef">
        <Table width="100%" :height="height" border :columns="columns" :data="data">
            <template #name="{ row }">
                {{ row.username }}
            </template>
            <template #permissionEnum="{row, index}">
                <Select v-model="row['permissionEnum']" style="width:100px" :disabled="row.id === currentUserId"
                        @on-change="changeRole($event, row)">
                    <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </template>
            <template #sex="{row, index}">
                <p v-if="row.male===true">男</p>
                <p v-else-if="row.male===false">女</p>
                <p v-else>女</p>
            </template>
            <template #action="{ row, index }">
                <Button type="success" size="small" @click="detail(index)" :disabled="row.id === currentUserId">编辑</Button>
                <Button v-if="row['banning']" type="primary" size="small" style="margin: 0 5px"
                        @click="blockUser(row.id)">取消屏蔽
                </Button>
                <Button v-else type="primary" size="small" style="margin: 0 5px" @click="blockUser(row.id)"
                        :disabled="row.id === currentUserId"
                >屏蔽</Button>
                <Button type="error" size="small" @click="remove(index)" :disabled="row.id === currentUserId">删除</Button>
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

        <Modal v-model="remove_modal" width="360">
            <template #header>
                <p style="color:#f60;text-align:left">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除警告</span>
                </p>
            </template>
            <div style="text-align:left;white-space:normal">
                <p style="word-wrap: break-word;word-break: break-all;">您准备删除{{ remove_item.username }}</p>
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
import {parseTime} from "@/utils"

export default {
    name: "UserTable",
    data() {
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
                    title: '角色',
                    minWidth: 130,
                    slot: 'permissionEnum',
                    resizable: false,
                },
                {
                    title: '性别',
                    minWidth: 70,
                    slot: 'sex',
                    resizable: true,
                },
                {
                    title: '手机',
                    minWidth: 130,
                    key: 'phone',
                    resizable: true,
                },
                {
                    title: '邮箱',
                    minWidth: 230,
                    key: 'mail',
                    resizable: true,
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
                    width: 220,
                    align: 'center',
                    fixed: "right",
                }
            ],
            data: [],
            currentPage: this.$route.query.page || 1,
            totalItems: 5,
            pageSize: this.$route.query.size || 20,

            remove_modal: false,
            modal_loading: false,
            remove_item: {},

            height: 600,

            roleList: [{
                value: 'ADMIN',
                label: '管理员'
            },{
                value: 'USER',
                label: '普通用户'
            },],

            currentUserId: localStorage.getItem("id")
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
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
            })
        },
        remove(index) {
            this.remove_item = this.data[index];
            this.remove_modal = true;
        },
        del() {
            let param = {
                id: this.remove_item.id
            }
            UserRequest.deleteData(param).then(res => {
                this.init();
                this.remove_modal = false
            }).catch(err => {
                this.$Message.error("出错：" + (err||'请稍后重试！'))
            })
        },
        async init() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            await UserRequest.getUserList(param).then(res => {
                if (res.code === 200) {
                    let resData = res.data;
                    this.data = resData.result;
                    this.currentPage = resData.pageNum
                    this.pageSize = resData.pageSize
                    this.totalItems = resData.total
                    this.$router.replace({
                        path: '/admin/users',
                        query: {
                            page: this.currentPage,
                            size: this.pageSize
                        }
                    })
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            })
        },
        pageChange(page) {
            this.currentPage = page
            this.init()
        },
        pageSizeChange(size) {
            this.pageSize = size
            this.init()
        },
        removeBatch() {
            this.$Message.error("功能尚未开发，请等待！")
        },

        async changeRole(event, row) {
            let param = {
                userId: row.id,
                role: event,
            }
            await UserRequest.changeRole(param).then(res => {
                if (res.code === 200) {
                    this.init();
                } else {
                    this.$Message.error("操作失败！")
                }
            }).catch(err => {
                this.$Message.error("操作失败！")
            })
        },
        /**
         * 管理员屏蔽用户
         * @param userId 用户id
         * @returns {Promise<void>} Promise
         */
        async blockUser(userId) {
            let param = {
                userId: userId
            }
            await UserRequest.blockUser(param).then(res => {
                if (res.code === 200) {
                    this.init();
                } else {
                    this.$Message.error("操作失败！")
                }
            }).catch(err => {
                this.$Message.error("操作失败！")
            })
        },
        detail(userId) {

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