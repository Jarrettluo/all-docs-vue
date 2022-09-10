<template>
    <div class="homepage">
        <div class="top-group">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
        </div>
        <div class="bottom-group">
            <div class="left-panel">
                <div class="top-container">
                    <div class="panel-title left-pane-title">
                        <span>全部文档</span>
                    </div>
                    <div class="tag-info">
                        <span>金融</span>
                    </div>
                    <div class="tag-info-unchecked">
                        <span>金融dslfjsdlfjs</span>
                    </div>
                    <div class="tag-info-unchecked">
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
                <div class="doc-thumb second-group">
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                    <DocThumb></DocThumb>
                </div>
            </div>
            <div class="right-panel">
                <div class="top-container">
                    <div class="panel-title"><span>热门文档排行 🔥</span></div>
                </div>
                <div class="hot-trend">
                    <HotTrend></HotTrend>
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
    },
    data() {
        return {
            imgSrc: require("../assets/source/banner.png"),
            data: {

            }
        }
    },
    mounted() {
      this.init()
    },
    methods: {
        init() {
            let data = {
                tag1: {
                    name: "tag111",
                    tagId: "sjflsjdfl",
                    docList: [
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        }, {
                            name: "附件1：分类圣诞f节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },
                        {
                            name: "副书记分类圣诞节给力的价格.pdf",
                            id: "122343243",
                        }, {
                            name: "flsjljsalglsgjlsjd都是浪费精力的手机.pptx",
                            id: "122343243",
                        },
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        }, {
                            name: "附件1：分类圣诞f节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },
                        {
                            name: "副书记分类圣诞节给力的价格.pdf",
                            id: "122343243",
                        }, {
                            name: "flsjljsalglsgjlsjd都是浪费精力的手机.pptx",
                            id: "122343243",
                        },
                    ],
                },
                tag2: {
                    name: "中央决定",
                    tagId: "23324",
                    docList: [
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        },{
                            name: "附件1：分类圣诞节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },
                    ]
                },
                tag3: {
                    name: "pdf",
                    tagId: "dsfds",
                    docList: [
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        },{
                            name: "附件1：分类圣诞节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },
                    ]
                }
            }
        },
        // this.data = data

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
            padding-bottom: 40px;
            z-index:-1;
        }
        .bottom-group {
            margin: auto;
            width: 1200px;
            height: 619px;
            box-shadow: 0px 0px 5px 0px rgba(64,64,64,0.3);
            border-radius: 8px;
            .left-panel {
                height: 100%;
                width: 900px;
                float: left;
                padding: 0px 30px 0 0;
            }
            .right-panel {
                height: 100%;
                width: 300px;
                float: left;
                padding: 0 24px 0px 40px;
            }
            .top-container {
                height: 110px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .panel-title {
                    span {
                        font-size: 20px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 600;
                        color: #464646;
                        line-height: 28px;
                    }
                }
                .left-pane-title {
                    margin-left: 24px;
                }
                .tag-info {
                    height: 30px;
                    background: #FACF36;
                    border-radius: 15px;
                    border: 1px solid #000000;
                    padding: 0 10px;
                    margin-left: 20px;
                    line-height: 32px;
                    color: #000000;
                    span {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                    }
                    //&:hover {
                    //    cursor: pointer;
                    //    border: 1px solid #AAAAAA;
                    //    color: #AAAAAA;
                    //    background: none;
                    //}
                }

                .tag-info-unchecked {
                    height: 30px;
                    border-radius: 15px;
                    border: 1px solid #AAAAAA;
                    padding: 0 10px;
                    margin-left: 20px;
                    line-height: 32px;
                    color: #AAAAAA;
                    &:hover {
                        cursor: pointer;
                        background: #FACF36;
                        border: 1px solid #000000;
                        color: #000000;
                    }
                    span {
                        height: 20px;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                    }
                }
            }
            .doc-thumb {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                overflow: hidden;
            }
            .second-group {
                margin-top: 40px;
            }

        }
    }

</style>