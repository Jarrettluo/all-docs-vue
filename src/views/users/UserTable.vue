<template>
    <div>
        <Table border :columns="columns" :data="data">
            <template #name="{ row }">
                <!--            <strong>{{ row.name }}</strong>-->
                {{row.username}}
            </template>
            <template #action="{ row, index }">
                <!--            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>-->
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <div class="page-container">
            <Page
                :model-value="currentPage"
                :total="totalItems"
                :page-size="pageSize"
                @on-change="pageChange"
            />
        </div>
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
                    title: '用户名',
                    // width: 260,
                    slot: 'name'
                },
                {
                    title: '创建时间',
                    width: 220,
                    key: 'createDate',
                    align: 'center',
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
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    name: 'John Brown',
                    size: "120MB",
                    category: "罗佳瑞的电子书",
                    createUser: "罗佳瑞",
                    createTime: "2022年1月12日 12：00：23"
                },
                {
                    name: 'Jim Green',
                    size: "120MB",
                    category: "罗佳瑞的电子书",
                    createUser: "罗佳瑞",
                    createTime: "2022年1月12日 12：00：23"
                },
                {
                    name: 'Joe Black',
                    size: "120MB",
                    category: "罗佳瑞的电子书",
                    createUser: "罗佳瑞",
                    createTime: "2022年1月12日 12：00：23"
                },
                {
                    name: 'Jon Snow这个世界是怎么了啊啊啊啊.mp4',
                    size: "120MB",
                    category: "罗佳瑞的电子书",
                    createUser: "罗佳瑞",
                    createTime: "2022年1月12日 12：00：23"
                }
            ]
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
            })
        },
        remove (index) {
            // this.data.splice(index, 1);
            let param = {
                id: this.data[index].id
            }
            UserRequest.deleteData(param).then(res => {
                // console.log(res)
                this.init();
            }).catch(res => {
                console.log(res)
            })
        },
        init() {

            UserRequest.getUserList().then(res => {
                // console.log(res)
                this.data = res.data
            }).catch(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>

    .page-container {
        /*background-color: yellow;*/
        text-align: right;
        padding: 5px;
    }
</style>