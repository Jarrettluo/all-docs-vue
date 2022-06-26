<template>
    <div class="docTable">
        <Table border ref="selection" :columns="filterColumns||columns" :data="data">
            <template #name="{ row }">
                <!--            <strong>{{ row.name }}</strong>-->
                {{row.title}}
            </template>
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
    </div>

</template>

<script>
import DocumentRequest from "@/api/document"
import {parseTime} from "@/utils/index"

export default {

    data () {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    // width: 260,
                    slot: 'name',
                    // key: "title"
                },
                // {
                //     title: '摘要',
                //     key: 'abstract'
                // },
                {
                    title: '大小',
                    width: 120,
                    key: 'size',
                    align: 'center'
                },
                {
                    title: '分类',
                    width: 240,
                    key: 'categoryVO',
                    align: 'center',
                    // slot: 'category'
                    render: (h, params) => {
                        let temp = ""
                        if(params.row.categoryVO != null ){
                            temp = params.row.categoryVO.name
                            if(temp.length > 10) {
                                temp = temp.substring(0, 10) + "..."
                            }
                        }

                        return h('div', [
                            h('span',  temp)
                        ]);
                    }
                },
                // {
                //     title: '标签',
                //     key: 'tag'
                // },
                {
                    title: '创建人',
                    width: 120,
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    width: 220,
                    key: 'createTime',
                    align: 'center',
                    render: (h, params) => {
                        let temp = ""
                        let time = params.row.createTime
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
    props: {
        type: { type: String, requires: true, default: 'ALL' },
        keyword: { type: String, requires: false},
        cateId: { type: String, requires: true }
    },
    mounted() {
        this.getListData()
    },
    computed: {
        filterColumns() {
            //根据自己的要求去显示和隐藏某一列  我这里想要隐藏操作列
            if (this.type == "CATEGORY" || this.type == "TAG") {
                // if (this.type != "ADD") {
                //     return this.columns.filter(col => col.type !== 'selection')
                // }
                return this.columns.filter(col => col.key !== 'categoryVO' && col.type !== "selection" );
            } else if (this.type == "ALL") {
                return this.columns.filter(col => col.type !== "selection" );
            } else {
                return this.columns
            }
        },
        currentType: function () {
            if (["ALL", 'CATEGORY', 'TAG'].indexOf(this.type) < 0) {
                return 'ALL';
            }
            return this.type;
        },
        // allSelected: function() {
        //     console.log(this.$refs.selection)
        //     return this.$refs.selection;
        // }
    },
    methods: {
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
            })
        },
        remove (index) {
            this.data.splice(index, 1);
        },
        getListData(categoryId, filterWord) {
            const params = {
                "categoryId": categoryId,
                "filterWord": filterWord,
                "page": 0,
                "rows": 10,
                "tagId": categoryId,
                "type": this.currentType
            }
            DocumentRequest.getListData(params).then(response => {
                this.data = response.data
                this.listLoading = false
                // console.log(list)
                if(this.data == null) {
                    this.data = []
                }
            })
        },
        getSelect(){
            // 通过getSelection方法获取table所有选中行数据
            let selectedList = this.$refs.selection.getSelection();
            if(selectedList.length == 0){
                this.$Message.info('当前选中了' + selectedList.length + '行');
                return;
            }
            let selectedNames = '';
            for(var i = 0; i < selectedList.length; i++){
                selectedNames += ',' + selectedList[i].title;
            }
            this.$Message.info('当前选中了[' + selectedNames.substring(1) + ']行');
            return selectedList;
        }
    }
}
</script>

<style scoped>
.content {
    width: calc(100% - 16px);
    height: calc( 100% - 16px) ;
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}
</style>