<template>
    <div>
        文档统计界面
        <div class="stats-panel">
           <stats-card></stats-card>
           <stats-card></stats-card>
           <stats-card></stats-card>
           <stats-card></stats-card>
        </div>
    </div>
</template>

<script>
import StatsCard from "@/views/stats/StatsCard";
export default {
    name: "Index.vue",
    components: {
        StatsCard
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