<template>
    <div class="search-doc">
        <div class="doc-title-group">
            <div class="doc-pic" style="text-align: center;">
<!--                <Avatar :style="{background: color}">{{ user }}</Avatar>-->
                <img :src=" thumbId | imgSrc " alt="thumb" style="width: 36px;max-height: 48px;border: 1px solid #dcdee2; border-radius: 2px">
            </div>
            <div class="title-group">
                <div class="doc-title-info" @click="getDocView()">
                    {{ title }}
                </div>
                <div class="description">
                    <div class="description-item">
                        {{ timeIn }}
                    </div>
                    <div class="description-item">
                        {{ userName }}
                    </div>
                    <div class="description-item" v-show="categoryIn">
                        {{ categoryIn }}
                    </div>
                    <Tag color="blue" v-for="item in tagsIn">{{item}}</Tag>
<!--                    <Tag color="geekblue">geekblue</Tag>-->
<!--                    <Tag color="purple">purple</Tag>-->
                </div>
            </div>
        </div>
        <div class="doc-abstract">
            <p v-html="description"></p>
<!--            {{description}}-->
        </div>
<!--        <div class="ivu-list-container">-->
            <ul class="ivu-list-item-action">
                <li>
                    <i class="ivu-icon ivu-icon-ios-star-outline"></i>
                    {{collectNum}}
                </li>
                <li>
                    <i class="ivu-icon ivu-icon-ios-thumbs-up-outline"></i>889
                </li>
                <li>
                    <i class="ivu-icon ivu-icon-ios-chatbubbles-outline"></i>
                    {{commentNum}}
                </li>
            </ul>
<!--        </div>-->
    </div>
</template>

<script>
import {parseTime} from "@/utils/index"
import { BackendUrl } from '@/api/request'

export default {
    name: "SearchItem",
    data() {
        return {
            // categoryIn: "String",
            // tagsIn: []
        }
    },
    props: {
        id: { type: String, requires: true },
        thumbId: { type: String, requires: true },
        title: { type: String, requires: true },
        description: { type: String, requires: true },
        time: { type: String, requires: true, default: "232"},
        userName: { type: String, requires: true, default: 'admin'},
        category: { type: Object, requires: false,default: ''},
        tags: { type: Array, requires: false, default: []},
        collectNum: { type: Number, requires: false, default: 0},
        commentNum: { type: Number, requires: false, default: 0}
    },
    // 将 prop 数据转换为本地数据
    computed: {
        categoryIn: function () {
            if( this.category === null || this.category.name === null ){
                return null;
            } else {
                let temp = this.category.name
                if ( temp.length > 6) {
                    temp = temp.substring(0, 6) + '...'
                }
                return temp;
            }
        },
        tagsIn: function () {
            if ( this.tags === null || this.tags.length === 0) {
                return []
            } else {
                let temp = []
                this.tags.forEach(item => {
                    let temp1 = item.name
                    if ( temp1.length > 8) {
                        temp1 = temp1.substring(0, 8) + '...'
                    }
                    temp.push(temp1)
                })
                return temp
            }
        },
        timeIn: function() {
            return parseTime(new Date(this.time), '{y}年{m}月{d}日 {h}:{i}:{s}');
        },
        getDocView() {
            // let params = {
            //     docId: this.id
            // }
            // DocRequest.getView(this.id).then(response => {
            //     console.log(response)
            // })

            this.$router.push({
                path:'/preview',
                query:{
                    docId: this.id
                }
            })

        }
    },
    filters: {
        imgSrc(value) {
            if(value === "" || value === undefined || value == null) {
                return BackendUrl() + "/files/image2/d2d9933cf295443990b2bed036a534ec";
            } else {
                return BackendUrl() + "/files/image2/" + value;
            }
        }
    }

}
</script>

<style scoped>
.search-doc {
    padding: 12px 12px;
    border-bottom: 1px solid #e8eaec;
}

.search-doc:hover {
    background-color: rgba(245, 245, 245, 100);
    cursor: pointer;
}


.doc-title-group {
    height: 48px;
    margin-bottom: 16px;
    /*display: flex;*/
    /*flex: 1;*/
    /*align-items: flex-start;*/
    display: block;
}
.doc-pic {
    height: 48px;
    width: 48px;
    float: left;
    line-height: 48px;
    margin: auto;
}
.title-group {
    height: 48px;
    float: left;
    width: calc( 100% - 60px);
}
.doc-title-info {
    height: 22px;
    /*line-height: 36px;*/
    /*margin-bottom: 12px;*/
    color: rgba(208, 164, 1, 100);
    font-size: 16px;
    font-weight: 700;
}

.doc-title-info:hover {
    text-decoration: underline;
    color: rgba(208, 164, 1, 100);
}

.description {
    height: 26px;
    line-height: 26px;
    display: block;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    float: left;
}
.description-item {
    width: 200px;
    line-height: 24px;
    padding-top: 2px;
    float: left;
}
ul {
    margin: 16px 0 0;
}
li {
    padding: 0 20px;
}

.doc-abstract >>> em {
    background-color: yellow;
}

</style>