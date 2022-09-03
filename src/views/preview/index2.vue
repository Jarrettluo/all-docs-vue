<template>
    <div class="home_wrap">
        <div v-show="view_flag" style="padding: 400px; color: #ffcc4f;">
            <div class="demo-spin-icon-load" >
                <Icon type="md-refresh" style="font-size: 48px;"/>
            </div>
            <div style='font-size:16px' >加载中...</div>
        </div>


        <div class="pdf_down" >
            <div class="pdf_set_left"  @click="scaleD()">放大</div>
            <div class="pdf_set_middle" @click="scaleX()">缩小</div>
        </div>


        <div :style="{width:pdf_div_width,margin:'0 auto', height: '500'}" >
            <canvas v-for="page in pdf_pages" :id="'the_canvas'+page" :key="page"></canvas>
        </div>
    </div>
</template>

<script>
let PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
export default {
    data(){
        return{
            pdf_scale:1.5,//pdf放大系数
            pdf_pages:[],
            pdf_div_width:'',
            pdf_src:null,
            loading: false,

            view_flag: true,

            docId: this.$route.query.docId,
        }
    },
    mounted(){
        this.get_pdfurl()
    },

    methods:{
        scaleD() {  //放大
            let max = 0
            if (window.screen.width > 1440) {
                max = 1.4
            }else{
                max = 1.2
            }
            if(this.pdf_scale >= max){
                return
            }
            this.pdf_scale = this.pdf_scale+0.1
            this._loadFile(this.pdf_src)
        },
        scaleX() {  //缩小
            let min = 1.0
            if(this.pdf_scale <= min){
                return
            }
            this.pdf_scale = this.pdf_scale - 0.1
            this._loadFile(this.pdf_src)
        },
        get_pdfurl(){  //获得pdf教案
            this.loading = true
            let docId = this.docId

            //加载本地
            //  this.pdf_src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
            // this.pdf_src = 'http://81.69.247.172:8082/files/view/62cee7d6ff703f08647e0bbe'
            // this.pdf_src = 'http://81.69.247.172:8082/files/view/62ba6d2c845f9a73b891bdc4'
            // this.pdf_src = 'adminapi/blogs/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/4%E3%80%81%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80%2814%E9%A2%98%29.pdf'
            this.pdf_src = 'http://81.69.247.172:8082/files/view/' + docId
            this._loadFile(this.pdf_src)
            return


            //线上请求
            //  this.$axios.get('')
            //  .then((res)=>{
            //  	this.pdf_src = res.url
            //  	this._loadFile(this.pdf_src)
            //  })
        },
        _loadFile (url) {  //初始化pdf
            let loadingTask = PDFJS.getDocument(url)
            loadingTask.promise
                .then((pdf) => {
                    this.pdfDoc = pdf
                    this.pdf_pages = this.pdfDoc.numPages
                    //debugger
                    this.$nextTick(() => {
                        this._renderPage(1)
                    })
                })
        },
        _renderPage (num) {  //渲染pdf页
            const that = this
            this.pdfDoc.getPage(num)
                .then((page) => {
                    let canvas = document.getElementById('the_canvas' + num)
                    let ctx = canvas.getContext('2d')
                    let dpr = window.devicePixelRatio || 1
                    let bsr = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1
                    let ratio = dpr / bsr
                    let viewport = page.getViewport({ scale: this.pdf_scale })

                    canvas.width = viewport.width * ratio
                    canvas.height = viewport.height * ratio

                    canvas.style.width = viewport.width + 'px'

                    that.pdf_div_width = viewport.width + 'px'

                    canvas.style.height = viewport.height + 'px'

                    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
                    let renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    }
                    page.render(renderContext)
                    if (this.pdf_pages > num) {
                        this._renderPage(num + 1)
                    }
                })

            this.view_flag = false
        },
    }
}
</script>
<style lang="scss" scoped>
.home_wrap{
    //width: 100%;
    width: 1200px;
    //height: 100%;
    height: 900px;
    .pdf_down{
        position:fixed;
        display: flex;
        z-index: 20;
        right:26px;
        bottom:7%;
        .pdf_set_left{
            width: 30px;
            height: 40px;
            color: #408FFF;
            font-size: 11px;
            padding-top:25px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }
        .pdf_set_middle{
            width: 30px;
            height: 40px;
            color: #408FFF;
            font-size: 11px;
            padding-top:25px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }
    }
}

/* 旋转效果 */
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50% { transform: rotate(180deg);}
    to { transform: rotate(360deg);}
}
/* 遮罩 */
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: absolute;
    top:0;
    left: 0;
    z-index: 8;
    width: 100%;
    height:100%;
    background-color: hsla(0,0%,100%,.8);
}
</style>