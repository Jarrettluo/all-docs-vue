<template>
    <div class="search-zone">
        <Input search enter-button="搜索" :value="keyWord" placeholder="请输入文档关键字" @on-search="searchValue"/>
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    data() {
        return {
            keyWord: this.$route.query.keyWord,
        }
    },
    methods: {
        searchValue(value) {
            if( value != "" ) {
                this.$router.push({
                    path:'/searchResult',
                    query:{
                        keyWord: value
                    }
                })
                this.$emit("on-search", true)
            }
        }
    }
}
</script>

<style scoped>
.search-zone {
    width: 800px;
    line-height: 80px;
    height: 80px;
    /*margin: auto;*/
    padding-top: 20px;
    /*background-color: #f1db77;*/
}

/deep/ .ivu-input-group {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

/deep/ .ivu-input {
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    border: none;
    /*outline：none;*/
    /*background-color: #f1db77;*/
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