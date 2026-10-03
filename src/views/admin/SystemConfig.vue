<template>
    <div class="system-config-container">
        <div class="config-header">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>系统设置</span>
        </div>

        <Row :gutter="24">
            <!-- 左列 -->
            <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <!-- 用户权限 -->
                <div class="config-group">
                    <div class="group-title">用户权限</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">普通用户上传功能</span>
                            <span class="config-desc">允许普通用户上传文档</span>
                        </div>
                        <i-switch v-model="config.userUpload" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">管理员强制审核</span>
                            <span class="config-desc">上传文档需管理员审核</span>
                        </div>
                        <i-switch v-model="config.adminReview" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">违禁词检测</span>
                            <span class="config-desc">检测文档中的违禁词</span>
                        </div>
                        <i-switch v-model="config.prohibitedWordReminder" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">用户注册</span>
                            <span class="config-desc">允许新用户自行注册</span>
                        </div>
                        <i-switch v-model="config.userRegistry" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                </div>

                <!-- 上传设置 -->
                <div class="config-group">
                    <div class="group-title">上传设置</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">文件大小限制</span>
                            <span class="config-desc">单个文件最大上传大小</span>
                        </div>
                        <Select v-model="config.maxFileSize" style="width: 110px" @on-change="updateConfig">
                            <Option value="10">10MB</Option>
                            <Option value="50">50MB</Option>
                            <Option value="100">100MB</Option>
                            <Option value="200">200MB</Option>
                        </Select>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">允许的文件类型</span>
                            <span class="config-desc">可上传的文档格式</span>
                        </div>
                        <Select v-model="config.allowedFileTypes" multiple style="width: 200px" @on-change="updateConfig">
                            <Option value="pdf">PDF</Option>
                            <Option value="docx">Word</Option>
                            <Option value="xlsx">Excel</Option>
                            <Option value="pptx">PPT</Option>
                            <Option value="image">图片</Option>
                            <Option value="zip">压缩包</Option>
                        </Select>
                    </div>
                </div>

                <!-- 安全设置 -->
                <div class="config-group">
                    <div class="group-title">安全设置</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">登录失败锁定</span>
                            <span class="config-desc">连续失败后锁定账户</span>
                        </div>
                        <i-switch v-model="config.loginLock" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">会话超时时间</span>
                            <span class="config-desc">无操作自动退出登录</span>
                        </div>
                        <Select v-model="config.sessionTimeout" style="width: 110px" @on-change="updateConfig">
                            <Option value="30">30分钟</Option>
                            <Option value="60">1小时</Option>
                            <Option value="120">2小时</Option>
                            <Option value="480">8小时</Option>
                        </Select>
                    </div>
                </div>
            </Col>

            <!-- 右列 -->
            <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <!-- 搜索设置 -->
                <div class="config-group">
                    <div class="group-title">搜索设置</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">全文搜索</span>
                            <span class="config-desc">启用文档全文检索功能</span>
                        </div>
                        <i-switch v-model="config.fullTextSearch" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">搜索结果数量</span>
                            <span class="config-desc">每页显示的搜索结果</span>
                        </div>
                        <Select v-model="config.searchPageSize" style="width: 100px" @on-change="updateConfig">
                            <Option value="10">10条</Option>
                            <Option value="20">20条</Option>
                            <Option value="50">50条</Option>
                        </Select>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">搜索历史记录</span>
                            <span class="config-desc">记录用户搜索关键词</span>
                        </div>
                        <i-switch v-model="config.saveSearchHistory" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                </div>

                <!-- 显示设置 -->
                <div class="config-group">
                    <div class="group-title">显示设置</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">每页文档数量</span>
                            <span class="config-desc">文档列表每页显示条数</span>
                        </div>
                        <Select v-model="config.pageSize" style="width: 100px" @on-change="updateConfig">
                            <Option value="10">10条</Option>
                            <Option value="20">20条</Option>
                            <Option value="50">50条</Option>
                            <Option value="100">100条</Option>
                        </Select>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">排序默认方式</span>
                            <span class="config-desc">文档列表默认排序</span>
                        </div>
                        <Select v-model="config.defaultSort" style="width: 130px" @on-change="updateConfig">
                            <Option value="time">按时间</Option>
                            <Option value="name">按名称</Option>
                            <Option value="size">按大小</Option>
                            <Option value="download">按下量</Option>
                        </Select>
                    </div>
                </div>

                <!-- 敏感词管理 -->
                <div class="config-group">
                    <div class="group-title">敏感词管理</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">敏感词文件</span>
                            <span class="config-desc">管理违禁词词典，每行一个词汇</span>
                        </div>
                        <div class="btn-group">
                            <Button size="small" @click="downloadProhibitedFile">下载</Button>
                            <Button size="small" type="primary" @click="uploadDialogShow">上传</Button>
                        </div>
                    </div>
                </div>

                <!-- 数据备份 -->
                <div class="config-group">
                    <div class="group-title">数据备份</div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">自动备份</span>
                            <span class="config-desc">定期自动备份系统数据</span>
                        </div>
                        <i-switch v-model="config.autoBackup" true-value="open" false-value="close" @on-change="updateConfig"/>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <span class="config-label">备份周期</span>
                            <span class="config-desc">数据备份的频率</span>
                        </div>
                        <Select v-model="config.backupCycle" style="width: 120px" @on-change="updateConfig">
                            <Option value="daily">每日</Option>
                            <Option value="weekly">每周</Option>
                            <Option value="monthly">每月</Option>
                        </Select>
                    </div>
                </div>
            </Col>
        </Row>

        <input type="file" ref="fileToUpload" style="display: none" accept=".txt" @change="changeFile"/>
    </div>
</template>

<script>
import systemConfig from '@/api/system'

export default {
    name: "SystemConfig",
    data() {
        return {
            config: {
                userUpload: 'open',
                adminReview: 'open',
                prohibitedWordReminder: 'open',
                userRegistry: 'close',
                maxFileSize: '100',
                allowedFileTypes: ['pdf', 'docx', 'xlsx', 'pptx'],
                fullTextSearch: 'open',
                searchPageSize: '20',
                saveSearchHistory: 'open',
                loginLock: 'open',
                sessionTimeout: '60',
                pageSize: '20',
                defaultSort: 'time',
                autoBackup: 'close',
                backupCycle: 'weekly'
            }
        }
    },
    mounted() {
        this.getSystemConfig()
    },
    methods: {
        async getSystemConfig() {
            await systemConfig.getSystemConfig().then(res => {
                if (res.code === 200) {
                    this.config.userUpload = res.data.userUpload ? 'open' : 'close';
                    this.config.adminReview = res.data.adminReview ? 'open' : 'close';
                    this.config.prohibitedWordReminder = res.data.prohibitedWord ? 'open' : 'close';
                    this.config.userRegistry = res.data.userRegistry ? 'open' : 'close';
                    if (res.data.maxFileSize) this.config.maxFileSize = String(res.data.maxFileSize);
                    if (res.data.allowedFileTypes) this.config.allowedFileTypes = res.data.allowedFileTypes;
                    if (res.data.fullTextSearch !== undefined) this.config.fullTextSearch = res.data.fullTextSearch ? 'open' : 'close';
                    if (res.data.searchPageSize) this.config.searchPageSize = String(res.data.searchPageSize);
                    if (res.data.loginLock !== undefined) this.config.loginLock = res.data.loginLock ? 'open' : 'close';
                    if (res.data.sessionTimeout) this.config.sessionTimeout = String(res.data.sessionTimeout);
                    if (res.data.pageSize) this.config.pageSize = String(res.data.pageSize);
                    if (res.data.defaultSort) this.config.defaultSort = res.data.defaultSort;
                    if (res.data.saveSearchHistory !== undefined) this.config.saveSearchHistory = res.data.saveSearchHistory ? 'open' : 'close';
                    if (res.data.autoBackup !== undefined) this.config.autoBackup = res.data.autoBackup ? 'open' : 'close';
                    if (res.data.backupCycle) this.config.backupCycle = res.data.backupCycle;
                }
            }).catch(() => {})
        },
        async updateConfig() {
            let param = {
                userUpload: this.config.userUpload === 'open',
                adminReview: this.config.adminReview === 'open',
                prohibitedWord: this.config.prohibitedWordReminder === 'open',
                userRegistry: this.config.userRegistry === 'open',
                maxFileSize: Number(this.config.maxFileSize),
                allowedFileTypes: this.config.allowedFileTypes,
                fullTextSearch: this.config.fullTextSearch === 'open',
                searchPageSize: Number(this.config.searchPageSize),
                loginLock: this.config.loginLock === 'open',
                sessionTimeout: Number(this.config.sessionTimeout),
                pageSize: Number(this.config.pageSize),
                defaultSort: this.config.defaultSort,
                saveSearchHistory: this.config.saveSearchHistory === 'open',
                autoBackup: this.config.autoBackup === 'open',
                backupCycle: this.config.backupCycle
            }
            await systemConfig.updateSystemConfig(param).then(res => {
                if (res.code !== 200) this.$Message.error(res.message)
            }).catch(() => {})
        },
        uploadDialogShow() {
            this.$refs.fileToUpload.dispatchEvent(new MouseEvent("click"));
        },
        changeFile() {
            const inputFile = this.$refs.fileToUpload.files[0];
            if (!inputFile) return;
            let formData = new FormData();
            formData.set("file", inputFile);
            systemConfig.updateProhibitedWordFile(formData).then(res => {
                if (res.code === 200) this.$Message.success("更新成功");
                else this.$Message.error(res.message);
            });
        },
        async downloadProhibitedFile() {
            await systemConfig.getProhibitedWordFile().then(res => {
                const dom = document.createElement('a');
                dom.href = URL.createObjectURL(res);
                dom.download = '敏感词文件.txt';
                dom.click();
                this.$Message.success("下载成功");
            }).catch(() => {});
        }
    }
}
</script>

<style scoped lang="scss">
.system-config-container {
    padding: 20px;
    background: #f5f5f5;
    min-height: calc(100vh - 100px);
}

.config-header {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;

    .header-icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
        color: #f4d057;
    }
}

.config-group {
    background: #fff;
    border-radius: 4px;
    padding: 16px 20px;
    margin-bottom: 16px;

    .group-title {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 12px;
        padding-bottom: 8px;
        padding-left: 8px;
        border-left: 3px solid #f4d057;
    }
}

.config-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #fafafa;

    &:last-child {
        border-bottom: none;
    }

    .config-item {
        display: flex;
        flex-direction: column;

        .config-label {
            font-size: 14px;
            color: #303133;
        }

        .config-desc {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
        }
    }

    .btn-group {
        display: flex;
        gap: 8px;
    }
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    .info-item {
        text-align: center;
        padding: 12px 8px;
        background: #fafafa;
        border-radius: 4px;

        .info-value {
            display: block;
            font-size: 18px;
            font-weight: 600;
            color: #f4d057;
        }

        .info-label {
            display: block;
            font-size: 12px;
            color: #999;
            margin-top: 4px;
        }
    }
}
</style>
