<template>
    <div class="category-group">
        <div class="category-title" @click="routeToCategory(localCate.id)">
            {{ localCate.name }}
        </div>
        <div class="category-content">
            <ul>
                <li class="document-abstract" v-for="item in localCate.docList" @click="routeToAllDoc(item.id)">
                    <Icon type="ios-folder-open-outline" /> {{ item.name }}
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
    name: "Category",
    data() {
        return {
            localCate: {
                id: null,
                name: null,
                docList: null,
            }
        }
    },
    props: {
        category: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    // computed: {
    //     initData: function () {
    //         // 将对象本地化
    //         return this.localCate = JSON.parse(JSON.stringify(this.category))
    //     }
    // }
    watch: { // 监听到数据然后赋值
        category: {
            // 监听数据发生变化的处理函数
            handler(newV, oldValue) {
                console.log(newV)
                this.localCate = JSON.parse(JSON.stringify(newV));//将监听到修改的值赋予到dataAttrs中
            },
            immediate: true,
            // 是否开启深度监听，由于我们上面props中是一个Object对象，所以需要开启深度监听功能
            deep: true
        }
    },
    methods: {
        routeToCategory(value) {
            if(value == "" || value == undefined) {
                return;
            }
            this.$router.push({
                path:'/admin/category',
                query:{
                    categoryId: value
                }
            })
        },
        routeToAllDoc(value) {
            this.$router.push({
                path:'/admin/allDocuments',
                query:{
                    categoryId: value
                }
            })
        }
    }
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
    /*color: #fff;*/
    background-color: rgba(245, 245, 245, 100);
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