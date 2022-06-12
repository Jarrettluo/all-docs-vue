<template>
    <div class="banner-container">
        <div class="search-zone">
            <Input search enter-button="Search" placeholder="Enter something..." />
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner"
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
    border-right: 1px solid #f1db77 !important;
}

/deep/ .ivu-input-group-append {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
}

/deep/ .ivu-input-search {
    background-color: #ffffff !important;
    border-color: #dcdee2 !important;
    color: #f1db77 !important;
}
</style>