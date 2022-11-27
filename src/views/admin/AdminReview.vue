<template>
    <div class="main" ref="tableRef">
        <Table width="100%" :height="height" class="table-zone" border :columns="columns" :data="data">
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">通过</Button>
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
                    <Page :total="100"/>
                </Col>
            </Row>
        </div>
        <Modal
            v-model="modal"
            title="文档评审信息确认"
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="height: 200px;">
                <p>您可以<a>下载文档</a>，或者查看<a>文本信息</a></p>
                <Divider></Divider>
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
                    value: 'New York',
                    label: '文档中包含违禁词'
                },
                {
                    value: 'London',
                    label: '文档属于低质量'
                },
                {
                    value: 'Sydney',
                    label: '已存在相似文档'
                }
            ],
        }
    },
    created() {
        this.initHeight()
    },
    mounted() {
        this.getDocData()
    },
    methods: {
        initHeight() {
            this.$nextTick(() => {
                this.height = this.$refs.tableRef.offsetHeight - 120;
            })

        },

        getDocData() {
            let result = [{
                id: "1223",
                docName: "2324",
                size: 123567,
                category: "分类的信息",
                tags: [{
                    id: "233",
                    name: "abc"
                }],
                createTime: "2022年11月22日",
                createUser: "232",
                filterWord: ["abc", "edf", "dsff"]
            }, {
                id: "1223",
                docName: "文档的名字等等",
                size: 123000567,
                category: "分类的信息",
                tags: [{
                    id: "233",
                    name: "abc"
                }, {
                    id: "233",
                    name: "abc"
                }, {
                    id: "233",
                    name: "abc"
                }],
                createTime: "2022年11月22日",
                createUser: "232",
                filterWord: ["abc", "edf", "dsff"]
            }, {
                id: "1223",
                size: 1344323567,
                docName: "文档的名字等等",
                category: "分类的附近丢失了封疆大吏分手多久了信息",
                tags: [{
                    id: "233",
                    name: "abc"
                }],
                createTime: "2022年11月22日",
                createUser: "这是一个巨长无比的用户名",
                filterWord: ["abc", "edf", "dsff"]
            }]

            let obj = {}
            this.data = []
            for (let resultElement of result) {

                obj['id'] = resultElement['id']
                obj['name'] = resultElement['docName']

                // 计算文档的大小
                obj['size'] = '0B'
                let docSize = resultElement['size'];
                if (typeof docSize === "number" && docSize > 0) {
                    obj['size'] = fileTool.bytesToSize(docSize)
                }


                let cateObj = resultElement['category']
                if (cateObj.length > 8) {
                    cateObj = cateObj.slice(0, 8) + "..."
                }
                obj['category'] = cateObj

                let tagStrList = []
                let tagArray = resultElement['tags']
                for (let tagArrayElement of tagArray) {
                    if (tagArrayElement.hasOwnProperty("name")) {
                        tagStrList.push(tagArrayElement["name"])
                    }
                }
                let tagStr = tagStrList.join("/");
                if (tagStr.length > 16) {
                    tagStr = tagStr.slice(0, 16) + '...'
                }
                obj['tag'] = tagStr


                const docTime = resultElement['createTime']
                // if ( typeof docTime === )
                obj['time'] = parseTime(new Date(), '{y}年{m}月{d}日 {h}:{i}:{s}');

                let userName = resultElement['createUser'] || "未知用户"
                if (userName.length > 4) {
                    userName = userName.slice(0, 4) + "..."
                }

                obj['user'] = userName
                obj['sensitiveWord'] = "这些都是违禁词"

                this.data.push(obj)
                obj = {}
            }
        },

        remove(index) {
            this.modal = true

            console.log(index)
        },

        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },

        handleCreate1 (val) {
            this.cityList3.push({
                value: val,
                label: val
            });
        },

        refuse() {
            this.$Message.info('refuse cancel');
        },
        receive() {
            this.$Message.info('receive cancel');
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
