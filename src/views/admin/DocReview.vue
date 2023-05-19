<template>
    <div class="content">
        <Tabs :value="value" style="height: 100%;" @on-click="switchTab">
            <TabPane label="待审核" name="review" style="height: 100%;">
                <AdminReview ref="adminReview"></AdminReview>
            </TabPane>
            <TabPane label="审核完成" name="info" >
                <ReviewInfo ref='reviewInfo'></ReviewInfo>
            </TabPane>
            <TabPane label="文档日志" name="log">
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
    data() {
        return {
            value: this.$route.query.panel || "review"
        }
    },
    components: {
        AdminReview,
        ReviewInfo,
        DocLog
    },
    mounted() {
        // this.$refs.adminReview.getDocData()
        this.switchTab(this.value)
    },
    methods: {
        switchTab(name) {
            // this.$router.push({
            //     path: '/admin/docReview',
            //     query: {
            //         page: 1,
            //         size: 30,
            //         panel: name
            //     }
            // })
            this.$refs.adminReview.currentPage = 1
            this.$refs.adminReview.pageSize = 30
            switch (name){
                case "review":
                    this.$refs.adminReview.getDocData()
                    break;
                case "info":
                    this.$refs.reviewInfo.getDocData();
                    break;
                case "log":
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