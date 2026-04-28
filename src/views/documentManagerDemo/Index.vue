<template>
  <div class="document-manager">
    <div class="header-banner">
      <SearchBanner @search="handleSearch" />
    </div>

    <div class="tag-bar-wrapper">
      <TagBar
        :tagOptions="tagOptions"
        :selectedTags="selectedTags"
        @tag-change="handleTagChange"
      />
    </div>

    <div class="main-content">
      <div class="sidebar-wrapper">
        <CategorySidebar
          :categories="categories"
          :selectedCategory="selectedCategory"
          @category-change="handleCategoryChange"
        />
      </div>

      <div class="table-area">
        <div class="table-wrapper">
          <Spin size="large" fix v-if="loading"></Spin>
          <DocumentTable
            :tableData="tableData"
            :loading="loading"
            :total="total"
            ref="documentTable"
            @search="handleSearch"
            @collect="handleCollect"
            @like="handleLike"
            @preview="handlePreview"
            @download="handleDownload"
          />
        </div>
        <div class="pagination-wrapper">
          <Page
            :current.sync="currentPage"
            :total="total"
            :page-size="pageSize"
            show-elevator
            show-sizer
            :page-size-opts="[10, 20, 50, 100]"
            @on-change="handlePageChange"
            @on-page-size-change="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBanner from './components/SearchBanner.vue'
import TagBar from './components/TagBar.vue'
import CategorySidebar from './components/CategorySidebar.vue'
import DocumentTable from './components/DocumentTable.vue'
import DocumentManagerApi from './api/documentManager'
import CategoryRequest from '@/api/category'
import CollectRequest from '@/api/collect'
import DocumentRequest from '@/api/document'

export default {
  name: 'DocumentManagerDemo',
  components: {
    SearchBanner,
    TagBar,
    CategorySidebar,
    DocumentTable
  },
  data() {
    return {
      searchKeyword: '',
      fullTextEnabled: false,
      segmentEnabled: false,
      searchType: 'all',
      selectedTags: ['all'],
      selectedCategory: '',
      tableData: [],
      total: 0,
      loading: false,
      loadingDelay: 200,
      categories: [],
      tagOptions: [],
      currentPage: 1,
      pageSize: 10,
      sortField: 'name',
      sortOrder: 'asc'
    }
  },
  created() {
    this.initMeta()
  },
  methods: {
    initMeta() {
      this.fetchCategories()
      this.fetchTags()
      this.fetchData()
    },
    fetchCategories() {
      CategoryRequest.getListData({ type: 'CATEGORY' }).then(res => {
        if (res.code === 200) {
          this.categories = res.data || []
        }
      }).catch(err => {
        console.error('获取分类失败:', err)
      })
    },
    fetchTags() {
      CategoryRequest.getListData({ type: 'TAG' }).then(res => {
        if (res.code === 200) {
          const tagMap = {
            'pdf': { color: 'red' },
            'docx': { color: 'blue' },
            'xlsx': { color: 'green' },
            'pptx': { color: 'orange' },
            'image': { color: 'purple' },
            'zip': { color: 'magenta' }
          }
          this.tagOptions = [
            { id: 'all', name: '全部', value: 'all', color: 'default' },
            ...(res.data || []).map(item => ({
              id: item.id,
              name: item.name,
              value: item.name.toLowerCase(),
              color: tagMap[item.name.toLowerCase()] ? tagMap[item.name.toLowerCase()].color : 'default'
            }))
          ]
        }
      }).catch(err => {
        console.error('获取标签失败:', err)
      })
    },
    handleSearch(params = {}) {
      this.searchKeyword = params.keyword !== undefined ? params.keyword : this.searchKeyword
      this.fullTextEnabled = params.fullText !== undefined ? params.fullText : this.fullTextEnabled
      this.segmentEnabled = params.segment !== undefined ? params.segment : this.segmentEnabled
      this.searchType = params.searchType !== undefined ? params.searchType : this.searchType
      this.selectedTags = params.tag !== undefined ? params.tag : this.selectedTags
      this.selectedCategory = params.category !== undefined ? params.category : this.selectedCategory
      this.sortField = params.sortField || this.sortField
      this.sortOrder = params.sortOrder || this.sortOrder
      this.currentPage = params.page || 1
      this.pageSize = params.pageSize || this.pageSize

      this.fetchData()
    },
    handleTagChange(tags) {
      this.selectedTags = tags
      this.currentPage = 1
      this.fetchData()
    },
    handleCategoryChange(category) {
      this.selectedCategory = category
      this.currentPage = 1
      this.fetchData()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchData()
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.fetchData()
    },
    handleCollect(row) {
      if (row.collected) {
        CollectRequest.deleteData({ docId: row.id }).then(res => {
          if (res.code === 200) {
            row.collected = false
            this.$Message.success('取消收藏成功')
          }
        }).catch(err => {
          this.$Message.error('取消收藏失败')
        })
      } else {
        CollectRequest.postData({ docId: row.id }).then(res => {
          if (res.code === 200) {
            row.collected = true
            this.$Message.success('收藏成功')
          }
        }).catch(err => {
          this.$Message.error('收藏失败')
        })
      }
    },
    handleLike(row) {
      if (row.liked) {
        DocumentRequest.removeLike(row.id).then(res => {
          if (res.code === 200) {
            row.liked = false
            this.$Message.success('取消点赞成功')
          }
        }).catch(err => {
          this.$Message.error('取消点赞失败')
        })
      } else {
        DocumentRequest.addLike(row.id).then(res => {
          if (res.code === 200) {
            row.liked = true
            this.$Message.success('点赞成功')
          }
        }).catch(err => {
          this.$Message.error('点赞失败')
        })
      }
    },
    handlePreview(row) {
      const previewUrl = DocumentManagerApi.getPreviewUrl(row.id)
      window.open(previewUrl, '_blank')
    },
    handleDownload(row) {
      this.$router.push({
        path: '/preview',
        query: { docId: row.id }
      })
    },
    fetchData() {
      let loadTimer = null
      if (!this.loading) {
        loadTimer = setTimeout(() => {
          this.loading = true
        }, this.loadingDelay)
      }
      const params = {
        keyword: this.searchKeyword,
        fullText: this.fullTextEnabled,
        segment: this.segmentEnabled,
        searchType: this.searchType,
        tags: this.selectedTags.includes('all') ? [] : this.selectedTags,
        category: this.selectedCategory || undefined,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      DocumentManagerApi.searchList(params).then(res => {
        clearTimeout(loadTimer)
        if (res.code === 200) {
          this.tableData = res.data && res.data.list ? res.data.list : []
          this.total = res.data && res.data.total ? res.data.total : 0
        } else {
          this.tableData = []
          this.total = 0
        }
        this.loading = false
      }).catch(err => {
        clearTimeout(loadTimer)
        console.error('获取文档列表失败:', err)
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
.document-manager {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .header-banner {
    flex-shrink: 0;
  }

  .tag-bar-wrapper {
    flex-shrink: 0;
  }

  .main-content {
    flex: 1;
    display: flex;
    gap: 12px;
    min-height: 0;

    .sidebar-wrapper {
      flex-shrink: 0;
    }

    .table-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;

      .table-wrapper {
        flex: 1;
        overflow: hidden;
      }

      .pagination-wrapper {
        padding: 12px 0;
        text-align: right;
        background: #fff;
        border-radius: 8px;
        margin-top: 12px;
      }
    }
  }
}
</style>
