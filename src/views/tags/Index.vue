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
                            <Button type="text" @click="modal = true">添加文档</Button>
                        </div>
                            <doc-table ref="docTable" type="TAG" cateId=""></doc-table>
                        <Page :total="100" />
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

export default {
    data () {
        return {
            split: 0.2,
            modal: false,
        }
    },
    components: {
        DocTable,
        CategoryItems
    },
    methods: {
        handleChange(cateId) {
            console.log(cateId)
            this.$refs.docTable.getListData(cateId);
        },
        saveEditor() {
            let a = this.$refs.addDocTable.getSelect()
            console.log("00dsfsdf" + a)
        },
        cancelEditor() {
            this.modal= false
        }
    }
}
</script>
<style scoped>
.demo-split{
    height: 100%;
    border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}

.add-doc {
    padding: 2px 8px;
    text-align: right;
}

/deep/ .demo-split-pane{
    padding: 0;
    text-align: left;
    height: 100%;
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
