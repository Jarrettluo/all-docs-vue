<template>
    <div class="hot-trend">
        <div class="first-group"
             @click="getDocView(top1.id)"
        >
            <div class="doc-thumb">
                <DocThumb :flag="true" :title="top1.name"></DocThumb>
                <div class="top-1">
                    <span>Top 1</span>
                </div>
            </div>
            <div class="first-doc-detail">
                <div class="doc-title">{{top1.name}}</div>
                <div class="doc-info"><Icon type="ios-chatbubbles-outline" /> {{top1.commentNum}}</div>
                <div class="doc-info"><Icon type="ios-thumbs-up-outline" /> {{top1.likeNum}}</div>
                <div class="doc-info"><Icon type="md-heart-outline" /> {{top1.collectNum}}</div>
            </div>
        </div>
        <div class="second-group">
            <div class="trend-item" v-for="(item, index) in hotTrend" :key="index" @click="getDocView(item.id)">
                <div class="trend-num" :style="index | xxx">
                    {{ index+2 }}
                </div>
                <div class="trend-title">
                    <span>{{item.name}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import DocThumb from '@/home/DocThumb'
import StatsRequest from "@/api/stats";

export default {
    name: "HotTrend.vue",
    components: {DocThumb},
    data() {
        return {
            top1: {
                name: "这是一个超级长的额文档.word",
                id: null,
                commentNum: 0,
                likeNum: 0,
                collectNum: 0
            },
            hotTrend: [{
                name: "jdslfjdsfjdslfjds",
            }, {
                name: "jdslfjsdljfsdljsdl",
            },{
                name: "jdslfjdsfjdslfjds",
            }, {
                name: "jdslfjsdljfsdljsdl",
            },{
                name: "超级超级住哪页的中山佛山的高速公路上z这是一个超级长的极乐世界尴尬了",
            }, {
                name: "jdslfjsdljfsdljsdl",
            }]
        }
    },
    filters: {
        xxx(value) {
            if ( value < 2) {
                return {
                    backgroundColor: "#FACF36"
                }
            } else if ( value < 4) {
                return {
                    backgroundColor: "#FFFAE4"
                }
            } else {
                return {
                    backgroundColor: "#fff",
                    borderColor: "#AAAAAA",
                    color: "#AAAAAA"
                }
            }

        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let data = {
                top1: {
                    name: "5g零售行业应用白皮书-苏宁易购+尼尔森-202008.pdf",
                    id: "631456fe15c5d23bfb1ea730",
                    commentNum: 121,
                    likeNum: 2332,
                    collectNum: 324535
                },
                others: [{
                    hit: 456,
                    name: "好车购平台.pptx",
                    id: "63136f528c86d1646ac411d0"
                },{
                    hit: 12,
                    name: "中国金融科技生态白皮书2021年.pdf",
                    id: "63136f448c86d1646ac411ca"
                },{
                    hit: 12,
                    name: "工作条例.docx",
                    id: "631315e69faed23bb3baf607"
                },{
                    hit: 12,
                    name: "中国领导者十年领导力图鉴.pdf",
                    id: "630821f829905176a6cb4293"
                },{
                    hit: 12,
                    name: "金融数学专业白皮书.pdf",
                    id: "62b9bc2c845f9a73b891bd1d"
                },{
                    hit: 12,
                    name: "金融学院-金融学专业电子白皮书.pdf",
                    id: "62b9bc38845f9a73b891bd23"
                }]
            }


            StatsRequest.getHotTrend().then(response => {
                if (response.code == 200) {
                    data = response.data;

                    let topValue = data.top1 | null;
                    if ( topValue != null) {
                        this.top1 = data.top1
                    }

                    let xx = data.others;
                    if (xx != null) {
                        this.hotTrend = xx.sort(this.compare('hit'))
                    }
                }
            })



        },
        compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        getDocView(id) {
            this.$router.push({
                path:'/preview',
                query:{
                    docId: id
                }
            })

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
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding: 4px;
            &:hover {
                background-color: #f1f2f3;
                cursor: pointer;
            }
            .doc-thumb {
                width: 100px;
                height: 140px;
                position: relative;
                .top-1 {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 58px;
                    height: 24px;
                    background-color: #FACF36;
                    border: 1px solid #000000;
                    border-radius: 2px 0px 100px 0px;
                    text-align: center;
                    span {
                        font-size: 14px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 600;
                        color: #000000;
                        line-height: 22px;
                    }
                }
            }
            .first-doc-detail {
                padding-left: 20px;
                .doc-title {
                    height: 70px;
                    line-height: 17px;
                    overflow: hidden;
                    -webkit-line-clamp: 4;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
                .doc-info {
                    height: 24px;
                    line-height: 24px;
                    color: #464646;
                }
            }
        }
        .second-group {
            margin-top: 20px;
            //padding: 0 4px;
            .trend-item {
                display: flex;
                justify-content: flex-start;
                padding: 10px 4px;
                &:hover {
                    cursor: pointer;
                    background-color: #f1f2f3;
                    border-radius: 4px;
                }
                .trend-num {
                    width: 24px;
                    height: 24px;
                    display: block;
                    border-radius: 2px;
                    border: 1px solid #000000;
                    line-height: 24px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 14px;
                }
                .trend-title {
                    width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    span {
                        padding: 0 10px;
                        line-height: 24px;
                        font-weight: 400;
                        font-size: 12px;
                    }
                }

            }
        }
    }
</style>