<template>
    <div class="content">
        <Tabs value="name1">
            <TabPane label="待审核" name="name1">
                <AdminReview></AdminReview>
            </TabPane>
            <TabPane label="审核完成" name="name2s">
                <ReviewInfo></ReviewInfo>
            </TabPane>
            <TabPane label="文档日志" name="name24">
                <DocLog></DocLog>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import AdminReview from '@/views/admin/AdminReview'
import ReviewInfo from '@/views/admin/ReviewInfo'
import DocLog from '@/views/admin/DocLog'
export default {
    name: "DocReview",
    components: {
        AdminReview,
        ReviewInfo,
        DocLog
    }
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