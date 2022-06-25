import {
    ADD_RELATE_URL,
    CATE_NO_RELATE_URL,

    CATE_LIST_URL,
    CATE_ADD_URL,
    CATE_REMOVE_URL,
    CATE_UPDATE_URL

} from './url'

import { Get,Post,Put,Delete } from "@/api/request";

export default {
    getRelateData: (params) => {
        return Get(ADD_RELATE_URL,params);
    },
    deleteRelateData: (params) => {
        return Delete(CATE_NO_RELATE_URL,params);
    },

    getListData: (params) => {
        return Get(CATE_LIST_URL,params);
    },

    postData: (params) => {
        return Post(CATE_ADD_URL,params);
    },

    deleteData: (params) => {
        return Delete(CATE_REMOVE_URL,params);
    },
    putData: (params) => {
        return Put(CATE_UPDATE_URL,params);
    }
}

