<template>
    <div class="stats-container">
        <!-- 统计卡片区域 -->
        <div class="stats-panel">
            <stats-card v-for="item in titles" :key="item.key" :number="data[item.key]" :title="item.title" :color="item.color"></stats-card>
        </div>

        <!-- 图表区域第一行 -->
        <Row :gutter="16" class="chart-row">
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"/>
                            <path d="M18 9l-5-5-4 4-3-3"/>
                        </svg>
                        月度文档上传趋势
                    </div>
                    <div id="monthlyChart" class="chart-container"></div>
                </div>
            </Col>
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                        </svg>
                        文档类型分布
                    </div>
                    <div id="typeChart" class="chart-container"></div>
                </div>
            </Col>
        </Row>

        <!-- 图表区域第二行 -->
        <Row :gutter="16" class="chart-row">
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                        </svg>
                        分类文档分布
                    </div>
                    <div id="categoryChart" class="chart-container"></div>
                </div>
            </Col>
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        热门文档 TOP 10
                    </div>
                    <div id="hotChart" class="chart-container"></div>
                </div>
            </Col>
        </Row>

        <!-- 图表区域第三行 -->
        <Row :gutter="16" class="chart-row">
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                        搜索热词排行
                    </div>
                    <div id="searchChart" class="chart-container"></div>
                </div>
            </Col>
            <Col :span="12">
                <div class="chart-box">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <path d="M14 2v6h6"/>
                            <path d="M16 13H8"/>
                            <path d="M16 17H8"/>
                            <path d="M10 9H8"/>
                        </svg>
                        最新文档
                    </div>
                    <div class="recent-docs">
                        <div v-for="doc in recentDocs" :key="doc.id" class="recent-doc-item">
                            <Icon :type="getFileIcon(doc.type)" :color="getFileColor(doc.type)" size="20"/>
                            <span class="doc-name">{{ doc.name }}</span>
                            <span class="doc-date">{{ doc.date }}</span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

        <!-- 用户活跃度趋势 -->
        <Row :gutter="16" class="chart-row">
            <Col :span="24">
                <div class="chart-box" style="height: 350px;">
                    <div class="chart-title">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 0-3.87 3.87"/>
                        </svg>
                        用户活跃度趋势
                    </div>
                    <div id="userActivityChart" class="chart-container" style="height: 280px;"></div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import StatsCard from "@/views/stats/StatsCard";
import StatsRequest from "@/api/stats";

import { Column } from '@antv/g2plot';
import { Pie } from '@antv/g2plot';
import { Bar } from '@antv/g2plot';

export default {
    name: "Index.vue",
    data() {
        return {
            data: {},
            recentDocs: [],
            titles: [
                { key: "docNum", title: '文档总数', color: '#f4d057' },
                { key: "userNum", title: '用户总数', color: '#f4d057' },
                { key: "downloadNum", title: '下载次数', color: '#f4d057' },
                { key: "searchNum", title: '搜索次数', color: '#f4d057' },
                { key: "commentNum", title: '评论总数', color: '#f4d057' },
                { key: "tagNum", title: '标签总数', color: '#f4d057' },
                { key: "categoryNum", title: '分类总数', color: '#f4d057' },
                { key: "viewNum", title: '浏览次数', color: '#f4d057' },
            ]
        }
    },
    components: {
        StatsCard
    },
    created() {
        this.getAllStats();
        this.getRecentDocs();
    },
    mounted() {
        this.$nextTick(() => {
            this.render();
        });
    },
    beforeDestroy() {
        if (this.charts) {
            this.charts.forEach(chart => chart && chart.destroy());
        }
    },
    methods: {
        getAllStats() {
            StatsRequest.postStatsData().then(response => {
                if (response.code === 200) {
                    this.data = response.data;
                }
            }).catch(() => {
                this.data = {
                    docNum: 1256,
                    userNum: 342,
                    downloadNum: 8965,
                    searchNum: 23589,
                    commentNum: 1856,
                    tagNum: 89,
                    categoryNum: 12,
                    viewNum: 45892
                };
            });
        },
        getRecentDocs() {
            StatsRequest.getRecentDoc().then(response => {
                if (response.code === 200) {
                    this.recentDocs = response.data;
                }
            }).catch(() => {
                this.recentDocs = [
                    { id: 1, name: '2024年产品路线图.pdf', type: 'pdf', date: '2024-04-28' },
                    { id: 2, name: '系统架构设计文档.docx', type: 'docx', date: '2024-04-27' },
                    { id: 3, name: 'Q1财务数据统计.xlsx', type: 'xlsx', date: '2024-04-26' },
                    { id: 4, name: '用户需求调研报告.pptx', type: 'pptx', date: '2024-04-25' },
                    { id: 5, name: '数据库设计规范.pdf', type: 'pdf', date: '2024-04-24' },
                    { id: 6, name: 'API接口文档.docx', type: 'docx', date: '2024-04-23' },
                ];
            });
        },
        async render() {
            await this.renderMonthlyChart();
            await this.renderTypeChart();
            await this.renderCategoryChart();
            await this.renderHotChart();
            await this.renderSearchChart();
            await this.renderUserActivityChart();
        },
        async renderMonthlyChart() {
            let data = [];
            try {
                await StatsRequest.getMonthStat().then(response => {
                    if (response.code === 200) {
                        data = response.data.map(item => ({
                            type: item.date,
                            count: item.count
                        }));
                    }
                });
            } catch (e) {
                data = [
                    { type: '2024-01', count: 156 },
                    { type: '2024-02', count: 198 },
                    { type: '2024-03', count: 245 },
                    { type: '2024-04', count: 312 },
                    { type: '2024-05', count: 278 },
                    { type: '2024-06', count: 356 },
                    { type: '2024-07', count: 423 },
                    { type: '2024-08', count: 389 },
                    { type: '2024-09', count: 456 },
                    { type: '2024-10', count: 512 },
                    { type: '2024-11', count: 487 },
                    { type: '2024-12', count: 534 },
                ];
            }

            const chart = new Column('monthlyChart', {
                data,
                xField: 'type',
                yField: 'count',
                color: '#f4d057',
                label: {
                    position: 'top',
                    style: { fill: '#FFFFFF', opacity: 0.8 },
                },
                xAxis: { label: { autoHide: true } },
                meta: { type: { alias: '月份' }, count: { alias: '上传数量' } },
            });
            chart.render();
        },
        async renderTypeChart() {
            let data = [];
            try {
                await StatsRequest.getDocTypeDist().then(response => {
                    if (response.code === 200 && response.data && response.data.length > 0) {
                        data = response.data.map(item => ({
                            type: item.type.toUpperCase(),
                            count: item.count
                        }));
                    }
                });
            } catch (e) {}

            if (data.length === 0) {
                data = [
                    { type: 'PDF', count: 439 },
                    { type: 'WORD', count: 352 },
                    { type: 'EXCEL', count: 226 },
                    { type: 'PPT', count: 151 },
                    { type: 'OTHER', count: 88 },
                ];
            }

            const chart = new Pie('typeChart', {
                data,
                angleField: 'count',
                colorField: 'type',
                radius: 0.8,
                label: { type: 'spider', content: '{percentage}' },
                legend: { position: 'right' },
                statistic: {
                    title: { content: '总计', style: { fontSize: 14 } },
                    content: { content: '{total}', style: { fontSize: 20 } },
                },
            });
            chart.render();
        },
        async renderCategoryChart() {
            let data = [];
            try {
                await StatsRequest.getCategoryDist().then(response => {
                    if (response.code === 200 && response.data) {
                        data = response.data.map(item => ({
                            type: item.category,
                            count: item.count
                        }));
                    }
                });
            } catch (e) {}

            if (data.length === 0) {
                data = [
                    { type: '产品文档', count: 286 },
                    { type: '技术文档', count: 342 },
                    { type: '需求文档', count: 198 },
                    { type: '运维文档', count: 156 },
                    { type: '测试文档', count: 124 },
                    { type: '用户手册', count: 150 },
                ];
            }

            const chart = new Pie('categoryChart', {
                data,
                angleField: 'count',
                colorField: 'type',
                radius: 0.8,
                label: { type: 'spider', content: '{name}\n{count}' },
                legend: { position: 'right' },
                color: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'],
            });
            chart.render();
        },
        async renderHotChart() {
            let data = [];
            try {
                await StatsRequest.getHotDocs().then(response => {
                    if (response.code === 200 && response.data) {
                        data = response.data.map(item => ({
                            title: item.title,
                            value: item.viewCount
                        }));
                    }
                });
            } catch (e) {}

            if (data.length === 0) {
                data = [
                    { title: '2024年产品路线图.pdf', value: 2456 },
                    { title: '系统架构设计文档.docx', value: 2134 },
                    { title: 'Q1财务数据统计.xlsx', value: 1987 },
                    { title: '用户需求调研报告.pptx', value: 1876 },
                    { title: '数据库设计规范.pdf', value: 1654 },
                    { title: 'API接口文档.docx', value: 1543 },
                    { title: '产品功能清单.xlsx', value: 1421 },
                    { title: '系统部署手册.pdf', value: 1387 },
                    { title: '测试用例汇总.xlsx', value: 1234 },
                    { title: '新功能介绍.pptx', value: 1156 },
                ];
            }

            const chart = new Bar('hotChart', {
                data,
                xField: 'value',
                yField: 'title',
                color: '#ff6b6b',
                label: { position: 'right', content: '{value}' },
                legend: false,
            });
            chart.render();
        },
        async renderSearchChart() {
            let data = [];
            try {
                await StatsRequest.getSearchHotWords().then(response => {
                    if (response.code === 200 && response.data) {
                        data = response.data.map(item => ({
                            word: item.keyword,
                            count: item.count
                        }));
                    }
                });
            } catch (e) {}

            if (data.length === 0) {
                data = [
                    { word: '架构设计', count: 3421 },
                    { word: '产品路线图', count: 2876 },
                    { word: 'API文档', count: 2543 },
                    { word: '财务报告', count: 2234 },
                    { word: '用户手册', count: 1987 },
                    { word: '测试用例', count: 1765 },
                    { word: '部署手册', count: 1543 },
                    { word: '需求调研', count: 1432 },
                ];
            }

            const chart = new Bar('searchChart', {
                data,
                xField: 'count',
                yField: 'word',
                color: '#9b59b6',
                label: { position: 'right', content: '{count}' },
                legend: false,
            });
            chart.render();
        },
        async renderUserActivityChart() {
            let data = [];
            try {
                await StatsRequest.getUserActivity().then(response => {
                    if (response.code === 200 && response.data) {
                        data = response.data.map(item => ({
                            month: item.month,
                            users: item.activeUsers
                        }));
                    }
                });
            } catch (e) {}

            if (data.length === 0) {
                data = [
                    { month: '2024-01', users: 156 },
                    { month: '2024-02', users: 178 },
                    { month: '2024-03', users: 195 },
                    { month: '2024-04', users: 212 },
                    { month: '2024-05', users: 198 },
                    { month: '2024-06', users: 234 },
                    { month: '2024-07', users: 256 },
                    { month: '2024-08', users: 243 },
                    { month: '2024-09', users: 278 },
                    { month: '2024-10', users: 295 },
                    { month: '2024-11', users: 312 },
                    { month: '2024-12', users: 342 },
                ];
            }

            const chart = new Column('userActivityChart', {
                data,
                xField: 'month',
                yField: 'users',
                color: '#f4d057',
                label: { position: 'top', style: { fill: '#FFFFFF', opacity: 0.8 } },
                xAxis: { label: { autoHide: true } },
                meta: { month: { alias: '月份' }, users: { alias: '活跃用户数' } },
            });
            chart.render();
        },
        getFileIcon(type) {
            const iconMap = {
                'pdf': 'ios-paper',
                'docx': 'ios-document',
                'xlsx': 'ios-grid',
                'pptx': 'ios-film',
                'image': 'ios-image',
                'zip': 'ios-archive',
            };
            return iconMap[type] || 'ios-document';
        },
        getFileColor(type) {
            const colorMap = {
                'pdf': '#f5222d',
                'docx': '#1890ff',
                'xlsx': '#52c41a',
                'pptx': '#fa8c16',
                'image': '#722ed1',
                'zip': '#13c2c2',
            };
            return colorMap[type] || '#8c8c8c';
        }
    }
}
</script>

<style scoped lang="scss">
.stats-container {
    padding: 16px;
    background: #f0f2f5;
    min-height: calc(100vh - 100px);
}

.stats-panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 16px;
}

.chart-row {
    margin-bottom: 16px;
}

.chart-box {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    min-height: 320px;

    .chart-title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 16px;
        padding-left: 8px;
        border-left: 4px solid #f4d057;

        .chart-icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            color: #f4d057;
        }
    }

    .chart-container {
        width: 100%;
        min-height: 260px;
    }
}

.recent-docs {
    max-height: 280px;
    overflow-y: auto;

    .recent-doc-item {
        display: flex;
        align-items: center;
        padding: 10px 8px;
        border-bottom: 1px solid #f0f0f0;
        transition: background 0.2s;

        &:hover {
            background: #f5f7fa;
        }

        .doc-name {
            flex: 1;
            margin-left: 12px;
            font-size: 14px;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .doc-date {
            font-size: 12px;
            color: #909399;
            margin-left: 12px;
        }
    }
}
</style>
