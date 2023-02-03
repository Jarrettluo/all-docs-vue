<template>
    <div class="operation-container">
        <div class="item" :class="(item.index === '1' && likeStatus === 1)
        || (item.index === '2' && collectStatus===1) ? 'pushed' : '' "
             v-for="item in data" @click="operate(item)">
            <div class="item-logo">
                <img :src="item.src" :alt="item.src">
            </div>
            <div class="operation-title">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
import CollectRequest from '@/api/collect'
import { BackendUrl } from '@/api/request'

export default {
    name: "docOperation",
    data() {
        return {
            data: [
                {
                    name: "竖个大拇指",
                    src: require("@/assets/source/like.png"),
                    index: "1"
                },
                {
                    name: "马上收藏",
                    src: require("@/assets/source/heart.png"),
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
    props: {
        likeStatus: Number,
        collectStatus: Number
    },
    mounted() {

    },
    methods: {
        operate(item) {
            if (item.index === "3") {
                window.open(BackendUrl() + "/files/view/" + this.docId, "_blank");
            } else if (item.index === "1" || item.index === "2") {

                this.$emit("addLike", Number(item.index))

                // if (!localStorage.getItem('token')) {
                //     this.$Message.error('跳转到登录页面，请先登录！');
                //     this.$router.push({
                //         path: '/login',
                //         query: {
                //             userName: this.userName
                //         }
                //     })
                // }
                //
                // let params = {
                //     docId: this.docId
                // }
                // CollectRequest.postData(params).then(res => {
                //     this.$Notice.info({
                //         title: '通知信息',
                //         desc: '收藏点赞成功！'
                //     });
                // }).catch(res => {
                //     console.log(res)
                // })
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
    border-radius: 120px;
    margin: auto;
    position: relative;

    background: #FACF36;
    border: 2px solid #000000;
}

.item:hover {
    background-color: #f1db77;
    cursor: pointer;
    border: 2px #2d2c2b solid;
}

.pushed {
    background-color: #f1db77;
}

.operation-title {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-weight: 500;
    color: #000000;
    line-height: 20px;
}

.item-logo {
    height: 80px;
    line-height: 80px;
    width: 120px;
}

.item-logo img {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
}

img {
    /*width: 48px;*/
    /*height: 48px;*/
}
</style>