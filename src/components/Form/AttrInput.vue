<template>
    <div>
        <Form :model="formTop" label-position="top">
            <Form-item label="文档分类">
                <Select v-model="formTop.category" placeholder="请选择分类">
                    <Option v-for="item in categoryOption" :value="item.id">{{ item.seeName }}</Option>
                </Select>
            </Form-item>
            <Form-item label="标签选择">
                <tags-input element-id="tags"
                            v-model="selectedTags"
                            :existing-tags="tagOption"
                            placeholder="请选择标签"
                            :limit="10"
                            :typeahead="true"
                            :typeahead-always-show="true"
                            :typeahead-hide-discard="true"
                >
                </tags-input>
            </Form-item>
            <Form-item label="详情文本">
                <Input v-model="formTop.description" type="textarea" :rows="4"></Input>
            </Form-item>
        </Form>
        <div v-show="showSkipError">
            异常跳过
            <i-switch v-model="skipError" @on-change="change"></i-switch>
        </div>


        <submit-button
            :src="buttonSrc"
            label="开始上传"
            @click="startUpload"
        ></submit-button>
    </div>
</template>

<script>

import SubmitButton from '@/components/SubmitButton'
import VoerroTagsInput from '@voerro/vue-tagsinput';
import CategoryRequest from "@/api/category";
// 参考文档 https://github.com/voerro/vue-tagsinput

export default {
    name: "AttrInput",
    data() {
        return {
            formTop: {},
            buttonSrc: require("@/assets/source/upload.png"),
            selectedTags: [],
            categoryType: "CATEGORY",
            categoryOption: null,
            tagType: "TAG",
            tagOption: [],
            skipError: false,
        }
    },
    props: {
        showSkipError:{
            type: Boolean,
            default: true
        },
    },
    components: {
        SubmitButton
    },
    mounted() {
        this.getAllItems()
        this.getTagOption()
    },
    methods: {
        getAllItems() {
            this.loading = true
            const params = {
                type: this.categoryType
            };
            CategoryRequest.getListData(params).then(response => {
                this.loading = false;
                if (response.code !== 200) {
                    return;
                }
                this.listLoading = false
                this.categoryOption = []
                if (response.data.length > 0) {
                    response.data.forEach(item => {
                        if (item.name.length > 64) {
                            item['seeName'] = item.name.slice(0, 64) + "..."
                        } else {
                            item['seeName'] = item.name
                        }
                        this.categoryOption.push(item)
                    })
                }
            })
        },

        getTagOption() {
            this.loading = true
            const params = {
                type: this.tagType
            };
            CategoryRequest.getListData(params).then(response => {
                this.loading = false;
                if (response.code !== 200) {
                    return;
                }
                this.listLoading = false
                this.tagOption = []
                if (response.data.length > 0) {
                    response.data.forEach(item => {
                        let tag = {}
                        tag['key'] = item.id
                        if (item.name.length > 64) {
                            tag['name'] = item.name.slice(0, 64)
                        } else {
                            tag['name'] = item.name
                        }
                        if (item.name.length > 8) {
                            tag['value'] = item.name.slice(0, 8) + "..."
                        } else {
                            tag['value'] = item.name
                        }
                        this.tagOption.push(tag)
                    })
                }
            })
        },
        startUpload() {
            this.$emit("startUpload", {})
        },
        getSelectedTags() {
            let tagValueList = []
            this.selectedTags.forEach(item => {
                for (let e of this.tagOption) {
                    if (item.key === e.key)
                    tagValueList.push(item.name)
                }
            })
            return tagValueList
        },

        getCategory() {
            let cateId = this.formTop.category
            if (cateId != null && cateId !== '') {
                for (let item of this.categoryOption ) {
                    if (item.id === cateId) {
                        return item.seeName
                    }
                }
            }
            return null;
        },

        getDesc() {
            return this.description
        },
        getSkipError() {
            return this.skipError
        }
    }
}
</script>

<style scoped>

</style>