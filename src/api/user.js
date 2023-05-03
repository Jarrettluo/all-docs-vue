import {
    USER_ADD_URL,
    USER_REMOVE_URL,
    USER_LOGIN_URL,
    ALL_USER_URL,
    USER_INFO_URL,
    USER_UPDATE_URL,
    USER_ADD_AVATAR_URL,
    USER_CHANGE_ROLE_URL,
    BLOCK_USER_URL,
    CHECK_USER_LOGIN_URL,
    RESET_USER_PWD_URL

} from './url'

import {Get, Post, Delete, Put} from "@/api/request";

export default {

    postData: (params) => {
        return Post(USER_ADD_URL, params);
    },

    deleteData: (params) => {
        return Delete(USER_REMOVE_URL, params);
    },

    postUserLogin: (data) => {
        return Post(USER_LOGIN_URL, data);
    },

    getUserList: (params) => {
        return Get(ALL_USER_URL, params);
    },

    getUser: (params) => {
        return Post(USER_INFO_URL, params);
    },

    updateUser: (params) => {
        return Put(USER_UPDATE_URL, params);
    },

    addUserAvatar: (params) => {
        return Post(USER_ADD_AVATAR_URL, params)
    },

    changeRole: (params) => {
        return Put(USER_CHANGE_ROLE_URL, params);
    },

    blockUser: (params) => {
        return Get(BLOCK_USER_URL, params);
    },

    checkUserLogin: (params) => {
        return Get(CHECK_USER_LOGIN_URL, params);
    },

    resetUserPassword: (params) => {
        return Post(RESET_USER_PWD_URL, params)
    }
}

