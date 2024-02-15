<template>
    <div class="doc-group">
        <div class="doc-thumb-group" @scroll="handleScroll">
            <DocThumb class="doc-thumb"
                      v-for="item in data"
                      :flag="false"
                      :title="item.name"
                      :docId="item.thumbId"
                      @click.native="getDocView(item.id)"
            ></DocThumb>
            <div style="height: 30px; width: 100%;
             color: #AAAAAA; line-height: 30px;text-align: center" >
                <span v-show="flag">  加载中... </span>
            </div>
        </div>
<!--        <div class="doc-group-page">-->
<!--            <Page-->
<!--                :page-size="pageSize"-->
<!--                :current="pageNum"-->
<!--                :total="total"-->
<!--                @on-change="pageChange"-->
<!--            />-->
<!--        </div>-->
    </div>
</template>

<script>
import DocThumb from '@/home/DocThumb'
export default {
    name: "FilterListPage",
    data() {
        return {
            pageNum: 1,
            flag: false,

            isLoading: false,
            prevScrollTop2: 0, // 用于跟踪前一个滚动位置
        }
    },
    components: {
        DocThumb
    },
    props: {
        data: {type: Array, requires: true, default: []},
        total: {type: Number, requires: false, default: 1},
        pageNum: {type: Number, requires: false, default: 1},
        pageSize: {type: Number, requires: false, default: 20}
    },
    methods: {
        pageChange(page) {
            this.$emit("on-page-change", page)
        },
        getDocView(id) {
            this.$router.push({
                path:'/preview',
                query:{
                    docId: id
                }
            })
        },
        handleScroll(event) {
            this.flag = true
            const container = event.target;
            const currentScrollTop = container.scrollTop;

            if (
                currentScrollTop > this.prevScrollTop2 && // 检查滚动方向是向下
                container.scrollHeight - container.scrollTop <= container.clientHeight + 10 &&
                !this.isLoading
            ) {
                this.flag = false
                this.$emit("on-page-change", this.pageNum);
                this.prevScrollTop2 = currentScrollTop; // 更新前一个滚动位置
            }
        },
    }
}
</script>

<style scoped lang="scss">
.doc-group {
    width: 100%;
    height: 660px;
    position: relative;

    .doc-thumb-group {
        width: 100%;
        height: calc(100% - 60px);
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;
        /*子元素之间取消空白间隙，并把项目放在容器顶部。*/
        .doc-thumb {
            margin-right: 30px;
        }
    }

    .doc-group-page {
        padding: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>