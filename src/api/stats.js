import {Get, Put} from "@/api/request";
import {
    STATS_TREND_URL,
    STATS_ALL_URL,
    STATS_HOT_TREND,
    STATS_SEARCH_HISTORY,
    REMOVE_SEARCH_KEY,
    STATS_RECENT_DOC,
    STATS_MONTH_URL,
    STATS_DOC_TYPE_DIST,
    STATS_CATEGORY_DIST,
    STATS_HOT_DOCS,
    STATS_SEARCH_HOT_WORDS,
    STATS_USER_ACTIVITY
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

    removeSearchHistory: (params) => {
        return Put(REMOVE_SEARCH_KEY, params);
    },

    getRecentDoc: (params) => {
        return Get(STATS_RECENT_DOC, params);
    },

    getMonthStat: (params) => {
        return Get(STATS_MONTH_URL, params);
    },

    // 新增接口
    getDocTypeDist: (params) => {
        return Get(STATS_DOC_TYPE_DIST, params);
    },

    getCategoryDist: (params) => {
        return Get(STATS_CATEGORY_DIST, params);
    },

    getHotDocs: (params) => {
        return Get(STATS_HOT_DOCS, params);
    },

    getSearchHotWords: (params) => {
        return Get(STATS_SEARCH_HOT_WORDS, params);
    },

    getUserActivity: (params) => {
        return Get(STATS_USER_ACTIVITY, params);
    },

}