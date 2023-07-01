<template>
    <Form ref="formValidate" :model="docInfo" :rules="ruleValidate" :label-width="80">
        <Alert>文件格式不能被修改！</Alert>
        <Form-item label="文档标题" prop="name">
            <Input v-model="docInfo.name" type="textarea" :autosize="{minRows: 1,maxRows: 4}"
                   placeholder="文档标题"></Input>
        </Form-item>
        <Form-item label="分类" prop="category">
            <Select v-model="docInfo.category" placeholder="请选择分类">
                <Option v-for="item in categoryOption" :value="item.id">{{ item.seeName }}</Option>
            </Select>
        </Form-item>
        <Form-item label="标签选择" prop="tags">
            <tags-input element-id="tags"
                        v-model="docInfo.tags"
                        :existing-tags="tagOption"
                        placeholder="请选择标签"
                        :limit="10"
                        :typeahead="true"
                        :typeahead-always-show="true"
                        :typeahead-hide-discard="true"
            >
            </tags-input>
        </Form-item>
        <Form-item label="概述" prop="desc">
            <Input v-model="docInfo.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
        </Form-item>
    </Form>
</template>

<script>
import CategoryRequest from "@/api/category";

import DocumentRequest from "@/api/document";

export default {
    name: "DocEditModal",
    data() {
        return {

            formValidate: {
                name: '',
                category: '',
                tags: [],
                desc: ''
            },
            ruleValidate: {
                name: [
                    {required: true, message: '标题不能为空', trigger: 'blur'}
                ],
                category: [
                    {required: true, message: '请选择分类', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '请输入文档概述', trigger: 'blur'},
                    {type: 'string', min: 20, message: '概述不能少于20字', trigger: 'blur'}
                ]
            },

            tagOption: [],
            categoryOption: null,

            categoryType: "CATEGORY",
            tagType: "TAG",

        }
    },
    props: ["docInfo"],
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
        // updateDocInfo() {
        //     this.$Message.info(this.docInfo.name)
        // },
        getCategory() {
            let cateId = this.docInfo.category
            if (cateId != null && cateId !== '') {
                for (let item of this.categoryOption) {
                    if (item.id === cateId) {
                        return item.seeName
                    }
                }
            }
            return null;
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

        /**
         * 对某篇文档进行修改操作
         * @param docItem
         */
        updateDocInfo(docItem) {
            let docId = this.docInfo.id;
            let docName = this.docInfo.name;

            if (docId == null || docName == null) {
                this.$Message.warning("提交内容不正确，请修改！")
                return;
            }
            let params = {
                id: docId,
                name: docName,
                categoryId: this.docInfo.category,
                tags: this.docInfo.tags,
                desc: this.docInfo.desc,
            }
            DocumentRequest.updateData(params).then(response => {
                // 更新后提示信息
                if (response.code === 200) {
                    this.$Message.success("修改成功")
                }
            })
        },
    }
}
</script>

<style scoped>

</style>