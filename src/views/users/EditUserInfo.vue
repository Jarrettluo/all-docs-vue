<template>
    <Form ref="formValidate" :model="userInfo" :label-width="80">
        <FormItem label="用户名" prop="name">
            <Input v-model="userInfo.name" placeholder="请输入用户名" disabled></Input>
        </FormItem>
        <FormItem label="手机号" prop="mail">
            <Input v-model="userInfo.phoneNum" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <Input v-model="userInfo.mail" placeholder="请输入邮箱地址"></Input>
        </FormItem>
        <FormItem label="角色" prop="city">
            <Select v-model="userInfo.permissionEnum" placeholder="请选择角色">
                <Option value="USER">普通用户</Option>
                <Option value="ADMIN">管理员</Option>
            </Select>
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="选择日期" v-model="userInfo.date"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别" prop="gender">
            <RadioGroup v-model="userInfo.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="个人签名" prop="desc">
            <Input v-model="userInfo.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="用户个性签名"></Input>
        </FormItem>
        <FormItem>
            <Button type="warning" @click="resetUserPassword()">重置密码</Button>
        </FormItem>
    </Form>
</template>

<script>
import UserRequest from '@/api/user'
export default {
    data () {
        return {
            userInfo: {
                name: '',
                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 根据用户id查询用户信息
         * @param userId 准备修改信息的用户id
         * @returns {Promise<void>}
         */
        async getUserInfo(userId) {
            let param = {
                id: userId
            }
            await UserRequest.getUser(param).then(res => {
                if (res.code === 200) {
                    let resData = res.data
                    this.userInfo['id'] = resData.id
                    this.userInfo['name'] = resData.username
                    this.userInfo['mail'] = resData.mail || ""
                    this.userInfo['gender'] = resData.male ? 'male' : 'female';
                    this.userInfo['phoneNum'] = resData.phone
                    this.userInfo['desc'] = resData.description
                    this.userInfo['permissionEnum'] = resData.permissionEnum || "USER"
                    if (resData.birthtime != null) {
                        this.userInfo['date'] = new Date(resData.birthtime);
                    }
                }
            }).catch(err => {
                this.$Message.error("出错：" + (err || '请稍后重试'))
            })

        },
        /**
         * 管理员修改用户信息
         *
         */
        async updateUserInfo() {
            const param = {
                id: this.userInfo.id,
                phone: this.userInfo.phoneNum,
                mail: this.userInfo.mail,
                male: this.userInfo.gender === 'male',
                description: this.userInfo.desc,
                birthtime: this.userInfo.date
            }
            await UserRequest.updateUser(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("更新成功")
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })

        },
        /**
         * 管理员重置密码
         * @returns {Promise<void>}
         */
        async resetUserPassword() {
            // const param = {
            //     userId: this.userInfo.id
            // }
            const param = this.userInfo.id
            await UserRequest.resetUserPassword(param)
                .then(res => {
                if (res.code === 200) {
                    this.$Message.success("重置成功")
                } else {
                    this.$Message.error(res.message)
                }
            }).catch(err => {
                this.$Message.error(err)
            })

        },
    }
}
</script>
