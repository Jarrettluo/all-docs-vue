<template>
    <div class="homepage">
        <div class="top-group">

        </div>
        <div class="bottom-group">
            <div class="left-panel">
                <div class="top-container">
                    <div style="float: left">
                        <span>全部文档</span>
                    </div>
                    <div >
                        <span>金融</span>
                    </div>
                </div>
                <div class="doc-thumb">
                    <DocThumb ></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                </div>
                <div class="doc-thumb">
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                </div>


<!--                <DocTag type="excel"></DocTag>-->
<!--                <DocTag type="word"></DocTag>-->
<!--                <DocTag type="pdf"></DocTag>-->
<!--                <DocTag type="xxx"></DocTag>-->
            </div>
            <div class="right-panel">
                <div class="top-container">
                    <span>热门文档排行 🔥</span>
                </div>
                <div class="hot-trend">
                    <HotTrend></HotTrend>

<!--                    <div class="hot-first">-->

<!--                    </div>-->
<!--                    <div class="hot-group">-->

<!--                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DocTag from '@/home/DocTag1';
import DocThumb from '@/home/DocThumb'

import HotTrend from '@/home/HotTrend'

export default {
    name: "index.vue",
    components: {
        HotTrend,
        DocTag,
        DocThumb
    }
}
</script>

<style lang="scss" scoped>

    .homepage {
        width: 100%;
        height: 100vh;
        .top-group {
            height: 340px;
            width: 100%;
        }
        .bottom-group {
            margin: auto;
            width: 1200px;
            height: 619px;
            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);
            border-radius: 8px;
            .left-panel {
                height: 100%;
                width: 800px;
                float: left;
            }
            .right-panel {
                height: 100%;
                width: 400px;
                float: left;
            }
            .top-container {
                height: 110px;
                width: 100%;
                text-align: left;
                span {
                    font-size: 20px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #464646;
                    line-height: 110px;
                }
            }
            .doc-thumb {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                overflow: hidden;
            }

        }
    }

</style>