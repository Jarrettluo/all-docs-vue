<template>
    <div ref="categoryItem" style="height: 100%; position: relative">
        <div class="title">
            <p>
                <Icon type="logo-buffer"/>
                <span>  {{ titleName }}</span>
            </p>
        </div>
        <div style="background-color: #fdffe8; font-size: 12px; color: #badc62;padding: 0 16px; position: absolute;
top: 52px; left: 0;z-index: 999; width: 100%;">
            <span>右键可操作</span>
        </div>
        <Table
            context-menu
            show-context-menu
            highlight-row
            ref="currentRowTable"
            :columns="columns"
            :data="listData"
            @on-contextmenu="handleContextMenu"
            :show-header="false"
            @on-row-click="changeCategoryValue"
            :height=tableHeight
            @on-current-change="handleCurrentChange"
            :loading="loading"
        >
            <template slot-scope="{ row }" slot="name">
                <div style="width: 100%; ">
                    <div style="float: left; width: calc(100% - 60px)">
                        <strong>{{ row.name }}</strong>
                    </div>
                    <div v-if="row.num !== null" style="width: 60px; float: right; text-align: right; line-height: 100%">
                        <span>{{row.num}}</span>
                    </div>
                </div>

            </template>
            <template #contextMenu>
                <div class="ivu-dropdown-item" @click="handleContextMenuAdd">增加一条记录</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuEdit">重新编辑</div>
                <div class="ivu-dropdown-item" @click="handleContextMenuDelete" style="color: #ed4014">删除</div>
            </template>
        </Table>

        <div style="width: 100%; height: 300px; position: absolute; top: 52px; left: 0;"
             @contextmenu.prevent="handleContextMenuAdd"
             v-if="listData.length === 0 "
        >
        </div>
        <Modal
            v-model="modal1"
            title="编辑提示"
            @on-ok="saveEditor"
            @on-cancel="cancelEditor"
            width="400">
            名称：
            <Input v-model="editValue" placeholder="请输入..." style="width: 300px" :maxlength="64"></Input>
        </Modal>

        <Modal v-model="remove_modal" width="360">
            <template #header>
                <p style="color:#f60;text-align:left">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除警告</span>
                </p>
            </template>
            <div style="text-align:left;white-space:normal">
                <p style="word-wrap: break-word;word-break: break-all;">您准备删除{{remove_item.name}}</p>
                <p>是否确定删除？</p>
            </div>
            <template #footer>
                <Button type="error" size="large" long :loading="remove_loading" @click="del">删除</Button>
            </template>
        </Modal>
    </div>
</template>
<script>
import CategoryRequest from "@/api/category";

export default {
    data() {
        return {
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    slot: 'name',
                    className: 'demo-table-info-cell-name'
                }
            ],
            listData: [],
            contextLine: 0,
            currentItem: null,
            modal1: false,
            isEditState: false,
            editValue: "",
            tableHeight: 260,

            currentCatId: this.$route.query.cateId,
            currentCatIndex: 0,

            remove_modal: false,
            remove_loading: false,
            remove_item: {},

            loading: false
        }
    },
    props: {
        titleName: {type: String, requires: true},
        categoryType: {type: String, requires: true}
    },
    created() {
        this.getAllItems()
    },
    computed: {},
    mounted() {
        this.calcTableHeight();
    },
    methods: {
        calcTableHeight() {
            this.tableHeight = this.$refs.categoryItem.clientHeight - 51;
        },
        handleClearCurrentRow() {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        handleContextMenu(row) {
            const index = this.listData.findIndex(item => item.name === row.name);
            this.contextLine = index + 1;
            this.currentItem = this.listData[index]
            this.editValue = ""
        },

        handleContextMenuAdd() {
            this.handleRender(false);
        },
        handleContextMenuEdit() {
            this.handleRender(true);
        },
        handleContextMenuDelete() {
            // this.removeItem(this.currentItem)
            this.remove_item = this.currentItem;
            this.remove_modal = true;
        },
        del() {
            this.removeItem(this.currentItem)
        },
        getAllItems() {
            this.loading = true
            const params = {
                type: this.categoryType
            };
            CategoryRequest.getListData(params).then(response => {
                this.loading = false;
                if (response.code !== 200) {
                    return;
                }
                this.listData = response.data
                this.listLoading = false
                if (response.data.length > 0) {
                    if (this.currentCatId == null) {
                        let firstCate = this.listData[this.currentCatIndex]
                        this.currentCatId = firstCate.id
                        this.changeCategoryValue(firstCate)
                    } else {
                        this.$nextTick(() => {
                            this.$emit("categoryChange", this.currentCatId)
                        })
                    }
                    this.setCurrentItem()
                }

            })
        },
        /**
         * 分类的信息发生了变化
         * @param data -> 改变的数据
         */
        changeCategoryValue(data) {
            if (JSON.stringify(data) !== '{}' && data.id !== undefined) {
                this.$emit("categoryChange", data['id'])
                this.currentCatId = data.id
                this.setCurrentItem()
            }
        },
        handleRender(isEdit) {
            this.modal1 = true
            this.isEditState = !!isEdit;
            if (isEdit) {
                this.editValue = this.currentItem.name;
            }
        },
        saveEditor() {
            if (this.listData.length === 0) {
                this.currentItem = {};
            }
            this.currentItem.name = this.editValue
            if (this.isEditState) {
                this.updateItem(this.currentItem)
            } else {
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
                if (response.code !== 200) {
                    this.$Message.error('添加失败，请检查后重试！');
                }
            }).catch(err => {
                this.$Message.error('添加失败，请检查后重试！错误信息' + err);
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
                if (response.code !== 200) {
                    this.$Message.error('添加失败，请检查后重试！');
                }
            }).catch(err => {
                this.$Message.error('添加失败，请检查后重试！错误信息' + err);
            })
        },
        removeItem(category) {
            const params = {
                "id": category.id,
                "type": this.categoryType
            };
            CategoryRequest.deleteData(params).then(response => {
                this.getAllItems();
                if (response.code === 200 ) {
                    this.remove_modal = false
                }
            })
        },

        handleCurrentChange(currentRow, oldCurrentRow) {
        },
        // 设置高亮
        setCurrentItem() {
            for (let i = 0; i < this.listData.length; i++) {
                if (this.listData[i].id === this.currentCatId) {
                    this.currentCatIndex = i;
                }
            }
            let index = this.currentCatIndex | 0
            this.$nextTick(() => {
                this.$refs.currentRowTable.highlightCurrentRow(index)
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
