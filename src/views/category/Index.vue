<template>
    <div class="demo-split">
        <Split v-model="split">
            <template #left>
                <div class="demo-split-pane">
                    Left Pane
                    fdsjfldsjfld
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    Right Pane
                    fjsdlfjsdlf
                    <doc-table></doc-table>
                </div>
            </template>
        </Split>
    </div>
</template>
<script>
import DocTable from "@/views/category/DocTable";
export default {
    data () {
        return {
            split: 0.3
        }
    },
    components: {
        DocTable
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
</style>
