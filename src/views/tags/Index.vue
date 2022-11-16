<template>
    <div class="demo-split">
        <Split v-model="split" min="180px" max="900px">
            <template #left>
                <div class="demo-split-pane">
                    <CategoryItems titleName="文档标签" category-type="TAG" @categoryChange="handleChange"/>
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    <div class="content">
                        <div class="add-doc">
                            <Button type="text" @click="addDoc">添加文档</Button>
                        </div>
                        <doc-table ref="docTable" type="TAG" cateId=""
                                   @removeDoc="removeDoc"
                                   @on-page-change="queryTable"></doc-table>
                    </div>

                </div>
            </template>
        </Split>
        <Modal v-model="modal" fullscreen title="Fullscreen Modal"
               @on-ok="saveEditor"
               @on-cancel="cancelEditor"
        >
            <div>
                <check-table ref="addDocTable" type="TAG" :cateId="cateId"></check-table>
            </div>
        </Modal>
    </div>
</template>
<script>
import DocTable from "@/views/category/DocTable";
import CheckTable from '@/views/category/CheckTable'

import CategoryItems from "@/views/category/CategoryItems";

import CategoryRequest from "@/api/category";

export default {
    data() {
        return {
            split: 0.2,
            modal: false,
            cateId: ""
        }
    },
    components: {
        DocTable,
        CategoryItems,
        CheckTable
    },
    methods: {
        handleChange(cateId) {
            console.log(cateId)
            this.cateId = cateId
            this.$refs.docTable.getListData(cateId);
        },
        queryTable() {
            this.$refs.docTable.getListData(this.cateId);
        },
        saveEditor() {
            let docList = this.$refs.addDocTable.getSelect()

            docList.forEach(item => {
                this.addRelate(this.cateId, item.id)
            })
        },
        cancelEditor() {
            this.modal = false
        },

        addRelate(cateId, docId) {
            const params = {
                "id": cateId,
                "docId": docId,
                "type": "TAG"
            }
            CategoryRequest.postRelateData(params).then(
                response => {
                    if (response.code === 200) {
                        console.log(response.data)
                        this.handleChange(cateId)
                    } else {
                        this.$Message.info("错误：" + response.message)
                    }

                }
            )
        },

        /**
         * 发起删除该篇文档的请求
         * @param docItem
         */
        removeDoc(docItem) {
            console.log("=====")
            console.log(docItem)
            if (docItem === null || docItem.id == null) {
                return
            }
            const params = {
                id: this.cateId,
                docId: docItem.id,
                type: "TAG"
            };
            CategoryRequest.deleteRelateData(params).then(response => {
                // 删除以后再发起请求
                this.$refs.docTable.getListData(this.cateId);
            })
        },

        // 触发面板
        addDoc() {
            this.modal = true
            this.$refs.addDocTable.getListData(this.cateId, "");
        }

    }
}
</script>
<style scoped>
.demo-split {
    height: 100%;
    border: 1px solid #dcdee2;
}

.demo-split-pane {
    padding: 10px;
}

.add-doc {
    padding: 2px 8px;
    text-align: right;
}

/deep/ .demo-split-pane {
    padding: 0;
    text-align: left;
    height: 100%;
}

.content {
    width: calc(100%);
    height: calc(100%);
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}

</style>
