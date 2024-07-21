<template>
    <div class="home_wrap">
        <div v-show="view_flag" style="padding: 400px; color: #ffcc4f;">
            <div class="demo-spin-icon-load">
                <Icon type="md-refresh" style="font-size: 48px;"/>
            </div>
            <div style='font-size:16px'>加载中...</div>
        </div>
        <div v-html="markdownToHtml" style="text-align: left; padding: 20px"></div>
    </div>
</template>

<script>
import {marked} from 'marked';
import StatisticSourceUrl from "@/api/staticSourceUrl"

export default {
    name: 'mdView',
    data(){
        return {
            markdown:  "# Hello World",
            loading: false,
            view_flag: true,
            docId: this.$route.query.docId,
        };
    },
    computed: {
        markdownToHtml(){
            this.loading = true
            this.pdf_src = StatisticSourceUrl.docPreviewUrl(this.docId);
            this.view_flag = false
            this.markdown = this.readTestFile(this.pdf_src)
            let html = marked(this.markdown);
            // 替换异常图片
            html = html.replaceAll("<img", "<img onerror=\"this.classList.add('error');\"");
            return html;

        }
    },
    methods: {
        // 读取test.properties
        readTestFile(url) {
            const file = this.loadFile(url)
            return this.unicodeToUtf8(file)
        },
        // 读取文件
        loadFile(name) {
            const xhr = new XMLHttpRequest()
            const okStatus = document.location.protocol === 'file:' ? 0 : 200
            xhr.open('GET', name, false)
            xhr.overrideMimeType('text/html;charset=utf-8')
            // 默认为utf-8
            xhr.send(null)
            return xhr.status === okStatus ? xhr.responseText : null
        },
        // unicode转utf-8
        unicodeToUtf8(data) {
            data = data.replace(/\\/g, '%')
            return unescape(data)}
    }
}
</script>

<style lang="scss">

.home_wrap {
    //width: 100%;
    width: 1200px;
    //height: 100%;
    height: 900px;
}
</style>

<!--由于采用了v-html所以采用这种方式进行样式渲染-->
<style scoped>

>>> h1 {
    line-height: 72px;
    text-align: center;
}

>>> pre {
    background: #2d2d2d;
    color: rgb(201,209,217);
    font-family: Consolas;
    text-align: left;
    padding: 1em;
    padding-left: 0.8em;
    margin: 1em;
    border-radius: 5px;
    counter-reset: line;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
}

>>> p {
    line-height: 3;
}

>>> ul {
    list-style-type: circle;
    padding: 20px;
}
>>> ol {
    float: left;
}

>>> img.error {
    display: inline-block;
    transform: scale(1);
    content: '';
    color: transparent;
    width: 200px;
    height: 100px;
}

/*// 图片显示错误： 显示缺省图片*/
>>> img.error::before {
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 100%;
        height: 100%;
        background: #f5f5f5 url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M304.128 456.192c48.64 0 88.064-39.424 88.064-88.064s-39.424-88.064-88.064-88.064-88.064 39.424-88.064 88.064 39.424 88.064 88.064 88.064zm0-116.224c15.36 0 28.16 12.288 28.16 28.16s-12.288 28.16-28.16 28.16-28.16-12.288-28.16-28.16 12.288-28.16 28.16-28.16z' fill='%23e6e6e6'/%3E%3Cpath d='M887.296 159.744H136.704C96.768 159.744 64 192 64 232.448v559.104c0 39.936 32.256 72.704 72.704 72.704h198.144L500.224 688.64l-36.352-222.72 162.304-130.56-61.44 143.872 92.672 214.016-105.472 171.008h335.36C927.232 864.256 960 832 960 791.552V232.448c0-39.936-32.256-72.704-72.704-72.704zm-138.752 71.68v.512H857.6c16.384 0 30.208 13.312 30.208 30.208v399.872L673.28 408.064l75.264-176.64zM304.64 792.064H165.888c-16.384 0-30.208-13.312-30.208-30.208v-9.728l138.752-164.352 104.96 124.416-74.752 79.872zm81.92-355.84l37.376 228.864-.512.512-142.848-169.984c-3.072-3.584-9.216-3.584-12.288 0L135.68 652.8V262.144c0-16.384 13.312-30.208 30.208-30.208h474.624L386.56 436.224zm501.248 325.632c0 16.896-13.312 30.208-29.696 30.208H680.96l57.344-93.184-87.552-202.24 7.168-7.68 229.888 272.896z' fill='%23e6e6e6'/%3E%3C/svg%3E")
        no-repeat center / 50% 50%;
}

/*// 图片显示错误： 显示缺省文字提示，这里attr()可以显示当前标签内的所有属性，支持自定义属性*/
>>> img.error::after {
        content: attr(alt);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        line-height: 2;
        background-color: rgba(0,0,0,.5);
        color: white;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

>>> table
{
    border-collapse: collapse;
    margin: auto;
    text-align: center;
    width: 100%;
    margin: 20px 0px;
}
>>> table td, table th
{
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
}
>>> table thead th
{
    background-color: #CCE8EB;
    width: 100px;
}
>>> table tr:nth-child(odd)
{
    background: #fff;
}
>>> table tr:nth-child(even)
{
    background: #F5FAFA;
}

</style>