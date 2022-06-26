<template>
    <div class="demo-split">
        <Split v-model="split" min="180px" max="900px">
            <template #left>
                <div class="demo-split-pane">
<!--                    <CategoryGroup titleName="文档分类" category-type="CATEGORY" @categoryChange="handleChange"></CategoryGroup>-->
                    <CategoryItems titleName="文档分类" category-type="CATEGORY" @categoryChange="handleChange"></CategoryItems>
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    <div class="content">
                        <div class="add-doc">
                            <Button type="text" @click="modal = true">添加文档</Button>
                        </div>
                        <doc-table ref="docTable" type="CATEGORY" cateId=""></doc-table>
                    </div>
                </div>
            </template>
        </Split>
        <Modal v-model="modal" fullscreen title="Fullscreen Modal"
               @on-ok="saveEditor"
               @on-cancel="cancelEditor"
        >
            <div><doc-table ref="addDocTable" type="ADD" cateId=""></doc-table></div>
        </Modal>
    </div>
</template>
<script>
import DocTable from "@/views/category/DocTable";


import CategoryItems from "@/views/category/CategoryItems";
import CategoryRequest from "@/api/category";

export default {
    data () {
        return {
            split: 0.2,
            modal: false,
            cateId: ""
        }
    },
    components: {
        DocTable,
        CategoryItems
    },
    methods: {
        handleChange(cateId) {
            console.log(cateId)
            this.cateId = cateId;
            this.$refs.docTable.getListData(cateId);
        },
        saveEditor() {
            let docList = this.$refs.addDocTable.getSelect()
            docList.forEach(item => {
                this.addRelate(this.cateId, item.id)
            })
        },
        cancelEditor() {
            this.modal= false
        },
        addRelate(cateId, docId) {
            const params = {
                "id": cateId,
                "docId": docId,
                "type": "CATEGORY"
            }
            if(cateId == "") {
                return;
            }
            CategoryRequest.postRelateData(params).then(
                response => {
                    console.log(response.data)
                    this.handleChange(cateId)
                }
            )
        }

    }
}
</script>
<style scoped>
.demo-split{
    height: 100%;
    border: 1px solid #dcdee2;
}
/deep/ .demo-split-pane{
    padding: 0;
    text-align: left;
    height: 100%;
}

.add-doc {
    padding: 2px 8px;
    text-align: right;
}

.content {
    width: calc(100%);
    height: calc( 100%) ;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}
</style>
