<template>
    <div class="home-container">
        <div class="home-header">
            <Nav></Nav>
        </div>
        <div class="home-banner">
            <Banner></Banner>
        </div>
        <div class="home-content">
            <Category v-for="item in data" :category="item"></Category>
        </div>
        <div class="home-footer">

        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import Banner from "./Banner";
import Category from "@/views/homePage/Category";
import StatsRequest from "@/api/stats"

export default {
    name: "Index.vue",
    data() {
        return {
            data: []
        }
    },
    components: {
        Nav, Banner, Category
    },
    created() {
        this.getTrendData();
    },
    methods: {
        getTrendData() {
            StatsRequest.getTrendData().then(response => {
                this.data = response.data
            })
        }
    }
}
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 100vh;
    background-color: rgba(245, 245, 245, 100);
    color: rgba(16, 16, 16, 100);
}
.home-content {
    margin: auto;
    width: 872px;
    display: flex;
    padding: 16px 0px;
    justify-content: space-between;
}
</style>