<template>
    <Layout>
        <Header>
            <Nav></Nav>
        </Header>
        <Content style="margin: auto;padding: 20px 0 30px 0;background: #F7F7F7;">
            <div class="filter-page" style="width: 1200px; height: 900px;background-color: #FFFFFF;">
                <!--                <DocPage></DocPage>-->
                <Layout>
                    <Sider hide-trigger :style="{'max-width':'250px','width':'250px', 'height':'900px', 'background':'none',
                    'padding':'10px'}">
                        <div style="width: 240px;height: 900px; background-color: #FFFFFF; box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);border-radius: 8px;">

                            <div style="width: 100%; height: 40%;">

                            </div>

                            <div style="width: 100%; height: 50%; background-color: #abc1ee; border-top: 1px solid #E7E7E7;">
                                <ul>
                                    <li>
                                        fdlsfjldjf
                                    </li>
                                    <li>
                                        fjdsljfldjf
                                    </li>
                                    <li>
                                        fdsjlsfjdlj
                                    </li>
                                    <li>
                                        dlfjldsjfld
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Sider>
                    <Content style="margin-left: 70px;padding: 10px;">
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

<style scoped lang="scss">

    ul {
        list-style:none; /* 去掉ul前面的符号 */
        margin: 0; /* 与外界元素的距离为0 */
        padding: 0; /* 与内部元素的距离为0 */
        width: auto; /* 宽度根据元素内容调整 */
        li {

            &:hover {
                background-color: #bfcbd6; /* 背景色 */
                color: #465c71; /* 文字颜色 */
                text-decoration: none; /* 不显示超链接下划线 */

            }

            &:active {
                background-color: #465c71; /* 背景色 */
                color: #cfdbe6; /* 文字颜色 */
                text-decoration: none; /* 不显示超链接下划线 */

            }

            &:visited {
                background-color: #465c71; /* 背景色 */
                border: 1px #4e667d solid; /* 边框 */
                color: #dde4ec; /* 文字颜色 */
                display: block; /* 此元素将显示为块级元素，此元素前后会带有换行符 */
                line-height: 1.35em; /* 行高 */
                padding: 4px 20px; /* 内部填充的距离 */
                text-decoration: none; /* 不显示超链接下划线 */
                white-space: nowrap; /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
            }
        }
    }
</style>