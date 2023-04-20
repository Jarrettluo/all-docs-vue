<template>
    <div>
        <Form :model="formTop" label-position="top">
            <Form-item label="文档分类">
                <Select v-model="formTop.select" placeholder="请选择">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </Form-item>
            <Form-item label="标签选择">
                <tags-input element-id="tags"
                            v-model="selectedTags"
                            :existing-tags="[
                                    { key: 'web-development', value: 'Web Development' },
                                    { key: 'php', value: 'PHP' },
                                    { key: 'javascript', value: 'JavaScript' },
                                ]"
                            placeholder="请选择标签"
                            typeahead="true">
                </tags-input>
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
    </div>
</template>

<script>

import SubmitButton from '@/components/SubmitButton'
import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
    name: "AttrInput",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
        }
    },
    components: {
        SubmitButton
    },
}
</script>

<style scoped>

</style>