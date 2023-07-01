import {
    DOC_DETAIL_URL,
    DOC_LIST_URL,
    DOC_REMOVE_URL,
    DOC_UPDATE_URL,
    DOC_WITH_CHECK_URL,

    DOC_UPLOAD_URL,
    DOC_UPLOAD_BATCH_URL,
    DOC_UPLOAD_BY_URL_URL,

    DOC_VIEW_URL,
    DOC_TXT_URL,
    DOC_REBUILD_URL,

    ADD_LIKE_URL,
    GET_LIKE_URL

} from './url'

import {Get, Post, Delete, Download} from "@/api/request";

export default {

    getData: (params) => {
        return Get(DOC_DETAIL_URL, params);
    },

    getListData: (params) => {
        return Post(DOC_LIST_URL, params);
    },

    deleteData: (params) => {
        return Delete(DOC_REMOVE_URL, params);
    },

    updateData: (params) => {
        return Put(DOC_UPDATE_URL_URL, params);
    },

    getDataWithCheck: (params) => {
        return Get(DOC_WITH_CHECK_URL, params);
    },

    // 必须登录以后进行上传
    docUpload: (param, config) => {
        return Post(DOC_UPLOAD_URL, param, config)
    },

    docUploadBatch: (param, config) => {
        return Post(DOC_UPLOAD_BATCH_URL, param, config)
    },

    docUploadByUrl: (param, config) => {
        return Post(DOC_UPLOAD_BY_URL_URL, param, config)
    },

    getView: (param) => {
        return Get(DOC_VIEW_URL + param, null)
    },

    getTxtFile: (param) => {
        return Download(DOC_TXT_URL + param, {params: {}, responseType: 'blob'})
    },

    getRebuildIndex: (param) => {
        return Get(DOC_REBUILD_URL, param);
    },

    addLike: (param) => {
        return Post(ADD_LIKE_URL, null, param)
    },

    getLikeInfo: (param) => {
        return Get(GET_LIKE_URL, param)
    },

}

