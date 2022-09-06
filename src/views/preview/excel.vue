<template>
    <div class="word-wrap">
        <div v-if="xlsFile" class="excel-view-container">
            <!-- Excel使用tab选项卡来模拟表格里的sheet业 -->
            <Tabs type="card" v-if="sheetNames && sheetNames.length" @tab-click="handleClick">
                <TabPane :label="item" v-for="(item, index) in sheetNames" :key="index">
                    <div class="excelView" v-html="excelView"></div>
                    <div id="excelView"></div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>

// docx文档预览(只能转换.docx文档，转换过程中复杂样式被忽，居中、首行缩进等)
import mammoth from "mammoth";
import axios from 'axios'

export default {
    name: "ExcelView",
    data() {
        return {
            wordText: "",
            wordURL: 'vue-mobile/media/word.docx', //文件地址
            excelView: '', //表格转换后的html数据
            xlsFile: false, //是否是Excel文件
            execlArraybufferData: null, //Excelblob转换为arraybuff数据
            sheetNames: null, //从数据中获取到的sheet页数组
        };
    },
    created() {
        // this.getWordText();
        this.init()
    },
    methods: {
        init() {

            let docId = this.$route.query.docId;

            let wordURL = 'http://81.69.247.172:8082/files/view/' + docId

            axios({
                method: 'get',
                responseType: 'blob', // 设置响应文件格式
                data: {},
                url: wordURL,
            }).then( res => {
                console.log(res)
                // 表格类型的用xlsx插件
                this.xlsFile = true
                let XLSX = require("xlsx")
                this.XLSX = XLSX
                this.execlType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                let blob = new Blob([res], {type: this.execlType})
                let reader = new FileReader()
                reader.readAsArrayBuffer(blob) // blob类型转换为ArrayBuffer类型
                this.tabChange(0, reader)
                }
            )

        },
        handleClick(data) {
            this.tabChange(data.index)
        },
        tabChange(index, reader) {
            this.excelView = ''
            let XLSX = this.XLSX
            let _this = this

            // 如果第一次进来
            if (!this.sheetNames) {
                // 文件转换加载完成后
                reader.onload = function() {
                    let arraybufferData = this.result
                    this.execlArraybufferData = arraybufferData
                    let data = new Uint8Array(arraybufferData) // es2017的方法
                    let workbook = XLSX.read(data, { type: "array" })  // 得到表格的array数据
                    console.log(workbook)
                    _this.workbooks = workbook  // 赋值到此组件最外面，一会要用
                    let sheetNames = workbook.SheetNames; // 得到execl工作表名称集合，结果类似这样['sheet1','sheet2']
                    _this.sheetNames = sheetNames  // 赋值到此组件最外面，一会要用
                    let worksheet = workbook.Sheets[sheetNames[index]]  // 获取第几个工作表0就是'sheet1'，以此类推
                    _this['excelView'] = XLSX.utils.sheet_to_html(worksheet) // 把表格的array数据转换成html数据
                    _this.$nextTick(function () {
                        // DOM加载完毕后执行，解决HTMLConnection有内容但是length为0问题。
                        _this.setStyle4ExcelHtml();
                    })
                }
            } else {
                // 已经有数据了的时候直接获取对应sheet里的内容
                let worksheet = this.workbooks.Sheets[this.sheetNames[index]];
                this['excelView'] = XLSX.utils.sheet_to_html(worksheet)
            }
        },
        // 设置Excel转成HTML后的样式
        setStyle4ExcelHtml() {
            const excelViewDOM = document.getElementById("excelView");
            if (excelViewDOM) {
                const excelViewTDNodes = excelViewDOM.getElementsByTagName("td"); // 获取的是HTMLConnection
                if (excelViewTDNodes) {
                    const excelViewTDArr = Array.prototype.slice.call(excelViewTDNodes);
                    for (const i in excelViewTDArr) {
                        const id = excelViewTDArr[i].id; // 默认生成的id格式为sjs-A1、sjs-A2......
                        if (id) {
                            const idNum = id.replace(/[^0-9]/gi, ""); // 提取id中的数字，即行号
                            if (idNum && (idNum === "1" || idNum === 1)) {
                                // 第一行标题行
                                excelViewTDArr[i].classList.add("class4Title");
                            }
                            if (idNum && (idNum === "2" || idNum === 2)) {
                                // 第二行表头行
                                excelViewTDArr[i].classList.add("class4TableTh");
                            }
                        }
                    }
                }
            }
        },
        getWordText() {
            const xhr = new XMLHttpRequest();
            let docId = this.$route.query.docId;

            this.wordURL = 'http://81.69.247.172:8082/files/view/' + docId

            xhr.open("get", this.wordURL, true);
            // xhr.responseType = "arraybuffer";
            // xhr.onload = () => {
            //     if (xhr.status == 200) {
            //         console.log(xhr)
            //         mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then((resultObject) => {
            //             this.$nextTick(() => {
            //                 this.wordText = resultObject.value;
            //             });
            //         });
            //     }
            // };

            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
                if (xhr.status == 200) {
                    console.log(xhr)
                    mammoth.convertToHtml({ arrayBuffer: xhr.response }).then((resultObject) => {
                        this.$nextTick(() => {
                            this.wordText = resultObject.value;
                        });
                    });
                }
            };
            xhr.send();
        }
    }
}
</script>

<style lang="scss" scoped>
.word-wrap {
    padding: 15px;
    img {
        width: 100%;
    }
}
</style>