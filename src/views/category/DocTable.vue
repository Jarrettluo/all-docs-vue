<template>
    <div class="docTable">
        <div class="table-container">
            <Table border ref="selection" :columns="filterColumns||columns" :data="data">
                <template #name="{ row }">
                    <!--            <strong>{{ row.name }}</strong>-->
                    {{row.title}}
                </template>
                <template #action="{ row, index }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
        </div>
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
import DocumentRequest from "@/api/document"
import {parseTime} from "@/utils/index"
import fileTool from "@/utils/fileUtil"

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
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', fileTool.bytesToSize(params.row.size))
                        ]);
                    }
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
            ],
            currentPage: 1,
            totalItems: 100,
            pageSize: 10,

        }
    },
    filters: {
        sizeFilter: function(value) {
            return bytesToSize(value)
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
                title: `${this.data[index].title}`,
                content: `size：${this.data[index].size}<br>categoryVO：${this.data[index].categoryVO}<br>tagVOList：${this.data[index].tagVOList}`
            })
        },
        remove (index) {
            // this.data.splice(index, 1);
            this.$emit("removeDoc", this.data[index])
            console.log(this.data[index])
        },
        getListData(categoryId, filterWord) {
            const params = {
                "categoryId": categoryId,
                "filterWord": filterWord,
                "page": this.currentPage,
                "rows": this.pageSize,
                "tagId": categoryId,
                "type": this.currentType
            }
            DocumentRequest.getListData(params).then(response => {
                this.data = response.data
                this.listLoading = false
                console.log(this.data)
                if(this.data == null) {
                    this.data = []
                }
            })
        },
        getSelect(){
            // 通过getSelection方法获取table所有选中行数据
            let selectedList = this.$refs.selection.getSelection();
            // if(selectedList.length == 0){
            //     this.$Message.info('当前选中了' + selectedList.length + '行');
            //     return;
            // }
            // let selectedNames = '';
            // for(var i = 0; i < selectedList.length; i++){
            //     selectedNames += ',' + selectedList[i].title;
            // }
            // this.$Message.info('当前选中了[' + selectedNames.substring(1) + ']行');
            return selectedList;
        },
        pageChange(page) {
            this.currentPage = page
            this.$emit("on-page-change", true)
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

.table-container {
    background-color: red;
}

.page-container {
    /*background-color: yellow;*/
    text-align: right;
    padding: 5px;
}
</style>