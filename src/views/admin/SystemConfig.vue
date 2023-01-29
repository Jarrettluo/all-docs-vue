<template>
    <div class="content">
        <div style="padding: 10px; font-weight: 600; font-size: 16px; color: #000">
            系统设置
        </div>
        <Divider orientation="left">用户权限</Divider>
        是否开启普通用户上传功能
        <br>
        <RadioGroup v-model="systemConfig.userUpload">
            <Radio label="close">关闭</Radio>
            <Radio label="open">开启</Radio>
        </RadioGroup>
        <Divider></Divider>
        是否开启管理员强制审核功能
        <br>
        <RadioGroup v-model="systemConfig.adminReview">
            <Radio label="close">关闭</Radio>
            <Radio label="open">开启</Radio>
        </RadioGroup>
        <Divider></Divider>
        是否开启违禁词提醒功能
        <br>
        <RadioGroup v-model="systemConfig.prohibitedWordReminder">
            <Radio label="close">关闭</Radio>
            <Radio label="open">开启</Radio>
        </RadioGroup>

        <Divider></Divider>
        是否放开注册功能？
        <br>
        <RadioGroup v-model="systemConfig.userRegistry">
            <Radio label="close">关闭</Radio>
            <Radio label="open">开启</Radio>
        </RadioGroup>
        <Divider orientation="left">敏感词过滤</Divider>
        下载敏感词文件？<br>
        <Button size="small" shape="circle" @click="downloadProhibitedFile">
            <Icon type="md-arrow-round-down"/>
            下载文件
        </Button>

        <Divider></Divider>
        上传敏感词文件？<br>
        <Button type="dashed" size="small" shape="circle" @click="uploadDialogShow">
            <Icon type="md-arrow-round-up"/>
            更新文件
        </Button>
        <input type="file" ref="fileToUpload" id="fileToUpload" style="display: none"
               @change="changeFile">


    </div>
</template>

<script>
import systemConfig from '@/api/system'

export default {
    name: "SystemConfig",
    data() {
        return {
            systemConfig: {
                userUpload: 'open',
                adminReview: 'open',
                prohibitedWordReminder: 'open',
                userRegistry: 'close'
            }
        }
    },
    mounted() {
        this.getSystemConfig()
    },
    watch: {
        systemConfig: { //监听的对象
            deep: true, //深度监听设置为 true
            handler: function (newV, oldV) {
                this.updateSystemConfig()
            }
        }
    },
    methods: {
        /**
         * 获取初始的系统设置内容
         * @returns {Promise<void>}
         */
        async getSystemConfig() {
            await systemConfig.getSystemConfig().then(res => {
                let result = res
                if (result.code === 200) {
                    this.systemConfig['userUpload'] = result.data['userUpload'] ? 'open' : 'close';
                    this.systemConfig['adminReview'] = result.data['adminReview'] ? 'open' : 'close';
                    this.systemConfig['prohibitedWordReminder'] = result.data['prohibitedWord'] ? 'open' : 'close';
                    this.systemConfig['userRegistry'] = result.data['userRegistry'] ? 'open' : 'close';
                } else {
                    this.$Message.error(result.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        /**
         * 管理员更新内容以后保存到后台
         * @returns {Promise<void>}
         */
        async updateSystemConfig() {
            let param = {
                'userUpload': this.systemConfig['userUpload'] === 'open',
                'adminReview': this.systemConfig['adminReview'] === 'open',
                'prohibitedWord': this.systemConfig['prohibitedWordReminder'] === 'open',
                'userRegistry': this.systemConfig['userRegistry'] === 'open'
            }
            await systemConfig.updateSystemConfig(param).then(res => {
                if (res.code !== 200) {
                    this.$Message.error(result.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },

        uploadDialogShow() {
            this.$refs.fileToUpload.dispatchEvent(new MouseEvent("click"));
        },
        changeFile() {
            const inputFile = this.$refs.fileToUpload.files[0];
            let formData = new FormData();
            formData.set("file", inputFile);
            if (inputFile === null) {
                return
            }
            this.upProhibitedFile(formData)
        },
        /**
         * 上传敏感词文件
         * @param param
         * @returns {Promise<void>}
         */
        async upProhibitedFile(param) {
            await systemConfig.updateProhibitedWordFile(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("更新文件成功！")
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })
        },
        async downloadProhibitedFile() {
            await systemConfig.getProhibitedWordFile().then(res => {
                const dom = document.createElement('a');
                dom.href = URL.createObjectURL(res);
                dom.download = '敏感词文件.txt';
                dom.click();
                this.$Message.success("下载文件成功，请查收！")

            }).catch(err => {
                this.$Message.error(err)
            })
        },

    }
}
</script>

<style scoped lang="scss">
.content {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
    overflow-y: auto;
}
</style>