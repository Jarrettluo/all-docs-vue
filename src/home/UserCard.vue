<template>
    <div class="main-zone" @click="click">
        <div class="left-zone" style="">
            <div class="left-zone-top">
                {{ title }}
            </div>
            <div class="left-zone-bottom">
                {{ subtitle }}
            </div>
        </div>
        <div class="right-zone" style="">
            <img :src="src" alt="" width="56px" height="56px">
        </div>
    </div>
</template>

<script>
export default {
    name: "UserCard",
    data() {
        return {}
    },
    props: ["title", "subtitle", "src"],
    methods: {
        click() {
            this.$emit("click", true)
        }
    }
}
</script>

<style scoped lang="scss">

.main-zone {
    width: 100%;
    display: flex;
    height: 120px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(129, 100, 0, 0.3);
    border-radius: 8px;
    border: 2px solid #000000;
    padding-left: 30px;
    font-family: PingFangSC-Semibold, PingFang SC, serif;

    .left-zone {
        width: 248px;
        padding: 30px;
        text-align: left;

        .left-zone-top {
            font-size: 20px;
            font-weight: 600;
            color: #000000;
            line-height: 28px;
        }

        .left-zone-bottom {
            height: 20px;
            font-size: 14px;
            font-weight: 600;
            color: #464646;
            line-height: 20px;
            margin-top: 12px;
        }
    }

    .right-zone {
        width: calc(100% - 248px);
        padding: 27px 0 27px 0;
        text-align: left
    }

    &:hover {
        cursor: pointer;
        background-color: #FFF7D6;
    }
}
</style>