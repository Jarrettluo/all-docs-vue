<template>
    <div class="content">
        <Tabs value="name1">
            <TabPane label="待审核" name="name1">
            </TabPane>
            <TabPane label="审核完成" name="name2s">
            </TabPane>
            <TabPane label="文档日志" name="name24">
                一些变更的记录，都存在这里的
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    name: "DocReview"
}
</script>

<style scoped lang="scss">

.content {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}

</style>