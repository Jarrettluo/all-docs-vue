<template>
    <div class="nav-container">
        <div class="nav-logo" @click="$router.push('/')">
            <img :src="logoSrc" width="80%" height="80%" alt=""/>
        </div>
        <div class="nav-setting">
<!--            <Button type="text" @click="$router.push('/admin/newDocument')">-->
<!--                + 添加文档-->
<!--            </Button>-->
            <Button type="text" @click="$router.push('/admin/allDocuments')">
                <Icon type="ios-keypad" />
            </Button>
        </div>

    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            buttonSize: "min",
            logoSrc: require("../assets/svg/newLogo.svg"),
        }
    }
}
</script>

<style scoped>
.nav-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f4d057;
    color: rgba(208, 164, 1, 100);
    font-family: Roboto, serif;
    float: left;

    top: 0;
    left: 0;
    position: fixed;
    z-index: 998;
}

.nav-logo {
    line-height: 50px;
    color: rgba(87, 77, 24, 100);
    font-size: 28px;
    text-align: left;
    /*width: 200px;*/
    float: left;
    cursor: pointer;

    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #6c6025;
    /*color: red;*/

    padding-left: 2%;
}

.nav-setting {
    float: right;
}


</style>