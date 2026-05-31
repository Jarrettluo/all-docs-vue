<template>
  <div class="search-banner">
    <div class="banner-row">
      <div class="logo-wrapper" @click="$router.push('/')">
        <img :src="logoSrc" alt="logo" class="logo-img" />
      </div>
      <div class="search-input-wrapper">
        <div class="search-selection" @click="showDropdown = !showDropdown">
          <span>{{ selectedLabel }}</span>
          <Icon type="ios-arrow-down" />
          <div class="dropdown-menu" v-show="showDropdown" @click.stop>
            <div
              v-for="item in dropdownOptions"
              :key="item.value"
              :class="['dropdown-item', { active: searchType === item.value }]"
              @click="selectType(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <input
          class="search-input"
          v-model="searchKeyword"
          :placeholder="placeholder"
          @keyup.enter="handleSearch"
        />
        <div class="search-icon" @click="handleSearch">
          <Icon type="ios-search" />
        </div>
      </div>
    </div>
    <div class="options-row">
      <div class="option-item">
        <span>全文检索</span>
        <i-switch v-model="fullTextEnabled" size="small" />
      </div>
      <div class="option-item">
        <span>分词</span>
        <i-switch v-model="segmentEnabled" size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBanner',
  data() {
    return {
      logoSrc: require('@/assets/svg/newLogo.svg'),
      searchKeyword: '',
      fullTextEnabled: true,
      segmentEnabled: false,
      searchType: 'all',
      showDropdown: false,
      placeholder: '请输入您想要查找的文档',
      dropdownOptions: [
        { label: '全部', value: 'all' },
        { label: '名称', value: 'name' },
        { label: '描述', value: 'description' }
      ]
    }
  },
  computed: {
    selectedLabel() {
      const item = this.dropdownOptions.find(o => o.value === this.searchType)
      return item ? item.label : '全部'
    }
  },
  methods: {
    handleSearch() {
      this.showDropdown = false
      this.$emit('search', {
        keyword: this.searchKeyword,
        fullText: this.fullTextEnabled,
        segment: this.segmentEnabled,
        searchType: this.searchType
      })
    },
    selectType(item) {
      this.searchType = item.value
      this.showDropdown = false
    }
  }
}
</script>

<style scoped lang="scss">
.search-banner {
  background: linear-gradient(135deg, rgba(244, 208, 87, 0.12) 0%, rgba(252, 234, 200, 0.18) 100%);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  border: 1px solid rgba(244, 208, 87, 0.25);

  .banner-row {
    display: flex;
    align-items: center;
    gap: 16px;

    .logo-wrapper {
      width: 180px;
      height: 45px;
      flex-shrink: 0;

      .logo-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .search-input-wrapper {
      display: flex;
      width: 500px;
      height: 45px;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid #000;
      align-items: center;

      .search-selection {
        width: 90px;
        border-right: 1px solid #aaa;
        height: 43px;
        line-height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        font-size: 14px;
        position: relative;
        flex-shrink: 0;

        &:hover {
          color: #8d7b25;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 100;
          min-width: 100%;

          .dropdown-item {
            padding: 8px 16px;
            font-size: 14px;
            white-space: nowrap;

            &:hover {
              background: #f5f5f5;
            }

            &.active {
              color: #f4d057;
              font-weight: 500;
            }
          }
        }
      }

      .search-input {
        flex: 1;
        height: 43px;
        padding: 0 12px;
        border: none;
        outline: none;
        font-size: 14px;
      }

      .search-icon {
        width: 50px;
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;

        &:hover {
          background-color: #fceac8;
          border-radius: 0 8px 8px 0;
        }

        i {
          font-size: 18px;
          color: #666;
        }
      }
    }
  }

  .options-row {
    display: flex;
    gap: 24px;
    margin-top: 12px;
    padding-left: 196px;

    .option-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
