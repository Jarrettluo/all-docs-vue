<template>
    <div class="home-container">
        <div class="home-header">
            <Nav></Nav>
        </div>
        <div class="home-banner">
            <Banner></Banner>
        </div>
        <div class="home-content">

        </div>
        <div class="home-footer">

        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import Banner from "./Banner";
export default {
    name: "Index.vue",
    components: {
        Nav, Banner
    },
}
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 100vh;
    background-color: rgba(245, 245, 245, 100);
    color: rgba(16, 16, 16, 100);
}
</style>