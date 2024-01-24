<template>
    <div>
        <div class="header">
            <div style="margin-top: 10px;width: 50%;display:inline-block;">
                <el-row>
                    <el-col :span="6">
                        <label>导图编码：</label>
                        <el-input v-model="formData.mindCode" style="width: 150px"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <label>导图名称：</label>
                        <el-input v-model="formData.mindName" style="width: 150px"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <label>导图类型：</label>
                        <el-select v-model="formData.mindType"  style="width: 150px">
                            <el-option value="zsdt" label="知识导图"></el-option>
                            <el-option value="fwdt" label="服务导图"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <label>主题：</label>
                        <el-select @change="set_theme" v-model="theme_value" style="width: 150px">
                            <el-option value="">default</el-option>
                            <template v-for="(item,index) in themOptions">
                                <el-option :key="index" :value="item" :label="item"></el-option>
                            </template>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div style="float: right;margin: 10px 20px 0px 0px;display:inline-block;">
                <el-button type="primary" class="noimpor-btn" @click='zoomOut' ref="zoomOut"><i class="el-icon-zoom-out"></i> 缩小</el-button>
                <el-button type="primary" class="noimpor-btn" @click='zoomIn' ref="zoomIn"><i class="el-icon-zoom-in"></i> 放大</el-button>
                <el-button type="primary" class="noimpor-btn" @click="addNode"><i class="el-icon-plus"></i> 添加节点</el-button>
                <el-button type="primary" class="noimpor-btn" @click="editNode"><i class="el-icon-edit"></i> 编辑节点</el-button>
                <el-button type="primary" class="noimpor-btn" @click="onRemoveNode"><i class="el-icon-minus"></i> 删除节点</el-button>
                <!--<el-button type="primary" class="noimpor-btn" @click='changeOption'><i class="el-icon-thumb"></i> 改变布局方向</el-button>-->
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" class="common-btn" @click='saveMind'><i class="el-icon-s-claim"></i> 保存</el-button>
                <el-button type="primary" class="danger-btn" @click='deleteMind' :disabled="formData.id === ''?true:false"><i class="el-icon-delete"></i> 删除</el-button>
            </div>
        </div>
        <js-mind :values="mind" :options="options" v-show="isShow" ref="jsMind" :height="mindHeight" ></js-mind>
        <div class="footer"></div>
        <el-dialog
            title="编辑节点"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="字体大小">
                            <el-input v-model="nodeOption.fontSize" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="字体加粗">
                            <el-select v-model="nodeOption.fontWeight" style="width: 60%">
                                <el-option value="normal" label="标准"></el-option>
                                <el-option value="bold" label="粗体"></el-option>
                                <el-option value="bolder" label="更粗"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="字体样式">
                            <el-select v-model="nodeOption.fontStyle" style="width: 60%">
                                <el-option value="normal" label="标准"></el-option>
                                <el-option value="italic" label="斜体"></el-option>
                                <el-option value="oblique" label="倾斜"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="nodeOption.bgColor" show-alpha :predefine="predefineColors" size="mini"></el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="字体颜色">
                            <el-color-picker v-model="nodeOption.fontColor" show-alpha :predefine="predefineColors" size="mini"></el-color-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="节点内容">
                        <el-input type="textarea" :rows="5" v-model="nodeOption.content" style="width:85%;"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="common-btn" @click="sureEditNode">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import jm from 'vue-jsmind'

import 'jsmind/style/jsmind.css'
import jsMind from 'jsmind/js/jsmind.js'
window.jsMind = jsMind

require('jsmind/js/jsmind.draggable.js')
require('jsmind/js/jsmind.screenshot.js')

export default {
    data () {
        return {
            drawer: false,
            dialogVisible: false,
            direction: 'rtl',
            theme_value: '',
            nodeOption: {
                content: '',
                bgColor: '',
                fontColor: '',
                fontSize: '',
                fontWeight: '',
                fontStyle: ''
            },
            mindHeight: '800px',
            themOptions: ['primary', 'warning', 'danger', 'success', 'info', 'greensea', 'nephrite', 'belizehole', 'wisteria', 'asphalt', 'orange', 'pumpkin', 'pomegranate', 'clouds', 'asbestos'],
            mind: {
                meta: {
                    name: 'jsMind remote',
                    author: 'hizzgdev@163.com',
                    version: '0.2'
                },
                format: 'node_tree',
                data: {
                    id: 'root',
                    topic: 'jsMind'
                }
            },
            options: {
                container: 'jsmind_container', // [必选] 容器的ID
                editable: false, // [可选] 是否启用编辑
                theme: 'orange' // [可选] 主题
            },
            formData: {
                id: '',
                mindCode: '',
                mindName: '',
                mindType: '',
                mindData: '',
                mindOptions: ''
            },
            mindOptions: {
                theme: ''
            },
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            color: 'rgba(255, 69, 0, 0.68)',
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            isShow: true
        }
    },
    created () {
        this.mindHeight = (document.body.clientHeight - 90) + 'px'
    },
    mounted () {
        this.jm = this.$refs.jsMind.jm
        this.jm.enable_edit()
        this.jm.enable_event_handle('dblclick')
    },
    methods: {
        // 缩小
        zoomOut () {
            if (this.jm.view.zoomOut()) {
                this.$refs.zoomOut.disabled = false
            } else {
                this.$refs.zoomOut.disabled = true
            }
        },
        // 放大
        zoomIn () {
            if (this.jm.view.zoomIn()) {
                this.$refs.zoomIn.disabled = false
            } else {
                this.$refs.zoomIn.disabled = true
            }
        },
        // 新增节点
        addNode () {
            let selectedNode = this.jm.get_selected_node() // as parent of new node
            if (!selectedNode) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一个节点!'
                })
                return
            }
            let nodeid = this.jsMind.util.uuid.newid()
            let topic = 'new Node'
            this.jm.add_node(selectedNode, nodeid, topic)
        },
        // 编辑节点
        editNode () {
            let selectedId = this.get_selected_nodeid()
            if (!selectedId) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一个节点!'
                })
                return
            }
            let nodeObj = this.jm.get_node(selectedId)
            this.nodeOption.content = nodeObj.topic
            this.nodeOption.bgColor = nodeObj.data['background-color']
            this.nodeOption.fontColor = nodeObj.data['foreground-color']
            this.nodeOption.fontSize = nodeObj.data['font-size']
            this.nodeOption.fontWeight = nodeObj.data['font-weight']
            this.nodeOption.fontStyle = nodeObj.data['font-style']
            this.dialogVisible = true
        },
        sureEditNode () {
            let selectedId = this.get_selected_nodeid()
            this.jm.update_node(selectedId, this.nodeOption.content)
            this.jm.set_node_font_style(selectedId, this.nodeOption.fontSize, this.nodeOption.fontWeight, this.nodeOption.fontStyle)
            this.jm.set_node_color(selectedId, this.nodeOption.bgColor, this.nodeOption.fontColor)
            this.nodeOption = {
                content: '',
                bgColor: '',
                fontColor: '',
                fontSize: '',
                fontWeight: '',
                fontStyle: ''
            }
            this.dialogVisible = false
        },
        // 删除节点
        onRemoveNode () {
            let selectedId = this.get_selected_nodeid()
            if (!selectedId) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一个节点!'
                })
                return
            }
            this.jm.remove_node(selectedId)
        },
        // 布局方向
        changeOption () {
            if (this.options.mode === 'side') {
                this.options = {
                    mode: 'full'
                }
            } else {
                this.options = {
                    mode: 'side'
                }
            }
        },
        // 选择主题颜色
        set_theme () {
            this.jm.set_theme(this.theme_value)
        },
        // 获取选中标签的 ID
        get_selected_nodeid () {
            let selectedNode = this.jm.get_selected_node()
            if (selectedNode) {
                return selectedNode.id
            } else {
                return null
            }
        },
        getMind (mindCode) {
            let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/get/` + mindCode
            this.$axios.get(url).then(res => {
                this.formData = res.result
                if (this.formData.mindOptions !== '') {
                    this.theme_value = JSON.parse(this.formData.mindOptions).theme
                    this.set_theme()
                }
                this.jm.show(JSON.parse(res.result.mindData))
            }).catch(err => {
                console.log(err)
            })
        },
        saveMind () {
            if (this.formData.mindCode === '') {
                this.$message({ type: 'warning', message: '导图编码不能为空!' })
                return
            }
            if (this.formData.mindName === '') {
                this.$message({ type: 'warning', message: '导图名称不能为空!' })
                return
            }
            this.mindOptions.theme = this.theme_value
            this.formData.mindOptions = JSON.stringify(this.mindOptions)
            this.formData.mindData = JSON.stringify(this.jm.get_data())
            let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/save`
            this.$axios.post(url, JSON.stringify(this.formData), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(res => {
                if (res.resultCode === 500) {
                    this.$message({
                        type: 'error',
                        message: '导图编码已存在!'
                    })
                }
                if (res.resultCode === 200) {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        deleteMind () {
            this.$confirm('您确定要删除该导图吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/delete/` + this.formData.id
                this.$axios.post(url).then(res => {
                    if (res.resultCode === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                    this.$router.push('/jsmind')
                    location.reload()
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
            })
        }
    }
}
</script>

<style scoped>
.header{
    height: 60px;
    background-color: #eee;
    border-bottom: solid 1px #aaa;
    z-index: 100;
}
.footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    overflow: hidden;
    background-color: #f2f2f2;
    border-top: solid 1px #bbb;
}
</style>

