<template>
    <Layout>
        <Header>
            <Nav></Nav>
        </Header>
        <Layout>
            <Sider hide-trigger>
                <SideBar></SideBar>
            </Sider>
            <Content style="height: calc( 100vh - 99px)">
                <router-view></router-view>
            </Content>
        </Layout>
        <Footer>
            <!--            <MyFooter></MyFooter>-->
            <!--            <GlobalFooter></GlobalFooter>-->
        </Footer>
    </Layout>
</template>

<script>
import Nav from "@/components/Nav"
import SideBar from "@/views/admin/SideBar";
import MyFooter from "@/components/MyFooter";

export default {
    name: "Index",
    components: {Nav, SideBar, MyFooter},
}
</script>

.sid
<style scoped>
/deep/ .ivu-layout-header {
    background: none;
    padding: 0;
    height: 50px;
    line-height: 50px;
}

</style>