<template>
    <div class="operation-container">
        <div class="item" v-for="item in data" @click="operate(item)">
            <div class="item-logo">
                <img :src="item.src" :alt="item.src">
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
                    src: require("@/assets/source/heart.png"),
                    index: "1"
                },
                {
                    name: "竖个大拇指",
                    src: require("@/assets/source/like.png"),
                    index: "2"
                },
                {
                    name: "立马下载",
                    src: require("@/assets/source/download.png"),
                    index: "3"
                },
            ],
            docId: this.$route.query.docId,
        }
    },
    mounted() {

    },
    methods: {
        operate(item) {
            console.log(item)
            if (item.index == 3) {
                console.log(item)
                window.open("http://81.69.247.172:8082/files/view/" + this.docId, "_blank");
            }
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
        padding-top: 10px;
    }
    img {
        /*width: 48px;*/
        /*height: 48px;*/
    }
</style>