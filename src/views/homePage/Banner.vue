<template>
    <div class="banner-container">
        <div class="search-zone">
            <Input search enter-button="搜索" placeholder="请输入文档关键字" @on-search="$router.push('/searchResult')"/>
        </div>
    </div>
</template>

<script>

export default {
    name: "Banner",
    components: {
    }
}
</script>

<style scoped>
.banner-container {
    width: 100%;
    height: 200px;
    line-height: 200px;
    background-color: rgba(244, 219, 101, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(244, 219, 101, 100);

}
.search-zone {
    width: 800px;
    line-height: 200px;
    height: 200px;
    margin: auto;
    padding-top: 100px;
}

/deep/ .ivu-input {
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    border: none;
    /*outline：none;*/
}

/deep/ .ivu-input:focus {
    border: none;
    outline: none;
}

/deep/ .ivu-input-group-append {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
    border: none !important;
}

/deep/ .ivu-input-group-append::before {
    display: block;
    width: 1px;
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: -1px;
    background: inherit;
    background-color: #f1db77;
}

/deep/ .ivu-input-search {
    background-color: #ffffff !important;
    color: #f1db77 !important;
}
</style>