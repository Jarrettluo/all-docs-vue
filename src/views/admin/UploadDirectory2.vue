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
                </Form-item>
            </Form>
            <attr-input
                ref="paramForm"
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
            selectedFiles: []
        }
    },
    components: {
        AttrInput
    },
    methods: {
        selectFolder(e) {
            // 文件夹下所有文件
            let files = e.target.files;
        },
        async startUpload(e) {
            // 下面的代码将创建一个空的FormData对象:
            const formData = new FormData()
            formData.append("files", this.selectedFiles)
            // 添加自定义参数，不传可删除
            formData.append('category', this.$refs['paramForm'].getCategory())
            formData.append('tags', this.$refs['paramForm'].getSelectedTags())
            formData.append('skipError', this.$refs['paramForm'].getSkipError())
            formData.append('description', this.$refs['paramForm'].getDesc())

            await DocRequest.docUploadBatch(formData, null).then(res => {
                if (res.code === 200) {
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("上传出错：" + res.message)
                }
            }).catch(err => {
                this.$Message.error("上传出错！")
            })
            this.selectedFiles = []
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

    &:hover {
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
        opacity: 0; /*关键点*/
        filter: alpha(opacity=0); /*兼容ie*/
        font-size: 100px; /* 增大不同浏览器的可点击区域 */
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