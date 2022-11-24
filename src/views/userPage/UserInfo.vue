<template>
    <div style="text-align: left; padding: 30px; position: relative; width: 100%; height: 100%;">

        <div class="basic-info">
            基本信息
        </div>
        <Form :model="formItem" :label-width="80">
            <FormItem label="用户名">
                <Row>
                    <Col span="6">
                        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="手机号">
                <Row>
                    <Col span="6">
                        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="邮箱">
                <Row>
                    <Col span="6">
                        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="formItem.radio">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="生日">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="个人签名">
                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">提交</Button>
            </FormItem>
        </Form>

        <div style="position: absolute; right: 40px; top: 40px;">
            <div style="border: 2px solid #333333; border-radius: 8px; width: 180px; height: 180px">
                <img :src="userSrc" alt="用户头像" width="100%" style=""/>
            </div>

            <div class="change-button">
                更换头像
            </div>
            <div style="position: absolute; top: 0px; right: 0;">
                <avatar></avatar>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "./Avatar"
export default {
    name: "UserInfo",
    components: {
        Avatar
    },
    data () {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            },
            userSrc: require("@/assets/source/user_avater.png")
        }
    }
}
</script>

<style scoped lang="scss">

.basic-info {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC,serif;
    font-weight: 500;
    color: #000000;
    line-height: 22px;

    padding: 10px 0px 50px 0;
}

.change-button {
    text-align: center;
    padding: 20px 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC,serif;
    font-weight: 400;
    color: #8F6100;
    line-height: 20px;

    cursor: pointer;
}
</style>