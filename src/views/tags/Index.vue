<template>
    <div class="demo-split">
        <Split v-model="split">
            <template #left>
                <div class="demo-split-pane">
                    <category-group/>
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    <div class="add-doc">
                        <Button type="text">添加文档</Button>
                    </div>
                    <doc-table></doc-table>
                </div>
            </template>
        </Split>
    </div>
</template>
<script>
import DocTable from "@/views/category/DocTable";


import CategoryGroup from "@/views/category/CategoryGroup";


export default {
    data () {
        return {
            split: 0.3
        }
    },
    components: {
        DocTable,
        CategoryGroup
    }
}
</script>
<style>
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
}

</style>
