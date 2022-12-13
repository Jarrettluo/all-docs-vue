<template>
    <div class="content">
        <Tabs value="name1" style="height: 100%;" @on-click="switchTab">
            <TabPane label="待审核" name="name1" style="height: 100%;">
                <AdminReview ref="adminReview"></AdminReview>
            </TabPane>
            <TabPane label="审核完成" name="name2s" >
                <ReviewInfo ref='reviewInfo'></ReviewInfo>
            </TabPane>
            <TabPane label="文档日志" name="name24">
                <DocLog ref='docLog'></DocLog>
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
    },
    mounted() {
        this.$refs.adminReview.getDocData()
    },
    methods: {
        switchTab(name) {
            switch (name){
                case "name1":
                    this.$refs.adminReview.getDocData()
                    break;
                case "name2s":
                    this.$refs.reviewInfo.getDocData();
                    break;
                case "name24":
                    this.$refs.docLog.getPageData()
                    break
            }


        }
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

    /deep/ .ivu-tabs-content {
        height: 100%;
    }
}

</style>