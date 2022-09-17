<template>
    <div class="nav-container">
        <div class="nav-logo" @click="$router.push('/')">
            All Docs
        </div>
        <div class="nav-setting">
            <Button type="text" @click="$router.push('/admin/newDocument')">
                + 添加文档
            </Button>
            <Button type="text" @click="$router.push('/admin/allDocuments')">
                <Icon type="ios-settings" />
            </Button>
        </div>

    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            buttonSize: "min"
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
    font-family: Roboto;
    float: left;

    top: 0px;
    left: 0px;
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