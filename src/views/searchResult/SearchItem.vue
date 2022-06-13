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
                    <div class="description-item">
                        2021年1月30日
                    </div>
                    <div class="description-item">
                        罗佳瑞
                    </div>
                    <div class="description-item">
                        我的共享
                    </div>
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
    width: 120px;
    line-height: 24px;
    padding-top: 2px;
    float: left;
}
ul {
    margin: 0;
    margin-top: 16px;
}
li {
    padding: 0 20px;
}

</style>