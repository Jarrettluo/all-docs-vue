<template>
    <div class="main-container">
        <div class="upload-title">
            <span>上传文档</span>
        </div>
        <Row>
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="12" style="text-align: left">
                <div class="upload-panel" @click="uploadDialogShow">
                    <div style="padding: 30px 0;">
                        <div style="padding: 5px; line-height: 45px;">
                            <img :src="buttonSrc" width="68px" height="68px" alt="upload-pic"/>
                        </div>
                        <p>支持Word/Excel/PPT/PDF，不超过100M</p>
                    </div>
                    <input type="file" ref="fileToUpload" id="fileToUpload" style="display: none"
                           @change="changeFile">
                </div>
            </Col>
        </Row>
        <Row v-show="false">
            <Col span="1" class="star-tag">
            </Col>
            <Col span="20" style="text-align: left">
                <div class="file-title">
                    <span>{{ filename }}</span>
                </div>
                <div class="progress-wrapper" v-if="processFlag">
                    <div class="pro" :style="uploadProcess | processToStr"></div>
                </div>
            </Col>
        </Row>

        <Row style="padding: 5px 0; margin-top: 8px;" v-show="false">
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="20">
                <div class="search-input-top">
                    <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">标签{{
                            item + 1
                        }}
                    </Tag>
                    <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>

                </div>
            </Col>
        </Row>
        <Row style="padding: 5px 0;" v-show="false">
            <Col span="1" class="star-tag" >
                <span>*</span>
            </Col>
            <Col span="6">
                <div class="cate-dropdown">
                    <Dropdown @on-click="switchCategory">
                        <a href="javascript:void(0)">
                            切换分类
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <template #list>
                            <DropdownMenu>
                                <DropdownItem
                                    v-for="item in categoryOption"
                                    :name="item.id"
                                >
                                    {{ item.seeName }}
                                </DropdownItem>
                            </DropdownMenu>
                        </template>
                    </Dropdown>
                </div>
            </Col>
        </Row>
        <Row style="padding: 5px 0;" v-show="false">
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="20" class="description-area">

                <Input v-model="value1" maxlength="140" type="textarea" placeholder="请输入文档的描述信息"
                       :autosize="{minRows: 2,maxRows: 5}"/>
            </Col>
        </Row>

        <Row style="margin-top: 30px;">
            <Col span="1" class="star-tag">

            </Col>
            <Col>
                <div class="upload-button" style="width: 180px; height: 45px; border: 2px solid #000;
                    background: #FFF7D6;
                    box-shadow: 0 0 10px 0 rgba(129,100,0,0.3);
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    "
                     @click="uploadFile"
                >
                    <div style="padding: 5px; line-height: 45px;">
                        <img :src="buttonSrc" width="24px" height="28px" alt="pic"/>
                    </div>
                    <span
                        style="line-height: 45px; color: #000; font-size: 16px; font-weight: 600;"
                    >点我上传文档</span>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import {BackendUrl} from '@/api/request'

import axios from "axios";

export default {
    name: "DocUpload",
    data() {
        return {
            placeholder: "输入一些内容",
            buttonSrc: require("@/assets/source/folder.png"),
            actionUrl: BackendUrl() + "/files/upload",
            filename: '',
            uploadProcess: 0.00,
            count: [0, ],
            processFlag: false,
            uploadParam: {}
        }

    },
    filters: {
        processToStr(uploadProcess) {
            let width = "" + uploadProcess * 100 + "%";
            return {'width': width}
        }
    },
    methods: {
        uploadDialogShow() {
            this.$refs.fileToUpload.dispatchEvent(new MouseEvent("click"));
        },
        changeFile() {
            const inputFile = this.$refs.fileToUpload.files[0];
            let filename = inputFile.name;
            // 此处应向后台请求 后台保存上传文件名称返回fileId作为文件标识
            this.uploadParam = {
                fileId: filename,
                file: inputFile
            };
            this.filename = filename
            this.processFlag = true
            this.uploadProcess = 0
        },
        // 最后上传
        uploadFile() {
            let param = this.uploadParam

            if (param === {} || param.file === undefined || param.fileId === undefined) {
                return;
            }
            let formData = new FormData();
            formData.set("fileName", param.fileId);
            formData.set("file", param.file);
            const config = {
                onUploadProgress: (progressEvent) => {
                    // progressEvent.loaded:已上传文件大小
                    // progressEvent.total:被上传文件的总大小
                    this.uploadProcess = Number(
                        ((progressEvent.loaded / progressEvent.total) * 0.9).toFixed(2)
                    );
                },
            };
            this.progressFlag = true;
            axios.post(this.actionUrl, formData, config).then(res => {
                let {data}  = res
                if (data['code'] === 200 || data['code'] === 'success') {
                    this.uploadProcess = 1;
                    this.$Message.success("成功！")
                } else {
                    this.$Message.error("出错：" + data['message'])
                    this.uploadProcess = 0.00
                }

                setTimeout(() => {
                    this.processFlag = false;
                    this.filename = ''
                }, 1000)
            }).catch(err => {
                this.$Message.error("上传出错！")
                this.processFlag = false
                this.uploadProcess = 0.0
            })
            // 无论是否成功都过滤掉
            this.uploadParam = {}
        },

        handleAdd() {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        handleClose2(event, name) {
            const index = this.count.indexOf(name);
            this.count.splice(index, 1);
        }
    }
}
</script>

<style scoped lang="scss">

.main-container {
    padding: 30px;

    .upload-title {
        width: 96px;
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC, serif;
        font-weight: 500;
        color: #000000;
        line-height: 33px;

        margin-bottom: 30px;
    }

    .upload-panel {
        width: 300px;
        height: 190px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 2px solid #000000;
        padding: 4px 0;
        position: relative;
        overflow: hidden;
        display: inline-block;
        text-align: center;

        &:hover {
            cursor: pointer;
            border: 2px dashed #000000;
        }

    }

    .file-title {
        width: 100%;
        min-height: 21px;
        font-size: 14px;

        &:hover {
            cursor: pointer;
            background-color: #FFFAE4;
        }

    }

    .progress-wrapper {
        width: 100%;
        height: 3px;
        //position: relative;
        background-color: #eeeeee;
        position: absolute;

        .pro {
            width: 40%;
            height: 100%;
            background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
            background-color: #00B83F;
            background-size: 40px 40px;
            animation: progressbar 2s linear infinite;
        }

        @keyframes progressbar {
            0% {
                background-position: 40px 0
            }
            100% {
                background-position: 0 0
            }
        }
    }

    .cate-dropdown {
        text-align: center;
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #000000;
        //margin-left: 10px;

        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC, serif;
        font-weight: 500;
        color: #000000;
        line-height: 45px;
    }

    .search-input-top {

        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #000000;
        padding: 8px;
        //margin: 10px 0;

        display: flex;
        justify-content: flex-start;
        align-content: center;

        input {
            height: 43px;
            width: 100%;
            text-decoration: none;
            outline: none;
            border: none;
        }
    }

    .description-area {
        /deep/ .ivu-input {
            border: 1px solid #000000;
        }
    }

    .star-tag {
        padding-right: 10px;
        text-align: right;
        color: red;
    }
}

/deep/ .ivu-upload-drag {
    border: none;
}

.upload-button {
    &:hover {
        cursor: pointer;
        padding: 1px 0 0 1px;
    }
}


</style>