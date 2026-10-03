<template>
  <div class="tag-bar">
    <Tag
      v-for="tag in tagOptions"
      :key="tag.value"
      :color="isSelected(tag.value) ? 'gold' : 'default'"
      :class="['tag-item', { active: isSelected(tag.value) }]"
      @click.native="handleTagClick(tag.value)"
    >
      {{ tag.name }}
    </Tag>
  </div>
</template>

<script>
export default {
  name: 'TagBar',
  props: {
    tagOptions: {
      type: Array,
      default: () => []
    },
    selectedTags: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    selectedTagsArray() {
      return this.selectedTags || []
    }
  },
  methods: {
    isSelected(value) {
      return this.selectedTagsArray.includes(value)
    },
    handleTagClick(value) {
      let newTags = [...this.selectedTagsArray]
      if (value === 'all') {
        newTags = ['all']
      } else {
        const allIndex = newTags.indexOf('all')
        if (allIndex > -1) {
          newTags.splice(allIndex, 1)
        }
        const index = newTags.indexOf(value)
        if (index > -1) {
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        if (newTags.length === 0) {
          newTags = ['all']
        }
      }
      this.$emit('tag-change', newTags)
    }
  }
}
</script>

<style scoped lang="scss">
.tag-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 8px;

  ::v-deep .ivu-tag {
    cursor: pointer;
    font-size: 12px;
    padding: 2px 8px;
    height: auto;
    line-height: 1.5;

    &.active {
      background: #f4d057;
      border-color: #f4d057;
      color: #fff !important;

      .ivu-tag-text {
        color: #fff !important;
      }
    }
  }
}
</style>
