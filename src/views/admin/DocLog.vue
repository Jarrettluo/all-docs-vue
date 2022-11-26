<template>
    <div class="main" ref="tableRef">
        <Table width="100%" :height="height" border :columns="columns" :data="data">
            <template #action="{ row, index }">
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>

        <div class="bottom-zone" >
            <Row>
                <Col span="12" class="bottom-zone-left">
                    <Button type="primary" ghost>全部删除</Button>
                </Col>
                <Col span="12" class="bottom-zone-right">
                    <Page :total="100" />
                </Col>
            </Row>
        </div>



    </div>

</template>
<script>
import { resolveComponent } from 'vue'
export default {
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
                    key: 'name',
                    width: 200,
                    fixed: 'left'
                },
                {
                    title: '用户',
                    key: 'age',
                    width: 200
                },
                {
                    title: '动作',
                    key: 'province',
                    width: 180
                },
                {
                    title: '文档名称',
                    key: 'city',
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
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })

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