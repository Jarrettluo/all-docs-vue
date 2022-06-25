import {
    USER_ADD_URL,
    USER_REMOVE_URL,
} from './url'

import { Get,Post,Put,Delete } from "@/api/request";

export default {

    postData: (params) => {
        return Post(USER_ADD_URL, params);
    },

    deleteData: (params) => {
        return Delete(USER_REMOVE_URL, params);
    }
}

