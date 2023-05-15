<template>
    <div class="home_wrap">
        <div style="height: calc(100% - 20px);position: relative">
            <img :src=" thumbId | imgSrc " alt="thumb"
                 style="max-width: 100%;height: calc(100%);border: 1px solid #dcdee2; border-radius: 2px"
                 @mouseenter="enter" @mouseleave="leave"
            >
        </div>
    </div>
</template>

<script>
import {BackendUrl} from '@/api/request'

let PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
export default {
    data() {
        return {
            pdf_scale: 1.5,//pdf放大系数
            pdf_pages: [],
            pdf_div_width: '',
            pdf_src: null,
            loading: false,

            view_flag: true,

            docId: this.$route.query.docId,
            seen: false,
        }
    },
    mounted() {
        // this.get_pdfurl()
    },
    props: ["thumbId"],
    filters: {
        imgSrc(value) {
            if (value === "" || value == null) {
                return require('@/assets/source/doc.png');
            } else {
                return BackendUrl() + "/files/image2/" + value;
            }
        }
    },
    methods: {
        enter() {
            this.seen = true;
        },
        leave() {
            this.seen = false;
        },
        scaleD() {  //放大
            let max = 0
            if (window.screen.width > 1440) {
                max = 1.4
            } else {
                max = 1.2
            }
            if (this.pdf_scale >= max) {
                return
            }
            this.pdf_scale = this.pdf_scale + 0.1
            this._loadFile(this.pdf_src)
        },
        scaleX() {  //缩小
            let min = 1.0
            if (this.pdf_scale <= min) {
                return
            }
            this.pdf_scale = this.pdf_scale - 0.1
            this._loadFile(this.pdf_src)
        },
        get_pdfurl() {
            //获得pdf教案
            this.loading = true
            let docId = this.docId

            //加载本地
            this.pdf_src = BackendUrl() + '/files/view/' + docId
            this._loadFile(this.pdf_src)
        },
        _loadFile(url) {
            //初始化pdf
            let loadingTask = PDFJS.getDocument(url)
            loadingTask.promise
                .then((pdf) => {
                    this.pdfDoc = pdf
                    // pdf的总页数ß
                    this.pdf_pages = this.pdfDoc.numPages
                    //debugger
                    this.$nextTick(() => {
                        this._renderPage(1)
                    })
                    this.view_flag = false
                })
        },
        _renderPage(num) {
            //渲染pdf页
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
                    // 可通过Scale来调节初始的缩放比
                    let viewport = page.getViewport({scale: this.pdf_scale})

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
                    page.render(renderContext).promise.then(() => {
                    })
                    if (this.pdf_pages > num) {
                        this._renderPage(num + 1)
                    }
                })
        },
    }
}
</script>
<style lang="scss" scoped>
.home_wrap {
    //width: 100%;
    width: 1200px;
    height: 100%;

    background-color: #757575;
    padding-top: 20px;

    .pdf_down {
        position: fixed;
        display: flex;
        z-index: 20;
        right: 26px;
        bottom: 7%;

        .pdf_set_left {
            width: 30px;
            height: 40px;
            color: #408FFF;
            font-size: 11px;
            padding-top: 25px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }

        .pdf_set_middle {
            width: 30px;
            height: 40px;
            color: #408FFF;
            font-size: 11px;
            padding-top: 25px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }
    }
}

/* 旋转效果 */
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 遮罩 */
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .8);
}
</style>