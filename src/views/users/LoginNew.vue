<template>
    <div class="container">
        <div class="login-wrapper">
            <Row style="height: 100%">
                <Col span="12" class="left"></Col>
                <Col span="12" class="right">
<!--                    <login-form></login-form>-->
                    <router-view></router-view>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import LoginForm from './LoginForm'
import RegistryForm from './RegistryForm'
export default {
    name: "LoginNew.vue",
    components: {
        LoginForm,
        RegistryForm
    }
}
</script>

<style scoped lang="scss">
    .container {
        height: 100vh;
        width: 100%;
        background-image: url("../../assets/source/bg.png");
        .login-wrapper {
            border-radius: 20px;
            width: 1124px;
            height: 439px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);


            .left {
                height: 100%;
                background-image: url("../../assets/source/group6.png");
            }
            .right {
                height: 100%;

            }
        }
    }
</style>