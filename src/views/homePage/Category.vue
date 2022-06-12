<template>
    <div class="category-group">
        <div class="category-title">
            这是文章的标题
        </div>
        <div class="category-content">
            <ul>
                <li class="document-abstract">
                    <Icon type="ios-folder-open-outline" /> fsdjflsjfldj
                </li>
                <li class="document-abstract">
                    <Icon type="ios-folder-open-outline" /> fsdjflsjfldj这是一个文档的名字哇
                </li>
                <li class="document-abstract">
                    <Icon type="ios-folder-open-outline" /> fsdjflsjfldj
                </li>
                <li class="document-abstract">
                    <Icon type="ios-folder-open-outline" /> fsdjflsjfldj
                </li>
            </ul>
        </div>
        <div class="more-info">
            <div class="more-info-button">
                更多
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category"
}
</script>

<style scoped>
.category-group {
    border-radius: 5px;
    background-color: #ffffff;
    font-size: 12px;
    width: 280px;
}
.category-title {
    line-height: 36px;
    height: 36px;
    text-align: left;
    padding: 0px 10px;
    font-size: 16px;
    border-bottom: 1px solid #dcdee2;
    color: #f1db77;
    font-weight: 700;
}

.category-title {
    cursor: pointer;
}

.category-content {
    padding: 6px 4px;
    text-align: left;
    height: 161px;
    font-size: 12px;
}
ul,li {
    list-style: none;
    padding: 0px;
    margin: 0px;
}

.document-abstract {
    line-height: 36px;
    padding: 0 6px;
}

.document-abstract:hover {
    cursor: pointer;
    color: #fff;
    background-color: #dcdee2;
    border-radius: 4px;
}

.more-info {
    height: 32px;
    /*line-height: 32px;*/
    padding: 0px 10px;
}
.more-info-button {
    border: 1px solid #dcdee2;
    border-radius: 24px;
    width: fit-content;
    padding: 4px 16px;
    font-size: 12px;
}
.more-info-button:hover {
    background-color: #f1db77;
    color: #fff;
    border-color: #f1db77;
    cursor: pointer;
    display: block;

}

</style>