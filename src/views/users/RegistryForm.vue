<template>
    <div class="login-form-container">
        <p class="form-title"><span>欢迎加入 全文档</span></p>
        <p class="form-subtitle"><span>创建一个全新的账户，开启文档畅游之旅</span></p>
        <div style="margin-top: 40px;">
            <div class="search-input-top">
                <input type="text" v-model="username" name="username" placeholder="用户名"></input>
            </div>
            <div class="search-input-top">
                <input type="password" v-model="password" name="password" placeholder="密码"></input>
            </div>
            <div class="search-input-top">
                <input type="password" v-model="checkPassword" name="checkPassword" placeholder="确认密码"
                       @keyup.enter="registry"></input>
            </div>
        </div>
        <submit-button
            :src="buttonSrc"
            label="点我立即注册"
            @click="registry"
        ></submit-button>
        <p>已经有账号，现在<span class="focus-word">
            <router-link to="/login">就要登录</router-link>
            </span></p>
    </div>
</template>

<script>
import UserRequest from '@/api/user'
import SubmitButton from '@/components/SubmitButton'

export default {
    name: "RegistryForm.vue",
    data() {
        return {
            buttonSrc: require("@/assets/source/upload.png"),
            username: "",
            password: "",
            checkPassword: "",
        }
    },
    components: {
        SubmitButton
    },
    methods: {
        async registry() {
            if( this.checkPassword !== this.password) {
                this.$Message.error('两次密码不相同，请检查');
                return;
            }
            let params = {
                "username": this.username,
                "password": this.checkPassword
            }
            await UserRequest.postData(params).then(
                response => {
                    if (response.data == null) {
                        this.$Message.error('注册失败，请重试！');
                    } else {
                        this.$router.push({
                            path:'/login',
                            query:{
                                userName: this.userName
                            }
                        })
                    }
                }
            )
        }
    }
}
</script>

<style scoped lang="scss">
.login-form-container {
    text-align: left;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
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
            width: calc(100% - 6px);
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