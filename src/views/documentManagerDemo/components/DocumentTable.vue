<template>
  <div class="document-table">
    <Table
      :columns="columns"
      :data="tableData"
      :loading="loading"
      border
      highlight-row
      size="small"
      resizable
      @on-sort-change="handleSortChange"
    >
      <!-- 名称列 -->
      <template #name="{ row }">
        <span class="doc-name" @click="handleDocNameClick(row)">{{ row.name }}</span>
      </template>

      <!-- 类型列 -->
      <template #type="{ row }">
        <Tag :color="getTypeColor(row.type)">{{ getTypeName(row.type) }}</Tag>
      </template>

      <!-- 大小列 -->
      <template #size="{ row }">
        <span class="size-text">{{ formatSize(row.size) }}</span>
      </template>

      <!-- 描述列 -->
      <template #description="{ row }">
        <span class="description-text" v-html="row.description"></span>
      </template>

      <!-- 分类列 -->
      <template #category="{ row }">
        <span class="category-text">{{ row.category }}</span>
      </template>

      <!-- 标签列 -->
      <template #tags="{ row }">
        <Tag
          v-for="(tag, index) in row.tags"
          :key="index"
          :color="tag.color"
          style="margin-right: 4px;"
        >
          {{ tag.name }}
        </Tag>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <ActionCell
          :row="row"
          @collect="handleCollect"
          @like="handleLike"
          @preview="handlePreview"
          @download="handleDownload"
        />
      </template>
    </Table>
  </div>
</template>

<script>
import ActionCell from './ActionCell.vue'
import fileUtil from '@/utils/fileUtil'

const typeMap = {
  pdf: { name: 'PDF', color: 'red' },
  docx: { name: 'Word', color: 'blue' },
  xlsx: { name: 'Excel', color: 'green' },
  pptx: { name: 'PPT', color: 'orange' },
  image: { name: '图片', color: 'purple' },
  zip: { name: '压缩包', color: 'magenta' }
}

export default {
  name: 'DocumentTable',
  components: { ActionCell },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sortField: 'name',
      sortOrder: 'asc',
      columns: [
        {
          title: '名称',
          slot: 'name',
          minWidth: 200,
          sortable: true
        },
        {
          title: '类型',
          slot: 'type',
          width: 100,
          align: 'center'
        },
        {
          title: '大小',
          slot: 'size',
          width: 100,
          align: 'center',
          sortable: true
        },
        {
          title: '描述',
          slot: 'description',
          minWidth: 200,
          ellipsis: true
        },
        {
          title: '分类',
          slot: 'category',
          width: 120,
          align: 'center'
        },
        {
          title: '标签',
          slot: 'tags',
          width: 180
        },
        {
          title: '操作',
          slot: 'action',
          width: 320,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    formatSize(bytes) {
      return fileUtil.bytesToSize(bytes)
    },
    getTypeName(type) {
      return typeMap[type] ? typeMap[type].name : type.toUpperCase()
    },
    getTypeColor(type) {
      return typeMap[type] ? typeMap[type].color : 'default'
    },
    handleSortChange({ key, order }) {
      this.sortField = key
      this.sortOrder = order
      this.$emit('search', {
        keyword: this.$parent.searchKeyword,
        fullText: this.$parent.fullTextEnabled,
        segment: this.$parent.segmentEnabled,
        searchType: this.$parent.searchType,
        tag: this.$parent.selectedTags,
        category: this.$parent.selectedCategory,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        page: this.$parent.currentPage,
        pageSize: this.$parent.pageSize
      })
    },
    handleCollect(row) {
      this.$emit('collect', row)
    },
    handleLike(row) {
      this.$emit('like', row)
    },
    handleDocNameClick(row) {
      this.$router.push({
        path: '/preview',
        query: { docId: row.id }
      })
    },
    handlePreview(row) {
      this.$emit('preview', row)
    },
    handleDownload(row) {
      this.$emit('download', row)
    }
  }
}
</script>

<style scoped lang="scss">
.document-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;

  ::v-deep .ivu-table {
    font-size: 13px;

    .ivu-table-header th {
      font-weight: 600;
      background: #fafafa;
    }

    .ivu-table-row {
      td {
        padding: 8px 4px;
      }
    }
  }

  .doc-name {
    color: #8d7b25;
    cursor: pointer;
    font-weight: normal;

    &:hover {
      text-decoration: underline;
    }
  }

  .size-text {
    font-weight: normal;
    white-space: nowrap;
  }

  .description-text {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    color: #666;

    em {
      font-style: normal;
      background: #fff3bf;
      padding: 0 2px;
    }
  }

  .category-text {
    font-weight: normal;
    color: #666;
  }
}
</style>
