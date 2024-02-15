<template>
    <div class="homepage">
        <div class="top-group" style="text-align: center; ">
            <img :src="imgSrc" width="100%" height="100%" alt=""/>
            <SearchGroup></SearchGroup>
            <div class="user-zone" v-if="!ad && !tokenExpired">
                <span>{{ type | userType }}</span>
                <Dropdown>
                    <a class="user-tag" href="javascript:void(0)" style="text-align: center; width: 36px;" @mouseenter="checkLogin">
                        <img :src="0 | userAvatar" alt="">
                    </a>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem><span style="color: #8d7b25;">{{ username | userNameTooLong }}</span></DropdownItem>
                            <DropdownItem @click.native="gotoAdminPage" divided>系统管理</DropdownItem>
                            <DropdownItem @click.native="$router.push('/userPage')">个人主页</DropdownItem>
                            <DropdownItem @click.native="logout()" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
            <div class="user-zone" v-else>
                <a class="user-tag" href="javascript:void(0)" style="text-align: center; width: 36px;"
                   @click="$router.push('/login')">
                    <img :src="defaultAvatar" alt="">
                </a>
            </div>
            <div class="button-group" v-if="!ad && !tokenExpired">
                <Row>
                    <Col span="8" style="padding: 0 8px 0 0">
                        <user-card title="我的收藏夹" subtitle="全是我辛苦收藏的宝贝" :src="img1" @click="toMyCollection"></user-card>
                    </Col>
                    <Col span="8" style="padding: 0 4px 0 4px">
                        <user-card title="我上传的文档" subtitle="全都是精华全都是经典" :src="img2" @click="toMyUpload"></user-card>
                    </Col>
                    <Col span="8" style="padding: 0 0px 0 8px">
                        <user-card title="点我上传文档" subtitle="使劲戳就对了" :src="img3" @click="toUploadPage"></user-card>
                    </Col>
                </Row>

            </div>

        </div>
        <div style="height: 30px;width: 100%;" v-if="!ad && !tokenExpired">

        </div>
        <div class="bottom-group">
            <div class="left-panel">
                <div class="top-container">
                    <div class="panel-title left-pane-title" style="cursor: pointer" @click="routeTo">
                        <span>全部文档</span>
                    </div>
                    <div
                        :class=" item.clicked ? 'tag-info' : 'tag-info-unchecked' "
                        v-for="item in data"
                        @click="changeToCurrentTag(item.name, item.tagId)"
                    >
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="doc-thumb-1">
                    <DocThumb class="doc-thumb"
                              :flag="false"
                              :title="doc.name"
                              :docId="doc.thumbId"
                              v-for="doc in currentData.slice(0, 6)" :key="doc.id"
                              @click.native="getDocView(doc.id)"
                    ></DocThumb>
                </div>
                <div class="doc-thumb-1 second-group">
                    <DocThumb class="doc-thumb"
                              :flag="false"
                              :title="doc.name"
                              :docId="doc.thumbId"
                              v-for="doc in currentData.slice(6, 12)" :key="doc.id"
                              @click.native="getDocView(doc.id)"
                    ></DocThumb>
                </div>
            </div>
            <div class="right-panel">
                <div class="top-container">
                    <div class="panel-title"><span>热门文档排行 🔥</span></div>
                </div>
                <div class="hot-trend">
                    <HotTrend></HotTrend>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DocTag from '@/home/DocTag';
import DocThumb from '@/home/DocThumb'
import HotTrend from '@/home/HotTrend'
import SearchGroup from '@/home/SearchGroup'
import UserCard from '@/home/UserCard'

const {BackendUrl} = require("@/api/request");
import StatsRequest from "@/api/stats";
import UserRequest from '@/api/user'

export default {
    name: "index.vue",
    components: {
        HotTrend,
        DocTag,
        DocThumb,
        SearchGroup,
        UserCard
    },
    data() {
        return {
            imgSrc: require("../assets/source/banner.png"),
            defaultAvatar: require("@/assets/source/user_avater.png"),
            data: {},
            currentData: [],
            tokenExpired: false,
            img1: require('@/assets/source/heart.png'),
            img2: require('@/assets/source/folder.png'),
            img3: require('@/assets/source/upload.png'),

            username: localStorage.getItem('username'),
            type: localStorage.getItem("type")
        }
    },
    computed: {
        ad() {
            let item = localStorage.getItem("token");
            return (item === null || item === undefined || item === "");
        }
    },
    created() {
        this.init()
    },
    filters: {
        userAvatar() {
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
            return ""
        },
        userNameTooLong(name) {
            if (name.length > 10) {
                return name.slice(0, 4) + "..." + name.slice(-4)
            }
            return name;
        }
    },
    methods: {
        routeTo() {
            this.$router.push('/doc')
        },
        init() {
            StatsRequest.getRecentDoc().then(response => {
                if (response.code === 200) {
                    this.data = response.data;
                    this.changeToCurrentTag(this.data[0].name, this.data[0].tagId)
                }
            }).catch(() => {
                this.$Message.error("查询最近文档出错！")
            })
        },
        /**
         * 切换到某一个标签上
         * @param name
         * @param tagId
         */
        changeToCurrentTag(name, tagId) {
            this.currentData = []
            this.data.forEach(item => {
                if (item.name === name && item.tagId === tagId) {
                    item.clicked = true
                    this.currentData = item.docList
                } else {
                    item.clicked = false
                }
            })
        },
        getDocView(id) {
            this.$router.push({
                path: '/preview',
                query: {
                    docId: id
                }
            })

        },
        logout() {
            localStorage.clear()
            this.$router.push({
                name: 'Login'
            })
        },

        gotoAdminPage() {
            if (localStorage.getItem('type')==='ADMIN') {
                this.$router.push('/admin/allDocuments')
            } else {
                this.$Message.warning("请使用管理员账号登录！")
            }
        },
        async checkLogin() {
            let item = localStorage.getItem("token");
            if (item == null || item === "") {
                return;
            }
            await UserRequest.checkUserLogin().then(res => {
                if (res.code !== 200) {
                    this.$Message.error("token 已过期")
                    localStorage.clear();
                    this.tokenExpired = true
                }
            }).catch(err => {
                this.$Message.error("token 已过期")
                localStorage.clear();
                this.tokenExpired = true
            })
        },
        toMyCollection() {
            this.$router.push("/userPage/userCollection")
        },
        toMyUpload() {
            this.$router.push("/userPage/userUpload")
        },
        toUploadPage() {
            this.$router.push("/userPage/docUpload")
        }
    }
}
</script>

<style lang="scss" scoped>

.homepage {
    width: 100%;
    padding-bottom: 20px;

    .top-group {
        height: 340px;
        width: 100%;
        padding-bottom: 40px;
        z-index: -1;

        .user-zone {
            position: absolute;
            right: 40px;
            top: 20px;
            display: flex;
            justify-content: flex-start;
            padding: 5px 5px 0 5px;
            color: #2c3e50;

            span {
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC, serif;
                font-weight: 400;
                padding-right: 10px;
            }

            .user-tag {

                border-radius: 36px;
                box-sizing: content-box;

                img {
                    border-radius: 38px;
                    height: 36px;
                    width: 36px;
                    box-shadow: 0 0 4px #bbbbbb;
                }
            }

            &:hover {
                cursor: pointer;
                background-color: rgba(#fff, 0.2);
                border-radius: 8px;
            }
        }

        .button-group {
            height: 120px;
            position: absolute;
            top: 225px;
            width: 1200px;
            left: calc(50% - 600px);
        }
    }

    .bottom-group {
        margin: auto;
        width: 1200px;
        height: 619px;
        box-shadow: 0 0 5px 0 rgba(64, 64, 64, 0.3);
        border-radius: 8px;
        background-color: #fff;

        .left-panel {
            height: 100%;
            width: 900px;
            float: left;
            padding: 0 0 0 0;
        }

        .right-panel {
            height: 100%;
            width: 300px;
            float: left;
            padding: 0 24px 0 40px;
        }

        .top-container {
            height: 80px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .panel-title {
                span {
                    font-size: 20px;
                    font-family: PingFangSC-Semibold, PingFang SC, serif;
                    font-weight: 600;
                    color: #464646;
                    line-height: 28px;
                }
            }

            .left-pane-title {
                margin-left: 24px;
            }

            .tag-info {
                height: 30px;
                background: #FACF36;
                border-radius: 15px;
                border: 1px solid #000000;
                padding: 0 10px;
                margin-left: 20px;
                line-height: 32px;
                color: #000000;

                span {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC, serif;
                    font-weight: 400;
                    line-height: 20px;
                }

                &:hover {
                    cursor: pointer;
                    background: #FFFAE4;
                }
            }

            .tag-info-unchecked {
                height: 30px;
                border-radius: 15px;
                border: 1px solid #AAAAAA;
                padding: 0 10px;
                margin-left: 20px;
                line-height: 32px;
                color: #AAAAAA;

                &:hover {
                    cursor: pointer;
                    background: #FACF36;
                    border: 1px solid #000000;
                    color: #000000;
                }

                span {
                    height: 20px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC, serif;
                    font-weight: 400;
                    line-height: 20px;
                }
            }
        }

        .doc-thumb-1 {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            overflow: hidden;
            padding-left: 20px;

            .doc-thumb {
                margin-right: 38px;
            }
        }

        .second-group {
            margin-top: 40px;
        }

    }
}

</style>