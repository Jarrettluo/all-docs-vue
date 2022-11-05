import {
    COMMENT_ADD_URL,
    COMMENT_LIST_URL,
    COMMENT_REMOVE_URL,
    COMMENT_UPDATE_URL
} from './url'

import {Post, Put, Delete} from "@/api/request";

export default {

    getListData: (params) => {
        return Post(COMMENT_LIST_URL, params);
    },

    postData: (params) => {
        return Post(COMMENT_ADD_URL, params);
    },

    deleteData: (params) => {
        return Delete(COMMENT_REMOVE_URL, params);
    }
}

