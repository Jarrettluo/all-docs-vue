<template>
    <Layout>
        <Header>
            <Nav></Nav>
        </Header>
        <Content style="margin: auto;padding: 30px 0;background: #F7F7F7;">
            <div class="filter-page" style="width: 1200px; height: 900px;background-color: #FFFFFF;
            box-shadow: 0 0 5px 0 rgba(64,64,64,0.3); border-radius: 8px;">
                <DocPage></DocPage>
            </div>
        </Content>
    </Layout>
</template>

<script>
import Nav from "@/components/Nav";
import DocPage from "./DocPage"

export default {
    name: "Index.vue",
    components: {
        Nav,
        DocPage
    }
}
</script>

<style scoped>
/deep/ .ivu-layout-header {
    background: none;
    padding: 0;
    height: 50px;
    line-height: 50px;
}
</style>