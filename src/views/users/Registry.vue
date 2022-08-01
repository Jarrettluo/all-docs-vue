<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">用户注册</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="用户名" class="input-item">
                <input type="password" name="password" placeholder="密码" class="input-item">
                <input type="password" name="checkPassword" placeholder="确认密码" class="input-item">
                <div class="btn">注册</div>
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

export default {
    name: "registry",
    data() {
        return {

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