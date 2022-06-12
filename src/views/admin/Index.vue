<template>
    <Layout>
        <Header>Header</Header>
        <Layout>
            <Sider hide-trigger>
                <SideBar></SideBar>
            </Sider>
            <Content>
                <router-view></router-view>
            </Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
</template>

<script>
import SideBar from "@/views/admin/SideBar";
export default {
    name: "Index",
    components: {SideBar},
    component(id) {
        SideBar
    }
}
</script>

.sid
<style scoped>


</style>