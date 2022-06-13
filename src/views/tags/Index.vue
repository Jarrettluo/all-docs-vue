<template>
    <div class="demo-split">
        <Split v-model="split">
            <template #left>
                <div class="demo-split-pane">
                    This.tag
                </div>
            </template>
            <template #right>
                <div class="demo-split-pane">
                    Right Pane
                    fjsdlfjsdlf
                </div>
            </template>
        </Split>
    </div>
</template>
<script>
export default {
    data () {
        return {
            split: 0.3
        }
    },
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
