import {Get,Post,Put,Patch,Delete} from "@/api/request";

export default {
    getListData: (params) => {
        return Get('../../static/data.json',params);
    },
    postListData: (params) => {
        return Post('../../static/data.json',params);
    },
    deleteListData: (params) => {
        return Delete('../../static/data.json',params);
    }
}
