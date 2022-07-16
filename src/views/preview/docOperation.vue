<template>
    <div class="operation-container">
        <div class="item" v-for="item in data" @click="operate(item)">
            <div class="item-logo">
                {{ item.src }}
            </div>
            <div>
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "docOperation",
    data() {
        return {
            data: [
                {
                    name: "马上收藏",
                    src: "abc",
                    index: "1"
                },
                {
                    name: "竖个大拇指",
                    src: "abc",
                    index: "2"
                },
                {
                    name: "立马下载",
                    src: "abc",
                    index: "3"
                },
            ]
        }
    },
    methods: {
        operate(item) {
            console.log(item)
        }
    }
}
</script>

<style scoped>
    .operation-container {
        width: 50%;
        min-width: 400px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        height: 200px;
    }
    .item {
        width: 120px;
        height: 120px;
        background-color: #ffcc4e;
        border-radius: 120px;
        margin: auto;
        border: 2px #1b0d01 solid;
        position: relative;
    }
    .item:hover {
        background-color: #f1db77;
        cursor: pointer;
        border: 2px #2d2c2b solid;
    }

    .item-logo {
        height: 80px;
        /*display: inline-block;*/
        /*position: absolute;*/
        /*width: 120px;*/
        /*left: 0;*/
        /*top: 0;*/
        line-height: 80px;
    }
</style>