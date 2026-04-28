<template>
  <div class="category-sidebar">
    <div class="sidebar-title">文档分类</div>
    <div class="category-list">
      <div
        :class="['category-item', { active: selectedCategory === '' }]"
        @click="handleCategoryClick('')"
      >
        <Icon type="ios-folder" />
        <span class="category-name">全部分类</span>
      </div>
      <div
        v-for="item in sortedCategories"
        :key="item.id"
        :class="['category-item', { active: selectedCategory === item.name }]"
        @click="handleCategoryClick(item.name)"
      >
        <Icon type="ios-folder" />
        <span class="category-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySidebar',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    selectedCategory: {
      type: String,
      default: ''
    }
  },
  computed: {
    sortedCategories() {
      return [...this.categories].sort((a, b) =>
        a.name.localeCompare(b.name, 'zh-CN')
      )
    }
  },
  methods: {
    handleCategoryClick(categoryName) {
      this.$emit('category-change', categoryName)
    }
  }
}
</script>

<style scoped lang="scss">
.category-sidebar {
  width: 200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .sidebar-title {
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    text-align: left;
  }

  .category-list {
    max-height: calc(100vh - 350px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 2px;
    }
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
    font-size: 14px;
    text-align: left;

    &:hover {
      background: #f5f5f5;
      color: #333;
    }

    &.active {
      background: rgba(244, 208, 87, 0.15);
      color: #8d7b25;
      font-weight: 500;
    }

    .category-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
