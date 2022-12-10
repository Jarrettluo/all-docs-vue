import {
    DOC_LOG_LIST_URL,
    DOC_LOG_REMOVE_URL

} from './url'

import {Get, Post, Delete, Download, Put} from "@/api/request";

export default {

    getDocLogList: (params) => {
        return Get(DOC_LOG_LIST_URL, params);
    },

    removeDocLog: (params) => {
        return Delete(DOC_LOG_REMOVE_URL, params);
    },

}
