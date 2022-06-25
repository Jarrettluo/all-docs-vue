<template>
    <div>
        <div class="title">
            <p>
                <Icon type="logo-buffer" />
                <span>  {{titleName}}</span>
            </p>
        </div>
        <Table
            context-menu
            show-context-menu
            highlight-row ref="currentRowTable"
            :columns="columns"
            :data="listData"
            @on-contextmenu="handleContextMenu"
            :show-header="false"
            @on-row-click="changeCategoryValue"
        >
            <template #contextMenu>
<!--                <DropdownItem @click="handleContextMenuEdit">增加</DropdownItem>-->
                <div class="ivu-dropdown-item" @click="handleContextMenuAdd">增加一条记录</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuEdit">重新编辑</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuDelete" style="color: #ed4014">删除</div>
<!--                <DropdownItem @click="handleContextMenuEdit">编辑</DropdownItem>-->
<!--                <DropdownItem @click="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>-->
            </template>
        </Table>

        <Modal
            v-model="modal1"
            title="普通的Modal对话框标题"
            @on-ok="ok"
            @on-cancel="cancel">
            <Input v-model="editValue" placeholder="请输入..." style="width: 300px"></Input>
        </Modal>
<!--        <Button @click="handleClearCurrentRow" style="margin-top:16px">Clear</Button>-->
    </div>
</template>
<script>
import CategoryRequest from "@/api/category";
import {Input} from "view-design";

export default {
    data () {
        return {
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    className: 'demo-table-info-cell-name'
                }
            ],
            listData: [
                {
                    name: 'John Brown',
                },
                {
                    name: 'Jim Green',
                },
                {
                    name: 'Joe Black',
                },
                {
                    name: 'Jon Snow',
                }
            ],
            contextLine: 0,
            currentItem: null,
            modal1: false
        }
    },
    props: {
        titleName: { type: String, requires: true },
        categoryType: { type: String, requires: true}
    },
    created() {
        this.getAllItems()
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        handleContextMenu (row) {
            const index = this.listData.findIndex(item => item.name === row.name);
            this.contextLine = index + 1;
            console.log(index)
            this.currentItem = this.listData[index]
            console.log(this.currentItem)
            console.log("*******")
        },

        handleContextMenuAdd () {
            console.log("fdsfdsfds")
            this.handleRender(false)
            // this.$Message.info('Click edit of line' + this.contextLine);
        },
        handleContextMenuEdit () {
            // console.log("fdsfdsfds")
            // this.handleRender(true)
            this.$Message.info('Click edit of line' + this.contextLine);
            this.modal1 = true
        },
        handleContextMenuDelete () {
            // this.$Message.info('Click delete of line' + this.contextLine);
        },
        getAllItems() {
            const params = {
                type: this.categoryType
            };
            CategoryRequest.getListData(params).then(response => {
                this.listData = response.data
                this.listLoading = false
                // console.log(list)
                console.log(this.listData)
                this.changeCategoryValue(this.listData[0])
            })
        },
        /**
         * 分类的信息发生了变化
         * @param categoryValue
         */
        changeCategoryValue(data) {
            console.log(data)
            if( JSON.stringify(data) !== '{}' && data.id !== undefined) {
                console.log(data['id'])
                this.$emit("categoryChange", data['id'])
            }
        },
        handleRender(isEdit) {
            console.log(this.currentItem)
            console.log("88888888888")
            this.$Modal.confirm({
                render: (h) => {
                    return h( Input, {
                        size: "large",
                        modelValue: "看空间",
                        autofocus: true,
                        placeholder: 'Please enter your name...',
                        'onInput': (event) => {
                            // this.value = event.target.value;
                            // this.currentItem.name = event.target.value;
                            // isEdit==true ? this.updateItem(this.currentItem) : this.addItem(this.currentItem)
                            // console.log("dsjfldsjfdsl")
                            this.updateItem(this.currentItem)
                        }
                    })
                }
            })
            // this.$Modal.confirm({
            //     title: '确认对话框标题',
            //     content: this.currentItem.name,
            //     onOk: () => {
            //         this.$Message.info('点击了确定');
            //     },
            //     onCancel: () => {
            //         this.$Message.info('点击了取消');
            //     }
            // });
        },
        addItem(category) {
            const params = {
                "id": category.id,
                "name": category.name,
                "type": this.categoryType
            };
            CategoryRequest.postData(params).then(response => {
                console.log(response)
                this.getAllItems();
            })
        },
        updateItem(category) {
            const params = {
                "id": category.id,
                "name": category.name,
                "type": this.categoryType
            };
            CategoryRequest.putData(params).then(response => {
                console.log(response)
                this.getAllItems();
            })
        },
        removeItem(category) {
            const params = {
                "id": category.id,
                "type": this.categoryType
            };
            CategoryRequest.deleteData(params).then(response => {
                console.log(response);
                this.getAllItems();
            })
        }


    }
}
</script>

<style scoped>
.title {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    background-color: white;
}

.title p {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #17233d;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.i {
    line-height: 22px;
    width: 22px;
}
</style>
