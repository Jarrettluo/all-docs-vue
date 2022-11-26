<template>
    <div class="main-container">
        <div class="upload-title">
            <span>上传文档</span>
        </div>
        <Row>
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="12">
                <div class="upload-panel">
                    <Upload
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 30px 0;">
                            <div style="padding: 5px; line-height: 45px;">
                                <img :src="buttonSrc" width="68px" height="68px"/>
                            </div>
                            <!--                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>-->
                            <p>支持Word/Excel/PPT/PDF，不超过100M</p>
                        </div>
                    </Upload>

                </div>
            </Col>
        </Row>

        <Row style="padding: 5px 0; margin-top: 30px;">
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="20">
                <div class="search-input-top">
                    <input :placeholder="placeholder" v-model="searchValue"
                           @keyup.enter="clickToSearch(searchValue)"></input>
                </div>
            </Col>
        </Row>
        <Row style="padding: 5px 0;">
            <Col span="1" class="star-tag">
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
        <Row style="padding: 5px 0;">
            <Col span="1" class="star-tag">
                <span>*</span>
            </Col>
            <Col span="20" class="description-area">

                <Input v-model="value1" maxlength="140" type="textarea" placeholder="Enter something..."
                       :autosize="{minRows: 2,maxRows: 5}"/>
            </Col>
        </Row>

        <Row style="margin-top: 30px;">
            <Col span="1" class="star-tag">

            </Col>
            <Col>
                <div class="upload-button" style="width: 180px; height: 45px; border: 2px solid #000;
                                    background: #FFF7D6;
box-shadow: 0px 0px 10px 0px rgba(129,100,0,0.3);
border-radius: 8px;
display: flex;
justify-content: center;
"
                     @click="selected(uploadRoute)"
                >
                    <div style="padding: 5px; line-height: 45px;">
                        <img :src="buttonSrc" width="24px" height="28px"/>
                    </div>
                    <span
                        style="line-height: 45px; color: #000; font-size: 16px; font-weight: 600;"

                    >
                                            点我上传文档</span>

                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: "DocUpload",
    data() {
        return {
            placeholder: "输入一些内容",
            buttonSrc: require("@/assets/source/folder.png"),
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
        font-family: PingFangSC-Medium, PingFang SC;
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

        &:hover {
            //background-color: #f1f2f3;
            border: 2px dashed #000000;
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
        padding: 0 10px;
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


</style>