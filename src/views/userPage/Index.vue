<template>
    <Layout>
        <Header>
            <Nav></Nav>
        </Header>
        <Content style="margin: auto;padding: 30px 0;background: #F7F7F7;">
            <div class="filter-page" style="width: 1200px; height: 900px;background-color: #FFFFFF;">
                <!--                <DocPage></DocPage>-->
                <Layout>
                    <Sider hide-trigger :style="{'max-width':'250px','width':'250px', 'height':'900px', 'background':'none'}">
                        <div style="width: 240px;height: 900px; background-color: #FFFFFF; box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);border-radius: 8px;">
                            fsdljsdljgl
                        </div>
                    </Sider>
                    <Content style="margin-left: 70px;">
                        <div style="width: 100%;
                         height: 900px; background-color: #FFFFFF;
                         z-index: 2;
                         box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);border-radius: 8px;">
                        slfjsljfsljgossdgosjfojojo
                            <router-view></router-view>
                        </div>

                    </Content>
                </Layout>
            </div>
        </Content>
    </Layout>
</template>

<script>

import Nav from "@/components/Nav";
import DocPage from "@/views/filterDoc/DocPage"

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