<template>
    <Menu mode="vertical"
          :theme="theme"
          active-name="1"
          width="200px"
          @on-select="turnUrl"
          :active-name="$route.name"
    >
        <MenuItem name="newDocument1">
            <Icon type="md-arrow-round-up" />
            添加文档
        </MenuItem>
        <MenuItem name="docReview">
            <Icon type="md-checkmark-circle-outline" />
            文档审核
        </MenuItem>
        <MenuItem name="allDocuments">
            <Icon type="md-folder-open"/>
            全部文档
        </MenuItem>
        <MenuItem name="category">
            <Icon type="md-archive"/>
            文档分类
        </MenuItem>
        <MenuItem name="tags">
            <Icon type="md-pricetag"/>
            文档标签
        </MenuItem>
        <MenuItem name="commentManage">
            <Icon type="md-chatboxes" />
            评论管理
        </MenuItem>
        <MenuItem name="users">
            <Icon type="md-contact"/>
            用户管理
        </MenuItem>
        <MenuItem name="stats">
            <Icon type="ios-podium"/>
            文档统计
        </MenuItem>
        <MenuItem name="systemConfig">
            <Icon type="ios-hammer" />
            系统设置
        </MenuItem>
    </Menu>
</template>
<script>
export default {
    data() {
        return {
            theme: 'light'
        }
    },
    methods: {
        turnUrl(name) {
            this.$router.push(name);
        }
    },
}
</script>

<style scoped>
/deep/ .ivu-menu-light {
    height: 100% !important;
}

.ivu-menu {
    height: 100%;
}
</style>
