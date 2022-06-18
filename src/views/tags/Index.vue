<template>
    <div class="demo-split">
        <Split v-model="split" min="180px" max="900px">
            <template #left>
                <div class="demo-split-pane">
                    <category-group titleName="文档标签"/>
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    <div class="content">
                        <div class="add-doc">
                            <Button type="text">添加文档</Button>
                        </div>
                        <doc-table></doc-table>
                    </div>

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
            split: 0.2
        }
    },
    components: {
        DocTable,
        CategoryGroup
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
