import {
    DOC_SEARCH_LIST_URL,
    COLLECT_ADD_URL,
    COLLECT_REMOVE_URL,
    DOC_VIEW_URL,
    DOC_DOWNLOAD,
    CATE_LIST_URL
} from '@/api/url'

import { Get, Post, Delete } from '@/api/request'

export default {
    // 文档搜索列表（新增接口）
    searchList: (params) => {
        return Post(DOC_SEARCH_LIST_URL, params)
    },

    // 分类列表
    getCategories: (params) => {
        return Get(CATE_LIST_URL, params)
    },

    // 收藏文档
    addCollect: (params) => {
        return Post(COLLECT_ADD_URL, params)
    },

    // 取消收藏
    removeCollect: (params) => {
        return Delete(COLLECT_REMOVE_URL, params)
    },

    // 文档预览
    getPreviewUrl: (docId) => {
        return DOC_VIEW_URL + docId
    },

    // 文档下载
    getDownloadUrl: (docId) => {
        return DOC_DOWNLOAD + docId
    }
}
