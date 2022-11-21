<template>
    <div class="doc-group">
        <div class="doc-thumb-group">
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
            <DocThumb class="doc-thumb"
                      :flag="false"
                      title="bitcoin_zh_cn.pdf"
                      docId="6377a4a1bc23bd4dad364d9a"
                      @click.native="getDocView(doc.id)"
            ></DocThumb>
        </div>
        <div class="doc-group-page">
            <Page :total="100"/>
        </div>
    </div>
</template>

<script>
import DocThumb from '@/home/DocThumb'
export default {
    name: "FilterListPage",
    components: {
        DocThumb
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
        height: calc(100% - 100px);
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;
        /*子元素之间取消空白间隙，并把项目放在容器顶部。*/
        .doc-thumb {
            margin-right: 34px;
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