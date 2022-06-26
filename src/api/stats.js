import { Get,Post,Put,Patch,Delete } from "@/api/request";
import { STATS_TREND_URL, STATS_ALL_URL } from './url'

export default {

    getTrendData: (params) => {
        return Get(STATS_TREND_URL,params);
    },

    postStatsData: (params) => {
        return Get(STATS_ALL_URL,params);
    }

}