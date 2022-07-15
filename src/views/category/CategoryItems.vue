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
            highlight-row
        >
            <template #contextMenu>
                <div class="ivu-dropdown-item" @click="handleContextMenuAdd">增加一条记录</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuEdit">重新编辑</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuDelete" style="color: #ed4014">删除</div>
            </template>
        </Table>

        <Modal
            v-model="modal1"
            title="编辑提示"
            @on-ok="saveEditor"
            @on-cancel="cancelEditor"
            width="400">
                名称：
                <Input v-model="editValue" placeholder="请输入..." style="width: 300px"></Input>
        </Modal>
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
            modal1: false,
            isEditState: false,
            editValue: "",
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
            this.currentItem = this.listData[index]
            this.editValue = ""
        },

        handleContextMenuAdd () {
            this.handleRender(false);
        },
        handleContextMenuEdit () {
            this.handleRender(true);
        },
        handleContextMenuDelete () {
            this.removeItem(this.currentItem)
        },
        getAllItems() {
            const params = {
                type: this.categoryType
            };
            CategoryRequest.getListData(params).then(response => {
                this.listData = response.data
                this.listLoading = false
                this.changeCategoryValue(this.listData[0])
            })
        },
        /**
         * 分类的信息发生了变化
         * @param categoryValue
         */
        changeCategoryValue(data) {
            if( JSON.stringify(data) !== '{}' && data.id !== undefined) {
                this.$emit("categoryChange", data['id'])
            }
        },
        handleRender(isEdit) {
            this.modal1 = true
            this.isEditState = isEdit ? true : false;
            if(isEdit) {
                this.editValue = this.currentItem.name;
            }
        },
        saveEditor() {
            this.currentItem.name = this.editValue
            if(this.isEditState) {
                this.updateItem(this.currentItem)
            }else {
                this.currentItem.id = ""
                this.addItem(this.currentItem)
            }
        },
        cancelEditor() {
            this.modal1 = false;
        },
        addItem(category) {
            const params = {
                "id": category.id,
                "name": category.name,
                "type": this.categoryType
            };
            CategoryRequest.postData(params).then(response => {
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

/deep/ .ivu-table td {
    cursor: pointer !important;
}
</style>
