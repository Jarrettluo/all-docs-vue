import {Get} from "@/api/request";
import {
    STATS_TREND_URL,
    STATS_ALL_URL,
    STATS_HOT_TREND,
    STATS_SEARCH_HISTORY,
    STATS_RECENT_DOC
} from './url'

export default {

    getTrendData: (params) => {
        return Get(STATS_TREND_URL, params);
    },

    postStatsData: (params) => {
        return Get(STATS_ALL_URL, params);
    },

    getHotTrend: (params) => {
        return Get(STATS_HOT_TREND, params);
    },

    getSearchHistory: (params) => {
        return Get(STATS_SEARCH_HISTORY, params);
    },

    getRecentDoc: (params) => {
        return Get(STATS_RECENT_DOC, params);
    },

}