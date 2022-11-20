<template>
    <div class="main-container">
        <category-filter></category-filter>
        <tag-filter></tag-filter>
        <div class="tab">
            <Tabs value="name1">
                <TabPane label="最近上传" name="name1">
                    <filter-list-page></filter-list-page>
                </TabPane>
                <TabPane label="人气排名" name="name2">
                    <filter-list-page></filter-list-page>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import SearchGroup from '@/home/SearchGroup'
import TagFilter from '@/views/filterDoc/TagFilter'
import CategoryFilter from '@/views/filterDoc/CategoryFilter'
import FilterListPage from '@/views/filterDoc/FilterListPage'

export default {
    name: "DocPage",
    data() {
        return {
        }
    },
    components: {
        SearchGroup,
        TagFilter,
        CategoryFilter,
        FilterListPage
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
.main-container {
    padding: 30px;
    background-color: #FFFFFF;

    .tab {
        /deep/ .ivu-tabs-nav {
            //width: 64px;
            //height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC, serif;
            font-weight: 400;
            line-height: 22px;
        }
    }

}

</style>