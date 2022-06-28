<template>
    <div class="nav-container">
        <div class="nav-logo" @click="$router.push('/')">
            All documents
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
    background-color: rgba(232, 208, 95, 100);
    color: rgba(208, 164, 1, 100);
    font-family: Roboto;

    float: left;
}
.nav-logo {
    line-height: 50px;
    color: rgba(87, 77, 24, 100);
    font-size: 28px;
    text-align: left;
    font-family: PMZDBiaoTi-regular;
    width: 200px;
    float: left;
    cursor: pointer;
}

.nav-setting {
    float: right;
}



</style>