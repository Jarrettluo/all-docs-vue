<!--AvatarUploader-->
<template>
    <div class="AvatarUploader">
        <div>
            <div class="image">
                <div class="mask">
                    <tooltip effect="dark" content="更换头像" placement="top">
                        <Icon type="md-sync" style="cursor: pointer"
                              @click="openEditAvatarDialog()"/>
                    </tooltip>
                    <tooltip effect="dark" content="删除头像" placement="top">
                        <Icon type="md-trash" style="cursor: pointer"
                              @click="deleteAvatar"/>
                    </tooltip>
                </div>
            </div>
        </div>

        <!-- 修改头像窗口 -->
        <Modal
            title="修改头像"
            v-model="isVisible_editAvatarDialog"
            width="800"
        >
            <Row>
                <Col :span="12" style="height: 300px">
                    <vue-cropper
                        ref="cropper"
                        :img="options.img"
                        :info="true"
                        :autoCrop="options.autoCrop"
                        :autoCropWidth="options.autoCropWidth"
                        :autoCropHeight="options.autoCropHeight"
                        :fixedBox="options.fixedBox"
                        @realTime="realTime"
                    >
                    </vue-cropper>
                    <div style="display: flex; justify-content: space-between; padding-top: 20px; ">
                        <Upload
                            ref="uploadCropper"
                            :before-upload="beforeAvatarUpload"
                            :show-file-list="false"
                            action
                            style="margin-right: 10px"
                        >
                            <Button type="primary">选择图片</Button>
                        </Upload>
                        <tooltip
                            class="item"
                            effect="dark"
                            content="向左旋转"
                            placement="top"
                        >
                            <Button @click="rotateLeft">
                                <Icon type="md-refresh" style="transform: rotateY(180deg);"/>
                            </Button>
                        </tooltip>
                        <tooltip
                            class="item"
                            effect="dark"
                            content="向右旋转"
                            placement="top"
                        >
                            <Button @click="rotateRight">
                                <Icon type="md-refresh"/>
                            </Button>
                        </tooltip>
                        <tooltip
                            class="item"
                            effect="dark"
                            content="放大"
                            placement="top"
                        >
                            <Button @click="changeScale(1)">
                                <Icon type="md-add"/>
                            </Button>
                        </tooltip>
                        <tooltip
                            class="item"
                            effect="dark"
                            content="缩小"
                            placement="top"
                        >
                            <Button @click="changeScale(-1)">
                                <Icon type="md-remove"/>
                            </Button>
                        </tooltip>
                    </div>
                </Col>
                <Col :span="12" style="height: 300px">
                    <div class="upload-preview">
                        <img
                            :src="previews.url"
                            :style="previews.img"
                            v-show="previews.url"
                            alt="img"
                        />
                    </div>
                </Col>
            </Row>
            <div style="width: 100%; height: 60px;">
            </div>
            <span slot="footer" class="dialog-footer">
                <Button @click="isVisible_editAvatarDialog = false">关 闭</Button>
                <Button
                    type="primary"
                    :loading="loading"
                    @click="submitUpdate"
                >确  认</Button>
            </span>
        </Modal>
    </div>
</template>

<script>
import {VueCropper} from "vue-cropper";

import UserRequest from '@/api/user'
const {BackendUrl} = require("@/api/request");

export default {
    name: "AvatarUploader",
    components: {VueCropper},
    data() {
        return {
            isVisible_editAvatarDialog: false,
            isVisible_previewAvatarDialog: false,
            options: {
                img: "", //裁剪图片的地址
                info: true, //裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: "", // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, //是否默认生成截图框
                autoCropWidth: 200, //默认生成截图框宽度
                autoCropHeight: 200,
                fixedBox: true, // 固定截图框大小 是否允许改变
                fixed: true, //是否开启截图框宽高固定比例
                fixedNumber: [1, 1], //截图框的宽高比例
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            previews: {},
            loading: false,
            avatarName: "", //头像名，包含后缀
            avatarUrl: this.avatar, //头像服务端链接
            client_alioss: {},
        };
    },

    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {
        //打开编辑头像窗口
        openEditAvatarDialog() {
            this.isVisible_editAvatarDialog = true;
            if (this.previews.url) {
                this.previews.url = "";
                this.options.img = "";
            }
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data;
        },
        beforeAvatarUpload(file) {
            this.avatarName = "this.$uuid.v1()" + file.name; //包含后缀
            let uploadAccept = ["jpeg", "jpg", "png"]; //上传图片允许的格式
            let ext = file.type.split("/")[1]; //后缀名
            if (!uploadAccept.includes(ext)) {
                this.$Message.warning("您上传的图片格式不符，请重新上传");
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.options.img = reader.result; //base64
            };
        },
        changeScale(num) {
            this.$refs.cropper.changeScale(num);
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        //删除服务器中的头像
        async deleteAvatar() {
        },
        //上传头像
        submitUpdate() {
            try {
                this.loading = true;
                this.$refs.cropper.getCropData(async (base64) => {

                    let file_img = this.base64toFile(base64, this.avatarName);

                    let formData = new FormData();

                    formData.append("img", file_img);
                    await UserRequest.addUserAvatar(formData).then(res => {
                        this.$Message.success("上传头像成功");
                    }).catch(err => {
                        this.$Message.error("出错：" + (err || '请稍后重试'))
                    })


                    this.$emit("avatarUrl", this.avatarUrl); //把头像url传出去
                });
            } catch (error) {
                this.$Message.error("上传头像失败");
            } finally {
                this.loading = false;
                this.isVisible_editAvatarDialog = false;
            }
        },
        //base64转换为file类型
        base64toFile(base64, filename) {
            let arr = base64.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bStr = atob(arr[1]),
                n = bStr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bStr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
        },
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.AvatarUploader {
    //background-color: red;
    width: 180px;
    height: 180px;

    .image {
        position: relative;
        //display: inline-block;
        width: 180px;
        height: 180px;

        overflow: hidden; //img如果超出这个div会隐藏超出部分
        display: flex; //flex布局
        align-items: center; //让img放在div的中间，居中
        img {
            width: 100%;
            border-radius: 8px;
        }

        .mask {
            opacity: 0;
            color: white;
            font-size: 25px;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);

            border-radius: 8px;

            display: flex;
            justify-content: space-evenly;
            align-items: center;

            &:hover {
                opacity: 1;
            }
        }
    }

    .upload-preview {
        position: relative;
        top: 50%;
        transform: translate(50%, -50%);
        width: 200px;
        height: 200px;
        border-radius: 50%;
        box-shadow: 0 0 4px #bbbbbb;
        overflow: hidden;
    }
}

.upload-preview {
    position: relative;
    top: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 4px #bbbbbb;
    overflow: hidden;
}
</style>