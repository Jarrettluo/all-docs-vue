<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">登 录</div>
            <div class="form-wrapper">
                <input type="text" v-model="username" name="username" placeholder="用户名" class="input-item">
                <input type="password" v-model="pwd" name="password" placeholder="密码" class="input-item">
                <div class="btn" @click="login">登录</div>
            </div>
            <div class="msg">
                还没有账号？
                <!--                <a href="#/registry">现在注册</a>-->
                <router-link to="/registry">现在注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import UserRequest from '@/api/user'

export default {
    name: "login",
    data() {
        return {
            username: "",
            pwd: "",
        }
    },
    methods: {
        login() {
            let params = {
                "username": this.username,
                "password": this.pwd
            }
            UserRequest.postUserLogin(params).then(
                response => {
                    if (response.data == null) {
                        this.$Message.error('登录失败，请重试！');
                    } else {
                        console.log(response.data)
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("id", response.data.userId)
                        localStorage.setItem("username", this.username)
                        this.$router.push({
                            path: '/',
                            query: {
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

<style scoped>
.container {
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
    background-color: #fff;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item::placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
    cursor: pointer;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}

</style>