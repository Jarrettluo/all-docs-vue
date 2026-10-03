<template>
  <div class="action-cell">
    <span
      :class="['action-text', { active: row.collected }]"
      @click="handleCollect"
    >
      {{ row.collected ? '已收藏' : '收藏' }}
    </span>
    <span
      :class="['action-text', { active: row.liked }]"
      @click="handleLike"
    >
      {{ row.liked ? '已点赞' : '点赞' }}
    </span>
    <span class="action-text" @click="handlePreview">预览</span>
    <span class="action-text" @click="handleDownload">下载</span>
  </div>
</template>

<script>
export default {
  name: 'ActionCell',
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCollect() {
      this.$emit('collect', this.row)
    },
    handleLike() {
      this.$emit('like', this.row)
    },
    handlePreview() {
      this.$emit('preview', this.row)
    },
    handleDownload() {
      this.$emit('download', this.row)
    }
  }
}
</script>

<style scoped lang="scss">
.action-cell {
  display: flex;
  align-items: center;
  gap: 12px;

  .action-text {
    cursor: pointer;
    font-size: 13px;
    color: #666;
    transition: color 0.2s;

    &:hover {
      color: #f4d057;
    }

    &.active {
      color: #f4d057;
    }
  }
}
</style>
