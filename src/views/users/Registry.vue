<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">用户注册</div>
            <div class="form-wrapper">
                <input type="text" v-model="username" name="username" placeholder="用户名" class="input-item">
                <input type="password" v-model="password" name="password" placeholder="密码" class="input-item">
                <input type="password" v-model="checkPassword" name="checkPassword" placeholder="确认密码" class="input-item">
                <div class="btn" @click="registry">注册</div>
            </div>
            <div class="msg">
                已经有账号
<!--                <a href="#">现在注册</a>-->
                <router-link to="/login">现在登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import UserRequest from '@/api/user'

export default {
    name: "registry",
    data() {
        return {
            username: "",
            password: "",
            checkPassword: "",
        }
    },
    methods: {
        registry() {
            if( this.checkPassword != this.password) {
                this.$Message.error('两次密码不相同，请检查');
                return;
            }
            let params = {
                "username": this.username,
                "password": this.checkPassword
            }
            UserRequest.postData(params).then(
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