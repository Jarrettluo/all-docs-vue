<template>
    <div class="homepage">
        <div class="top-group" style="text-align: center; ">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
            <SearchGroup></SearchGroup>
        </div>
        <div class="bottom-group">
            <div class="left-panel">
                <div class="top-container">
                    <div class="panel-title left-pane-title">
                        <span>全部文档</span>
                    </div>
                    <div
                        :class=" item.clicked ? 'tag-info' : 'tag-info-unchecked' "
                        v-for="item in data"
                        @click="changeToCurrentTag(item.name, item.tagId)"
                    >
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="doc-thumb-1">
                    <DocThumb class="doc-thumb" :flag="false" :title="doc.name" v-for="doc in currentData.slice(0, 6)"></DocThumb>
                </div>
                <div class="doc-thumb-1 second-group">
                    <DocThumb class="doc-thumb" :flag="false" :title="doc.name" v-for="doc in currentData.slice(6, 12)"></DocThumb>
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
import DocTag from '@/home/DocTag';
import DocThumb from '@/home/DocThumb'
import HotTrend from '@/home/HotTrend'
import SearchGroup from '@/home/SearchGroup'

export default {
    name: "index.vue",
    components: {
        HotTrend,
        DocTag,
        DocThumb,
        SearchGroup
    },
    data() {
        return {
            imgSrc: require("../assets/source/banner.png"),
            data: {},
            currentData: []
        }
    },
    created() {
      this.init()
    },
    methods: {
        init() {
            let data = [{
                    name: "最近的文档",
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
                },{
                    name: "中央决定",
                    tagId: "23324",
                    docList: [
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        },{
                            name: "flsjljsalglsgjlsjd都是浪费精力的手机.pptx",
                            id: "122343243",
                        },
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        }, {
                            name: "附件1：分类圣诞f节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },{
                            name: "罗佳瑞附件1：分类圣诞节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },
                    ]
                }, {
                    name: "pdf的文档",
                    tagId: "dsfds",
                    docList: [
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        },{
                            name: "附件1：分类圣诞节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        },{
                            name: "flsjljsalglsgjlsjd都是浪费精力的手机.pptx",
                            id: "122343243",
                        },
                        {
                            name: "附件1：中共中央党组织布拉.docx",
                            id: "122343243",
                        }, {
                            name: "sfdlsjl附件1：分类圣诞f节福利的手机铃声关电视了.docx",
                            id: "122343243",
                        }
                    ]
                }
            ]
            this.data = data;
            this.changeToCurrentTag(this.data[0].name, this.data[0].tagId)


        },
        /**
         * 切换到某一个标签上
         * @param name
         * @param tagId
         */
        changeToCurrentTag(name, tagId) {
            this.currentData = []
            this.data.forEach( item => {
                if(item.name == name && item.tagId == tagId) {
                    item.clicked = true
                    this.currentData = item.docList
                } else {
                    item.clicked = false
                }
            })
        }
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
                padding: 0px 0px 0 0;
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
                    &:hover {
                        cursor: pointer;
                        background: #FFFAE4;
                    }
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
            .doc-thumb-1 {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                overflow: hidden;
                padding-left: 20px;
                .doc-thumb {
                    margin-right: 38px;
                }
            }
            .second-group {
                margin-top: 40px;
            }

        }
    }

</style>