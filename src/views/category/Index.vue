<template>
    <div class="demo-split">
        <Split v-model="split">
            <template #left>
                <div class="demo-split-pane">
                    <CategoryGroup></CategoryGroup>
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">

<!--                    <ButtonGroup shape="circle">-->
<!--                        <Button>增加</Button>-->
<!--                        <Button>编辑</Button>-->
<!--                        <Button>删除</Button>-->
<!--                        <Button>添加</Button>-->
<!--                    </ButtonGroup>-->
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
/deep/ .demo-split-pane{
    padding: 0;
    text-align: left;
}

.add-doc {
    padding: 2px 8px;
    text-align: right;
}
</style>
