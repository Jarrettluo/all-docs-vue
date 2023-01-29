import {
    SYSTEM_CONFIG_URL,
    SYSTEM_CONFIG_UPDATE_URL,
    DOWN_PROHIBITED_WORD_URL,
    UP_PROHIBITED_WORD_URL,
} from './url'

import {Get, Post, Delete, Put, Download} from "@/api/request";

export default {

    getSystemConfig: (params) => {
        return Get(SYSTEM_CONFIG_URL, params);
    },

    updateSystemConfig: (params) => {
        return Put(SYSTEM_CONFIG_UPDATE_URL, params);
    },

    getProhibitedWordFile: (param) => {
        return Download(DOWN_PROHIBITED_WORD_URL, {params: {}, responseType: 'blob'})
    },

    updateProhibitedWordFile: (param) => {
        return Post(UP_PROHIBITED_WORD_URL, param)
    }

}

