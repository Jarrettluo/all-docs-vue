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

                <Form-item label="文档分类">
                    <Select v-model="formTop.select" placeholder="请选择">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item label="标签选择">
                    <Input v-model="formTop.input2"></Input>
                </Form-item>
                <Form-item label="详情文本">
                    <Input v-model="formTop.input3" type="textarea" :rows="4"></Input>
                </Form-item>
            </Form>
            异常跳过
            <i-switch v-model="switch1" @on-change="change"></i-switch>

            <submit-button
                :src="buttonSrc"
                label="开始上传"
                @click="login"
            ></submit-button>

        </Col>
        <Col span="12">

        </Col>
    </Row>

</template>

<script>

import SubmitButton from '@/components/SubmitButton'


export default {
    name: "UploadDirectory2",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
        }
    },
    components: {
        SubmitButton
    },
    methods: {
        selectFolder(e) {
            // 文件夹下所有文件
            var files = e.target.files;

            // 文件夹名称
            var relativePath = files[0].webkitRelativePath;

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