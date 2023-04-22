<template>
    <Row>
        <Col span="12">
            <br>
            <Form :model="formTop" label-position="top">
                <Form-item label="文档选择">
                    <div class="fileUpload">
                        <a href="javascript:;" class="file">选择文件夹
                            <input type="file" name="" id="file2" onchange="selectFolder" webkitdirectory>
                        </a>
                    </div>
                    <div class="file-container">
                        这里是选中的文件夹名称！
                    </div>
<!--                    <input type="file" onchange="selectFolder" webkitdirectory></input>-->
                </Form-item>
            </Form>
            <attr-input
                @startUpload="startUpload"
            ></attr-input>
        </Col>
        <Col span="12">

        </Col>
    </Row>

</template>

<script>

import AttrInput from '@/components/Form/AttrInput'
import DocRequest from '@/api/document'

export default {
    name: "UploadDirectory2",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
        }
    },
    components: {
        AttrInput
    },
    methods: {
        startUpload(value) {
            this.$Message.info(value)
        },
        async selectFolder(e) {
            // 文件夹下所有文件
            var files = e.target.files;

            console.log(files)

            // 文件夹名称
            var relativePath = files[0].webkitRelativePath;


            //判断是否有文件再上传
            if (this.fileList.length === 0) {
                return this.$Message.warning('请选取文件后再上传')
            }
            // 下面的代码将创建一个空的FormData对象:
            const formData = new FormData()
            // 你可以使用FormData.append来添加键/值对到表单里面；
            this.fileList.forEach((file) => {
                formData.append('file', file.raw)
            })
            // 添加自定义参数，不传可删除
            formData.append('parentId', '49')
            formData.append('uploadType', '备料单')
            formData.append('versions', 'v4.0')


            await DocRequest.docUpload(formData, null).then(res => {
                if (res.code === 200) {
                    // this.uploadProcess = 1;
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("上传出错：" + res.message)
                    // this.uploadProcess = 0.00
                }

                setTimeout(() => {
                    this.processFlag = false;
                    this.filename = ''
                }, 1000)
            }).catch(err => {
                this.$Message.error("上传出错！")
                // this.processFlag = false
                // this.uploadProcess = 0.0
            })

        }
    }

}
</script>

<style scoped lang="scss">
.fileUpload {
    width: 120px;
    line-height: 32px;
    background-color: #ffcc4f;
    border-radius: 8px;
    border: 1px #f5bb3a solid;
    text-align: center;
    color: #fffeff;
    &:hover{
        cursor: pointer;
    }
    a {
        color: #fffeff;
        width: 120px;
    }
    .file input {
        //width: 120px;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;/*关键点*/
        filter: alpha(opacity=0);/*兼容ie*/
        font-size: 100px;/* 增大不同浏览器的可点击区域 */
        cursor: pointer;
    }
}

.file-container {
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    padding: 5px 10px 5px 0;
    font-size: 10px;
}
</style>