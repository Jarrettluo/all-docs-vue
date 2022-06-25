import {
    DOC_DETAIL_URL,
    DOC_LIST_URL,
    DOC_REMOVE_URL
} from './url'

import { Get,Post,Put,Delete } from "@/api/request";

export default {

    getData: (params) => {
        return Get(DOC_DETAIL_URL,params);
    },

    getListData: (params) => {
        return Get(DOC_LIST_URL,params);
    },

    deleteData: (params) => {
        return Delete(DOC_REMOVE_URL,params);
    },

}

