import {
    ADD_RELATE_URL,
    CATE_NO_RELATE_URL,

    CATE_LIST_URL,
    CATE_ADD_URL,
    CATE_REMOVE_URL,
    CATE_UPDATE_URL,
    QUERY_BY_CATE_URL,

    MY_COLLECT_URL,
    MY_UPLOAD_URL,

} from './url'

import {Get, Post, Put, Delete} from "@/api/request";

export default {
    postRelateData: (params) => {
        return Post(ADD_RELATE_URL, params);
    },
    deleteRelateData: (params) => {
        return Delete(CATE_NO_RELATE_URL, params);
    },

    getListData: (params) => {
        return Get(CATE_LIST_URL, params);
    },

    postData: (params) => {
        return Post(CATE_ADD_URL, params);
    },

    deleteData: (params) => {
        return Delete(CATE_REMOVE_URL, params);
    },
    putData: (params) => {
        return Put(CATE_UPDATE_URL, params);
    },

    getDocList: (params) => {
        return Get(QUERY_BY_CATE_URL, params);
    },

    getMyCollectList: (params) => {
        return Get(MY_COLLECT_URL, params);
    },

    getMyUploadList: (params) => {
        return Get(MY_UPLOAD_URL, params);
    },
}

