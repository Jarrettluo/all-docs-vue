import {Get, Post, Put, Patch, Delete} from "@/api/request";

export default {
    getListData: (params) => {
        return Get('/category/all', params);
    },
    postListData: (params) => {
        return Post('../../static/data.json', params);
    },
    deleteListData: (params) => {
        return Delete('../../static/data.json', params);
    }
}