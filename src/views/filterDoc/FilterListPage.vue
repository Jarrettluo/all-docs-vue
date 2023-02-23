<template>
    <div class="doc-group">
        <div class="doc-thumb-group">
            <DocThumb class="doc-thumb"
                      v-for="item in data"
                      :flag="false"
                      :title="item.name"
                      :docId="item.thumbId"
                      @click.native="getDocView(item.id)"
            ></DocThumb>
        </div>
        <div class="doc-group-page">
            <Page
                :page-size="pageSize"
                :current="pageNum"
                :total="total"
                @on-change="pageChange"
            />
        </div>
    </div>
</template>

<script>
import DocThumb from '@/home/DocThumb'
export default {
    name: "FilterListPage",
    components: {
        DocThumb
    },
    props: {
        data: {type: Array, requires: true, default: []},
        total: {type: Number, requires: false, default: 1},
        pageNum: {type: Number, requires: false, default: 1},
        pageSize: {type: Number, requires: false, default: 20}
    },
    methods: {
        pageChange(page) {
            this.$emit("on-page-change", page)
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

<style scoped lang="scss">
.doc-group {
    width: 100%;
    height: 660px;
    position: relative;

    .doc-thumb-group {
        width: 100%;
        height: calc(100% - 60px);
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;
        /*子元素之间取消空白间隙，并把项目放在容器顶部。*/
        .doc-thumb {
            margin-right: 30px;
        }
    }

    .doc-group-page {
        padding: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>