import {
    COLLECT_ADD_URL,
    COLLECT_REMOVE_URL
} from './url'

import {Post, Delete} from "@/api/request";

export default {
    postData: (params) => {
        return Post(COLLECT_ADD_URL, params);
    },

    deleteData: (params) => {
        return Delete(COLLECT_REMOVE_URL, params);
    }
}

