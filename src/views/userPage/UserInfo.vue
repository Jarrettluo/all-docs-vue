<template>
    <div style="text-align: left; padding: 30px; position: relative; width: 100%; height: 100%;">

        <div class="basic-info">
            基本信息
        </div>
        <Form :model="userForm" :label-width="80">
            <FormItem label="用户名">
                <Row>
                    <Col span="6">
                        <Input v-model="userForm.username" :placeholder="placeholder" disabled></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="密码">
                <Row>
                    <Col span="6">
                        <Input v-model="userForm.checkPassword" type="password" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="确认密码">
                <Row>
                    <Col span="6">
                        <Input v-model="userForm.password" type="password" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="手机号">
                <Row>
                    <Col span="6">
                        <Input v-model="userForm.phoneNum" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="邮箱">
                <Row>
                    <Col span="6">
                        <Input v-model="userForm.mail" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="userForm.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="生日">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" :placeholder="placeholder" v-model="userForm.birthtime"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="个人签名">
                <Input v-model="userForm.userComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="updateUserInfo">提交</Button>
            </FormItem>
        </Form>

        <div style="position: absolute; right: 40px; top: 40px;">
            <div style="border: 2px solid #333333; border-radius: 8px; width: 180px; height: 180px">
                <img :src="userSrc" alt="用户头像" width="100%" style=""/>
            </div>
            <div style="position: absolute; top: 0px; right: 0;">
                <avatar></avatar>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "./Avatar"
import UserRequest from '@/api/user'

export default {
    name: "UserInfo",
    components: {
        Avatar
    },
    data () {
        return {
            userSrc: require("@/assets/source/user_avater.png"),
            placeholder: "请输入...",
            userForm: {
                username: '',
                phoneNum: '',
                mail: '',
                gender: 'female',
                birthtime: '',
                userComment: '',
                password: '',
                checkPassword: ''
            }
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods:{
        async getUserInfo(){
            let param = {
                id: localStorage.getItem("id")
            }
            UserRequest.getUser(param).then(res => {
                if (res.code === 200) {
                    let resData = res.data
                    this.userForm['id'] = resData.id
                    this.userForm['username'] = resData.username
                    this.userForm['mail'] = resData.mail || ''
                    this.userForm['gender'] = resData.male ? 'male' : 'female';
                    this.userForm['phoneNum'] = resData.phone
                    this.userForm['userComment'] = resData.description
                }
            }).catch(err => {
                console.log(err)
            })
        },
        async updateUserInfo(){
            if (this.userForm.password !== this.userForm.checkPassword) {
                this.$Message.error("密码不相同，请检查！")
                return
            }
            let params = {
                id: this.userForm.id,
                password: this.userForm.password,
                phone: this.userForm.phoneNum,
                mail: this.userForm.mail,
                male: this.userForm.gender === 'male',
                description: this.userForm.userComment
            }
            UserRequest.updateUser(params).then(res => {
                this.$Message.success("修改成功！")
                if (res.code === 200) {
                    this.getUserInfo()
                }
            }).catch(err => {

            })
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