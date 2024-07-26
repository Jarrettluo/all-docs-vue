<template>
    <div style="text-align: left; padding: 30px; position: relative; width: 100%; height: 100%;">
        <div class="basic-info">
            基本信息
        </div>
        <Form :model="userInfo" :label-width="80">
            <FormItem label="用户名">
                <Row>
                    <Col span="6">
                        <Input v-model="userInfo.username" :placeholder="placeholder" disabled></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="密码">
                <Row>
                    <Col span="6">
                        <Input v-model="userInfo.checkPassword" type="password" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="确认密码">
                <Row>
                    <Col span="6">
                        <Input v-model="userInfo.password" type="password" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="手机号">
                <Row>
                    <Col span="6">
                        <Input v-model="userInfo.phoneNum" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="邮箱">
                <Row>
                    <Col span="6">
                        <Input v-model="userInfo.mail" :placeholder="placeholder"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="userInfo.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="生日">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" :placeholder="placeholder" v-model="userInfo.birthtime">
                        </DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="个人签名">
                <Input v-model="userInfo.userComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="updateUserInfo">提交</Button>
            </FormItem>
        </Form>

        <div style="position: absolute; right: 40px; top: 40px;">
            <div class="user-img-container" style="border-radius: 8px; width: 180px; height: 180px">
                <img :src="userSrc" alt="用户头像" width="100%" style="" referrerpolicy="no-referrer"/>
            </div>
            <div style="position: absolute; top: 0px; right: 0;">
                <AvatarUploader
                    :img_url="userSrc"
                    @avatarUrl="getAvatarUrl"
                    @deleteAvatar="deleteAvatar"
                ></AvatarUploader>
            </div>
        </div>
    </div>
</template>

<script>
import UserRequest from '@/api/user'
const {BackendUrl} = require("@/api/request");
import StaticSource from "@/api/staticSourceUrl"
import AvatarUploader from "@/components/AvatarUploader/Index.vue";

export default {
    name: "UserInfo",
    components: {
        AvatarUploader
    },
    data () {
        return {
            userSrc: require("@/assets/source/user_avater.png"),
            placeholder: "请输入...",
            userInfo: {
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
                    this.userInfo['id'] = resData.id
                    this.userInfo['username'] = resData.username
                    this.userInfo['mail'] = resData.mail || ''
                    this.userInfo['gender'] = resData.male ? 'male' : 'female';
                    this.userInfo['phoneNum'] = resData.phone
                    this.userInfo['userComment'] = resData.description
                    if (resData.birthtime != null) {
                        this.userInfo['birthtime'] = new Date(resData.birthtime);
                    }
                    if (resData.avatar !== '' && resData.avatar !== null && resData.avatar !== 'null') {
                        this.userSrc = StaticSource.imageUrl(resData.avatar);
                    }
                    localStorage.setItem("avatar", resData.avatar)
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            })
        },
        async updateUserInfo(){
            if (this.userInfo.password !== this.userInfo.checkPassword) {
                this.$Message.error("密码不相同，请检查！")
                return
            }
            let params = {
                id: this.userInfo.id,
                password: this.userInfo.password,
                phone: this.userInfo.phoneNum,
                mail: this.userInfo.mail,
                male: this.userInfo.gender === 'male',
                description: this.userInfo.userComment,
                birthtime: this.userInfo.birthtime
            }
            UserRequest.updateUser(params).then(res => {
                this.$Message.success("修改成功！")
                if (res.code === 200) {
                    this.getUserInfo()
                }
            }).catch(err => {

            })
        },
        getAvatarUrl() {
            // this.$router.push({name:'userInfo'})
            this.getUserInfo()
            this.$router.go(0)
        },
        async deleteAvatar() {
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

.user-img-container {
    box-shadow: 0 0 4px #bbbbbb;
    img {
        border-radius: 6px;
    }
}
</style>