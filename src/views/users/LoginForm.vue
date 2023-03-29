<template>
    <div class="login-form-container">
        <p class="form-title"><span>欢迎加入 全文档</span></p>
        <p class="form-subtitle"><span>创建一个全新的账户，开启文档畅游之旅</span></p>
        <div style="margin-top: 40px;">
            <div class="search-input-top">
                <input placeholder="用户名" v-model="searchValue"
                       @keyup.enter="clickToSearch(searchValue)"></input>
            </div>
            <div class="search-input-top">
                <input placeholder="密码" v-model="searchValue"
                       @keyup.enter="clickToSearch(searchValue)"></input>
            </div>
        </div>
        <div style="padding: 0px 0px 10px 0;margin-top: 40px;">
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
                                                            点我确定登录</span>

                            </div>
                        </div>
        <p>还没有账号，现在<span class="focus-word">注册一个</span></p>
    </div>
</template>

<script>
export default {
    name: "LoginForm.vue",
    data() {
        return {
            buttonSrc: require("@/assets/source/upload.png"),
            placeholder: '请输入您想要查找的文档',
        }
    }
}
</script>

<style scoped lang="scss">
.login-form-container {
    text-align: left;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    padding: 37px 86px 0;

    .form-title {
        font-size: 24px;
        line-height: 33px;
    }
    .form-subtitle {
        margin-top: 11px;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 22px;
    }

    .search-input-top {
        margin-top: 20px;
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #000000;
        padding-left: 10px;

        display: flex;
        justify-content: flex-start;
        align-content: center;

        input {
            height: 41px;
            width: calc(100%-6px);
            text-decoration: none;
            outline: none;
            border: none;
        }
    }

    .focus-word {
        color: #FBD642;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>