<template>
    <div class="main" ref="tableRef">
        <Table ref="reviewDocTable" width="100%" :height="height" class="table-zone" border :columns="columns"
               :data="data">
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="approve(index)">通过</Button>
                <Button type="error" size="small" @click="remove(index)">拒绝</Button>
            </template>
        </Table>
        <div class="bottom-zone">
            <Row>
                <Col span="12" class="bottom-zone-left">
                    <Button type="primary" ghost @click="refuse">全部拒绝</Button>
                    <Button type="primary" ghost style="margin-left: 10px" @click="receive">全部通过</Button>
                </Col>
                <Col span="12" class="bottom-zone-right">
                    <Page
                        :model-value="currentPage"
                        :total="totalItems"
                        :page-size="pageSize"
                        @on-change="pageChange"
                    />
                </Col>
            </Row>
        </div>
        <Modal
            v-model="modal"
            title="文档评审信息确认"
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="height: 200px;">
                <p>您可以<a @click="download">下载文档</a>，或者查看<a @click="showText">文本信息</a></p>
                <Divider></Divider>
                <div style="margin-bottom: 10px">
                    <p>评审意见选择：</p>
                </div>

                <Select v-model="model" filterable allow-create @on-create="handleCreate1">
                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </Modal>

        <Modal
            v-model="modal1"
            title="文档评审信息确认"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div style="height: 200px;">
                <div style="margin-bottom: 10px">
                    <p>评审意见选择：</p>
                </div>

                <Select v-model="model" filterable allow-create @on-create="handleCreate1">
                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </Modal>

    </div>

</template>
<script>
import {resolveComponent} from 'vue'
import reviewRequest from '@/api/docReview'

import fileTool from "@/utils/fileUtil"

import {parseTime} from "@/utils"

export default {
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: "left"
                },
                {
                    title: '名称',
                    key: 'name',
                    width: 300,
                    fixed: 'left'
                },
                {
                    title: '大小',
                    key: 'size',
                    width: 120
                },
                {
                    title: '分类',
                    key: 'category',
                    width: 180
                },
                {
                    title: '标签',
                    key: 'tag',
                    minWidth: 280
                },
                {
                    title: '创建时间',
                    key: 'time',
                    width: 200
                },
                {
                    title: '创建人',
                    key: 'user',
                    width: 110
                },
                {
                    title: '违禁词',
                    key: 'sensitiveWord',
                    width: 200
                },
                {
                    title: '操作',
                    slot: 'action',
                    fixed: 'right',
                    width: 160
                }
            ],
            data: [],

            height: 600,

            modal: false,

            cityList3: [
                {
                    value: '文档中包含违禁词',
                    label: '文档中包含违禁词'
                },
                {
                    value: '文档属于低质量',
                    label: '文档属于低质量'
                },
                {
                    value: '已存在相似文档',
                    label: '已存在相似文档'
                }
            ],

            currentPage: 1,
            totalItems: 10,
            pageSize: 10,

            model: null,

            choosedItem: {},

            modal1: false
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        // this.getDocData()
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })

        },

        /**
         * 获取全部数据
         * @returns {Promise<void>}
         */
        async getDocData() {
            let param = {
                page: this.currentPage,
                rows: this.pageSize
            }
            reviewRequest.getAdminDocReview(param).then(res => {
                let result = res.data.data;
                this.totalItems = res.data.total;
                let obj = {}
                this.data = []
                for (let resultElement of result) {
                    obj['id'] = resultElement['id']
                    obj['name'] = resultElement['name']
                    // 计算文档的大小
                    obj['size'] = '0B'
                    let docSize = resultElement['size'];
                    if (typeof docSize === "number" && docSize > 0) {
                        obj['size'] = fileTool.bytesToSize(docSize)
                    }


                    // let cateObj = resultElement['category']
                    // if (cateObj.length > 8) {
                    //     cateObj = cateObj.slice(0, 8) + "..."
                    // }
                    // obj['category'] = cateObj

                    // let tagStrList = []
                    // let tagArray = resultElement['tags']
                    // for (let tagArrayElement of tagArray) {
                    //     if (tagArrayElement.hasOwnProperty("name")) {
                    //         tagStrList.push(tagArrayElement["name"])
                    //     }
                    // }
                    // let tagStr = tagStrList.join("/");
                    // if (tagStr.length > 16) {
                    //     tagStr = tagStr.slice(0, 16) + '...'
                    // }
                    // obj['tag'] = tagStr


                    const docTime = resultElement['uploadDate']
                    // if ( typeof docTime === )
                    obj['time'] = parseTime(new Date(), '{y}年{m}月{d}日 {h}:{i}:{s}');

                    let userName = resultElement['userName'] || "未知用户"
                    if (userName.length > 4) {
                        userName = userName.slice(0, 4) + "..."
                    }

                    obj['user'] = userName
                    obj['sensitiveWord'] = "违禁词"

                    this.data.push(obj)
                    obj = {}
                }

            }).catch(err => {
                this.$Message.error('操作失败！')
            })

        },

        remove(index) {
            this.modal = true
            let item = this.data[index]
            this.choosedItem = item;
        },

        async ok() {
            let param = {
                docId: this.choosedItem.id,
                reason: this.model
            }
            reviewRequest.updateRefuseDoc(param).then(res => {
                if (res.code === 200) {
                    this.getDocData()
                    this.$Message.success('操作成功！');
                } else {
                    this.$Message.error('操作失败!');
                }
            }).catch(err => {
                this.$Message.error('操作失败！');
            })
        },
        cancel() {
            this.$Message.info('取消选择');
        },

        handleCreate1(val) {
            this.cityList3.push({
                value: val,
                label: val
            });
        },

        refuse() {
            let currentSelection = this.$refs.reviewDocTable.getSelection();
            if (currentSelection.length > 0) {
                this.modal1 = true
            } else {
                this.$Message.warning("请勾选！")
            }

        },
        async receive() {
            let currentSelection = this.$refs.reviewDocTable.getSelection();
            if (currentSelection.length < 1) {
                this.$Message.warning("请勾选！")
                return
            }
            let ids = []
            for (let item of currentSelection) {
                ids.push(item.id)
            }
            let param = {
                ids: ids
            }
            await reviewRequest.updateApproveDoc(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("success")
                } else {
                    this.$Message.error("error!")
                }
                this.getDocData()
            }).catch(err => {
                this.$Message.error("error:" + err)
            })

        },
        /**
         * 管理员拒绝某一批数据
         * @returns {Promise<void>}
         */
        async ok1() {
            let currentSelection = this.$refs.reviewDocTable.getSelection();
            if (currentSelection.length < 1) {
                this.$Message.warning("请勾选！")
                return
            }
            if (this.model == null || this.model == "") {
                this.$Message.warning("请选择原因！")
                this.modal1 = true
                return
            }
            let ids = []
            for (let item of currentSelection) {
                ids.push(item.id)
            }
            let param = {
                ids: ids,
                reason: this.model
            }

            await reviewRequest.updateRefuseDocBatch(param).then(res => {
                if (res.code === 200) {
                    this.$Message.success("success")
                } else {
                    this.$Message.error("error!")
                }
                this.getDocData()
            }).catch(err => {
                this.$Message.error("error:" + err)
            })
        },
        cancel1() {

        },
        pageChange(page) {
            this.currentPage = page
        },

        async approve(index) {
            let item = this.data[index]
            let param = {
                ids: [item.id]
            }
            reviewRequest.updateApproveDoc(param).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.getDocData()
                    this.$Message.success('操作成功！')
                } else {
                    this.$Message.error('操作失败！')
                }

            }).catch(err => {
                this.$Message.error('操作失败！')
            })
        },
        download() {
            this.$Message.error("功能尚未开发，请等待！")
        },
        showText() {
            this.$Message.error("功能尚未开发，请等待！")
        }
    }
}
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: 100%;
    position: relative;

    /deep/ .ivu-table-body {
        height: 600px;
    }

    .bottom-zone {
        position: absolute;

        bottom: 50px;
        left: 0;

        width: 100%;
        height: 80px;
        line-height: 80px;

        .bottom-zone-left {

        }

        .bottom-zone-right {
            text-align: right;
        }
    }
}
</style>
