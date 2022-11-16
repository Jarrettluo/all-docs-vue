import {
    DOC_DETAIL_URL,
    DOC_LIST_URL,
    DOC_REMOVE_URL,
    DOC_WITH_CHECK_URL,

    DOC_VIEW_URL,
    DOC_TXT_URL,
    DOC_REBUILD_URL

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

    getDataWithCheck: (params) => {
        return Get(DOC_WITH_CHECK_URL, params);
    },

    getView: (param) => {
        return Get(DOC_VIEW_URL + param, null)
    },

    getTxtFile: (param) => {
        return Download(DOC_TXT_URL + param, {params: {}, responseType: 'blob'})
    },

    getRebuildIndex: (param) => {
        return Get(DOC_REBUILD_URL, param);
    }

}

