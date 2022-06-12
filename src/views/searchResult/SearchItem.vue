<template>
    <div class="search-doc">
        <div class="doc-title-group">
            <div class="doc-pic">
                <Avatar :style="{background: color}">{{ user }}</Avatar>
            </div>
            <div class="title-group">
                <div class="doc-title-info">
                    这里是标题信息
                </div>
                <div class="description">
                    2021年1月30日  罗佳瑞     我的共享
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                </div>
            </div>
        </div>
        <div class="doc-abstract">
            sjfldsjfldsjfldj这是doc的摘要信息啊
        </div>
<!--        <div class="ivu-list-container">-->
            <ul class="ivu-list-item-action">
                <li>
                    <i class="ivu-icon ivu-icon-ios-star-outline"></i>232
                </li>
                <li>
                    <i class="ivu-icon ivu-icon-ios-thumbs-up-outline"></i>889
                </li>
                <li>
                    <i class="ivu-icon ivu-icon-ios-chatbubbles-outline"></i>
                    3234
                </li>
            </ul>
<!--        </div>-->
    </div>
</template>

<script>
export default {
    name: "SearchItem"
}
</script>

<style scoped>
.search-doc {
    padding: 12px 0;
    border-bottom: 1px solid #e8eaec;
}

.doc-title-group {
    height: 60px;
    margin-bottom: 16px;
    /*display: flex;*/
    /*flex: 1;*/
    /*align-items: flex-start;*/
    display: block;
}
.doc-pic {
    height: 60px;
    width: 60px;
    float: left;
    line-height: 60px;
    margin: auto;
}
.title-group {
    height: 60px;
    float: left;
    width: calc( 100% - 60px);
}
.doc-title-info {
    height: 36px;
    /*line-height: 36px;*/
    /*margin-bottom: 12px;*/
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 700;
}

.description {
    height: 24px;
    /*line-height: 24px;*/
    display: block;
    color: rgba(0,0,0,.45);
    font-size: 14px;
}

ul {
    margin: 0;
    margin-top: 16px;
}
li {
    padding: 0 20px;
}

</style>