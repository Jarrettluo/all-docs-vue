<template>
    <div class="word-wrap">
        <div v-show="view_flag" style="padding: 400px; color: #ffcc4f;">
            <div class="demo-spin-icon-load">
                <Icon type="md-refresh" style="font-size: 48px;"/>
            </div>
            <div style='font-size:16px'>加载中...</div>
        </div>
        <div v-show="!view_flag">
            <vue-office-excel :src="excel" @rendered="rendered"/>
        </div>
    </div>
</template>

<script>

//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
    name: "ExcelView",
    data() {
        return {
            view_flag: true,

            excel: null,
            route: this.$route.query.docId
        };
    },
    created() {
        this.before()
    },
    components: {
        VueOfficeExcel
    },
    methods: {
        before() {
            let docId = this.$route.query.docId;
            this.excel = 'http://81.69.247.172:8082/files/view/' + docId;

        },
        rendered(){
            this.view_flag = false
        },
    }
}
</script>

<style lang="scss" scoped>
.word-wrap {
    padding: 0;
    margin: -10px 0;

    img {
        width: 100%;
    }
}

/* 旋转效果 */
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 遮罩 */
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .8);
}
</style>
