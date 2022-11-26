<template>
    <div>
        <Table width="550" height="200" border :columns="columns" :data="data">
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <div style="display: flex; justify-content: left">
            <Button type="primary" ghost>全部拒绝</Button>
            <Button type="primary" ghost>全部通过</Button>
            <Page :total="100" />
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
                    title: 'Name',
                    key: 'name',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: 'Age',
                    key: 'age',
                    width: 100
                },
                {
                    title: 'Province',
                    key: 'province',
                    width: 100
                },
                {
                    title: 'City',
                    key: 'city',
                    width: 100
                },
                {
                    title: 'Address',
                    key: 'address',
                    width: 200
                },
                {
                    title: 'Postcode',
                    key: 'zip',
                    width: 100
                },
                {
                    title: 'Action',
                    slot: 'action',
                    fixed: 'right',
                    width: 160
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
            ]
        }
    }
}
</script>
