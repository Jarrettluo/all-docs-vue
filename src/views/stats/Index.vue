<template>
    <div>
        文档统计界面
        <div class="stats-panel">
           <stats-card v-for="item in titles" :number="data[item.key]" :title="item.title"></stats-card>
        </div>
    </div>
</template>

<script>
import StatsCard from "@/views/stats/StatsCard";
import StatsRequest from "@/api/stats";

export default {
    name: "Index.vue",
    data() {
        return {
            data: {},
            titles: [{
                key: "docNum",
                title: '文档总数'
            },{
                key: 'commentNum',
                title: '评论总数',
            },{
                key: "tagNum",
                title: '标签总数'
            },{
                key: 'categoryNum',
                title: '分类总数',
            },
            ]
        }
    },
    components: {
        StatsCard
    },
    created() {
        this.getTrendData()
    },
    methods: {
        getTrendData() {
            StatsRequest.postStatsData().then(response => {
                this.data = response.data
            })
        }
    }
}
</script>

<style scoped>
.stats-panel {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
</style>