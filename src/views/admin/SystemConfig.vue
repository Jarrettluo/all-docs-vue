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
    </div>
</template>

<script>
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
    watch:{
        systemConfig:{ //监听的对象
            deep:true, //深度监听设置为 true
            handler:function(newV, oldV){
                this.$Message.info("功能开发中，请等待！")
            }
        }
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
}
</style>