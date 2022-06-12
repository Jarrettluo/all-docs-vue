<template>
    <div>
        <div style="background-color: red; ">
            <Nav></Nav>
        </div>
        <div class="doc-group" style="display: inline-block">
            <SearchItem></SearchItem>
<!--            <DocItem></DocItem>-->
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from "@/components/Nav";
import SearchItem from "@/views/searchResult/SearchItem";
import DocItem from "@/views/searchResult/DocItem";
import Footer from "@/components/MyFooter";
export default {
    name: "Index.vue",
    components: {
        Nav, Footer, DocItem, SearchItem
    }
}
</script>

<style scoped>
.doc-group {
    width: 1200px;
    /*position: absolute;*/
    margin-top: 50px;
    margin: auto;
    /*background-color: #dcdee2;*/
    background-color: rgba(245, 245, 245, 100);
    color: rgba(16, 16, 16, 100);
    text-align: left;
    padding-left: 12px;
}
</style>