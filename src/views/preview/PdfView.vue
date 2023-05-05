<template>
    <div class="maintainer">
        <iframe :src="pdf_src" frameborder="0" height='100%' scrolling='no' width='100%'></iframe>
<!--        <div class="header">-->
<!--            <div class="close-button">-->
<!--                <Icon type="close-round"></Icon>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>

import {BackendUrl} from '@/api/request'

export default {
    name: "PdfView",
    data() {
        return {
            docId: this.$route.query.docId,
            pdf_src: "http://81.69.247.172:8082/api/v1.0/files/view/6454aa3f247c561c41488f82",
        }
    },
    mounted() {
        this.get_pdfurl()
    },
    methods: {
        get_pdfurl() {
            //获得pdf教案
            this.loading = true
            let docId = this.docId

            //加载本地
            this.pdf_src = BackendUrl() + '/files/view/' + docId

            console.log(this.pdf_src)
        },
    }
}
</script>

<style scoped lang="scss">
.maintainer {
    width: 100%;
    height: 100vh;

    padding: 0;
    margin: 0;

    .header {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 80px;
        //background-color: #eeeeee;
        text-align: center;
        //opacity:0.2;

        //&:before{
        //    content: '';
        //    //width: 300px;
        //    //height: 400px;
        //    background: inherit;
        //    position: absolute;
        //    left: -25px;  //giving minus -25px left position
        //    right: 0;
        //    top: -25px;   //giving minus -25px top position
        //    bottom: 0;
        //    box-shadow: inset 0 0 0 200px rgba(255,255,255,0.3);
        //    filter: blur(10px);
        //}
        .close-button {
            background-color: #eeeeee;
            opacity: 0.1;
            border-radius: 80px;
            width: 80px;
            height: 80px;
            margin: auto;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>