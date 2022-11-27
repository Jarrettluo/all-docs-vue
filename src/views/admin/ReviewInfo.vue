<template>
    <div class="main" ref="tableRef">

        <Table width="100%" :height="height" border :columns="columns" :data="data">
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
                <Button type="error" size="small" @click="remove(index)">清  除</Button>
            </template>


        </Table>

        <div class="bottom-zone">
            <Row>
                <Col span="12" class="bottom-zone-left">
                    <Button type="primary" ghost>全部删除</Button>
                </Col>
                <Col span="12" class="bottom-zone-right">
                    <Page :total="100"/>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>

import {parseTime} from "@/utils"

export default {
    name: "ReviewInfo",
    data () {
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
                    width: 200
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
                    key: 'user',
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
                    // width: 300
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
            data: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000
                }
            ],

            height: 600,
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        this.getDocData()
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })
        },
        getDocData() {
            const result = [{
                id: "id",
                docName: "则为了激励我减肥为了减肥",
                createTime: "2022年12月2日",
                checkState: true,
                checkMsg: "这是检查的状态",
                readState: true
            },{
                id: "id",
                docName: "则为了激励我减肥为了减肥",
                createTime: "2022年12月2日",
                checkState: true,
                checkMsg: "这是检查的状态",
                readState: true
            },{
                id: "id",
                docName: "则为了激励我减肥为了减肥",
                createTime: "2022年12月2日",
                checkState: false,
                checkMsg: "这是检查的状态",
                readState: true
            },{
                id: "id",
                docName: "则为了激励我减肥为了减肥",
                createTime: "2022年12月2日",
                checkState: null,
                checkMsg: "这是检查的状态",
                readState: true
            }];

            this.data = []
            let obj = {}
            for (let resultElement of result) {
                obj['name'] = resultElement['docName']

                obj['user'] = resultElement['createUser'] || '未知'

                obj['time'] = parseTime(new Date(), '{y}年{m}月{d}日 {h}:{i}:{s}'); //resultElement['createTime']

                obj['checkState'] = resultElement['checkState']

                let viewInfo = resultElement['checkMsg']
                obj['viewInfo'] = viewInfo
                obj['readState'] = resultElement['readState']
                this.data.push(obj)
                obj = {}
            }
        }



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