<template>
    <div class="stats-card">
        <div class="number" :style="{ color: color }">
            <h1>{{ number }}</h1>
        </div>
        <h3>{{ title }}</h3>
    </div>
</template>
<script>

export default {
    name: "StatsCard",
    data() {
        return {}
    },
    props: {
        number: {
            type: Number,
            require: true,
            default: 0,
        },
        title: {
            type: String,
            require: true,
            default: "--"
        },
        color: {
            type: String,
            default: "#f4d057"
        }
    }
}
</script>

<style scoped>
.stats-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    min-width: 140px;
    text-align: center;
}

.stats-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.number {
    height: 60px;
    line-height: 60px;
    font-size: 32px;
    font-weight: 700;
}

h3 {
    margin-top: 8px;
    font-size: 14px;
    color: #606266;
    font-weight: 500;
}
</style>