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
                        <div style="width: 240px;height: 900px;
                        background-color: #FFFFFF;
                        box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);border-radius: 8px;
                        padding: 60px 30px 0px 30px;
                        ">
                            <div style="width: 100%; height: 35%; text-align: center">
                                <div class="user-avatar" style=" border-radius: 120px; width: 120px; height: 120px;
margin: auto;">
                                    <img :src="0 | userAvatar" alt="用户头像"/>
                                </div>
                                <div style="height: 22px; width: 100%; white-space: nowrap;color: #000;font-size: 16px; font-weight: 600;
line-height: 22px; margin-top: 18px;">
                                    <span>{{ username | userNameTooLong }}</span>
                                </div>
                                <div
                                    style="line-height: 22px; color: #aaa; font-size: 12px; font-weight: 400; line-height: 22px;">
                                    <span>{{ type | userType }}</span>
                                </div>
                                <div style="padding: 30px 0px;">
                                    <div class="upload-button" style="width: 180px; height: 45px; border: 2px solid #000;
                                    background: #FFF7D6;
box-shadow: 0px 0px 10px 0px rgba(129,100,0,0.3);
border-radius: 8px;
display: flex;
justify-content: center;
"
                                         @click="selected(uploadRoute)"
                                    >
                                        <div style="padding: 5px; line-height: 45px;">
                                            <img :src="buttonSrc" width="24px" height="28px"/>
                                        </div>
                                        <span
                                            style="line-height: 45px; color: #000; font-size: 16px; font-weight: 600;"
                                        >
                                            点我上传文档</span>
                                    </div>
                                </div>
                            </div>

                            <div style="width: 100%;
                            height: 50%;
                            border-top: 1px solid #E7E7E7;
                            padding: 15px;">
                                <ul>
                                    <li v-for="item in navData"
                                        @click="selected(item)"
                                        :class="{activeNav: item.route == $route.name}"
                                    >
                                        <Badge dot v-if="item.badge">
                                            {{ item.name }}
                                        </Badge>
                                        <span v-else>
                                            {{ item.name }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Sider>
                    <Content style="margin-left: 70px;padding: 10px;">
                        <div style="width: 100%;
                         height: 900px; background-color: #FFFFFF;
                         z-index: 2;
                         box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);border-radius: 8px; overflow-y: hidden">
                            <router-view v-if="isRouterAlive"></router-view>
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

const {BackendUrl} = require("@/api/request");

export default {
    name: "Index.vue",
    data() {
        return {
            navData: [
                {
                    name: '消息列表',
                    route: 'msg',
                    badge: true
                },
                {
                    name: '我的收藏夹',
                    route: 'userCollection',
                    badge: false
                },
                {
                    name: '我上传的文档',
                    route: 'userUpload',
                    badge: false
                },
                {
                    name: '个人设置',
                    route: 'userInfo',
                    badge: false
                }
            ],
            checkedNav: {
                name: '消息列表',
                route: 'doc'
            },
            isRouterAlive: true,
            buttonSrc: require("@/assets/source/upload.png"),
            userSrc: require("@/assets/source/user_avater.png"),
            uploadRoute: {
                name: "上传",
                route: "docUpload"
            },
            username: localStorage.getItem("username"),
            type: localStorage.getItem("type")
        }
    },
    components: {
        Nav,
        DocPage
    },
    filters: {
        userAvatar(param) {
            let value = localStorage.getItem("avatar")
            if (value === "" || value === 'null' || value === null || value === undefined) {
                return require("@/assets/source/user_avater.png");
            } else {
                return BackendUrl() + "/files/image2/" + value;
            }
        },
        userType(type) {
            if (type === "ADMIN") {
                return "管理员"
            }
            return "普通用户"
        },
        userNameTooLong(name) {
            if (name.length > 16) {
                return name.slice(0, 8) + "..." + name.slice(-8)
            }
            return name;
        }
    },
    methods: {
        selected(item) {
            this.checkedNav = item
            this.$router.replace({name: item.route})
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
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

.upload-button {
    cursor: pointer;

    &:hover {
        background-color: #ffcc4f;
    }
}

.user-avatar {
    box-shadow: 0 0 4px #bbbbbb;

    img {
        width: 100%;
        height: 100%;
        border-radius: 120px;
    }
}

ul {
    list-style: none; /* 去掉ul前面的符号 */
    margin: 0; /* 与外界元素的距离为0 */
    padding: 0; /* 与内部元素的距离为0 */
    width: auto; /* 宽度根据元素内容调整 */

    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC, serif;
    font-weight: 400;
    color: #464646;
    cursor: pointer;
    text-align: left;

    .activeNav {
        padding: 15px;
        //line-height: 1rem;

        list-style-type: none;
        position: relative;

        font-weight: 600;
        color: #000000;

        &:before {
            content: '';
            position: absolute;
            border-color: #F2A500;
            border-style: solid;
            border-width: 0 3px 0 0;
            height: 20px;
            top: 32px;
            left: 0;
            margin-top: -1em;
            width: 0.5em;
        }
    }

    li {
        padding: 15px;
        //line-height: 1rem;
        list-style-type: none;
        position: relative;

        &:hover {
            font-weight: 600;
            color: #000000;
            //text-decoration: none; /* 不显示超链接下划线 */
            //
            //&:before {
            //    content: '';
            //    position: absolute;
            //    border-color: #F2A500;
            //    border-style: solid;
            //    border-width: 0 3px 0 0;
            //    height: 20px;
            //    top: 32px;
            //    left: 0;
            //    margin-top: -1em;
            //    width: 0.5em;
            //}
        }
    }


}
</style>