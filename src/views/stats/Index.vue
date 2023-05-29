<template>
    <div>
        <div class="stats-panel">
            <stats-card v-for="item in titles" :number="data[item.key]" :title="item.title"></stats-card>
        </div>
        <div class="chart-stats">
            <div class="chart-box" id="container">

            </div>
        </div>
    </div>
</template>

<script>
import StatsCard from "@/views/stats/StatsCard";
import StatsRequest from "@/api/stats";

import { Column } from '@antv/g2plot';

export default {
    name: "Index.vue",
    data() {
        return {
            data: {},
            titles: [{
                key: "docNum",
                title: '文档总数'
            }, {
                key: 'commentNum',
                title: '评论总数',
            }, {
                key: "tagNum",
                title: '标签总数'
            }, {
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
    mounted() {
        this.render()
    },
    methods: {
        getTrendData() {
            StatsRequest.postStatsData().then(response => {
                this.data = response.data
            })
        },
        async render() {
            let data = []
            await StatsRequest.getMonthStat().then(response => {
                if (response.code === 200 ) {
                    let result = response.data
                    for(let key in result) {
                        let item = {
                            type: key,
                            count: result[key]
                        }
                        data.push(item)
                    }
                    this.plot(data)
                }
            })
        },
        plot(data) {
            const columnPlot = new Column('container', {
                data,
                xField: 'type',
                yField: 'count',
                color: '#f4d057',
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'bottom', 'middle',
                    // 配置样式
                    style: {
                        fill: '#FFFFFF',
                        opacity: 0.6,
                    },
                },
                xAxis: {
                    label: {
                        autoHide: true,
                        autoRotate: false,
                    },
                },
                meta: {
                    type: {
                        alias: '日期',
                    },
                    count: {
                        alias: '上传数量',
                    },
                },
            });

            columnPlot.render();
        }
    }
}
</script>

<style scoped lang="scss">
.stats-panel {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.chart-stats {
    //background-color: red;
    height: 500px;
    width: 100%;
    padding: 10px 15px;

    .chart-box {
        border-radius: 4px;
        border: 1px solid #e8eaec;
        background-color: #fff;
        display: block;
        transition: all 0.2s ease-in-out;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
    }
}
</style>