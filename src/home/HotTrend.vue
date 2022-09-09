<template>
    <div class="hot-trend">
        <div class="first-group">
            <DocThumb></DocThumb>
            <div class="first-doc-detail">
                <div class="doc-title">超级专业知识</div>
                <div class="doc-info"> 3000+</div>
                <div class="doc-info"> 3000+</div>
                <div class="doc-info"> 3000+</div>
            </div>
        </div>
        <div class="second-group">
            <div class="trend-item" v-for="item in hotTrend">
                <div class="trend-num">
                    2
                </div>
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import DocThumb from '@/home/DocThumb'
export default {
    name: "HotTrend.vue",
    components: {DocThumb},
    data() {
        return {
            hotTrend: [{
                name: "jdslfjdsfjdslfjds",
            }, {
                name: "jdslfjsdljfsdljsdl",
            },{
                name: "jdslfjdsfjdslfjds",
            }, {
                name: "jdslfjsdljfsdljsdl",
            },{
                name: "超级超级住哪页的中山佛山的高速公路上极乐世界尴尬了",
            }, {
                name: "jdslfjsdljfsdljsdl",
            }]
        }
    }

}
</script>

<style lang="scss" scoped>
    .hot-trend {
        width: 100%;
        height: 140px;
        text-align: left;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        .first-group {
            //float: left;
            display: flex;
            justify-content: flex-start;
            .first-doc-detail {
                //float: left;
                //width: ;
                padding-left: 20px;
                .doc-title {
                    height: 60px;
                }
                .doc-info {
                    height: 24px;
                    line-height: 24px;
                    color: #464646;
                }
            }
        }
        .second-group {
            .trend-item {
                display: flex;
                justify-content: flex-start;
                padding: 10px 0;
                &:hover {
                    cursor: pointer;
                    background-color: #f1f2f3;
                    border-radius: 4px;
                }
                .trend-num {
                    width: 24px;
                    height: 24px;
                    background: #FACF36;
                    border-radius: 2px;
                    border: 1px solid #000000;
                    line-height: 24px;
                    text-align: center;
                }
                span {
                    padding: 0 10px;
                    line-height: 24px;
                }
            }
        }
    }
</style>