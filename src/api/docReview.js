import {
    ADMIN_DOC_REVIEW_URL,
    DOC_REVIEW_REFUSE_URL,
    DOC_REVIEW_REFUSE_BATCH_URL,
    DOC_REVIEW_APPROVE_URL,
    DOC_REVIEW_LOG_URL,
    DOC_REVIEW_MY_LOG_URL,
    DOC_REVIEW_REMOVE_URL,
    DOC_REVIEW_USER_READ_URL,

} from './url'

import {Get, Post, Delete, Download, Put} from "@/api/request";

export default {

    getAdminDocReview: (params) => {
        return Get(ADMIN_DOC_REVIEW_URL, params);
    },

    updateRefuseDoc: (params) => {
        return Post(DOC_REVIEW_REFUSE_URL, params);
    },

    updateRefuseDocBatch: (params) => {
        return Post(DOC_REVIEW_REFUSE_BATCH_URL, params);
    },

    updateApproveDoc: (params) => {
        return Post(DOC_REVIEW_APPROVE_URL, params);
    },

    getReviewLog: (params) => {
        return Get(DOC_REVIEW_LOG_URL, params);
    },

    getMyReviewLog: (params) => {
        return Get(DOC_REVIEW_MY_LOG_URL, params);
    },

    removeReviewLog: (params) => {
        return Delete(DOC_REVIEW_REMOVE_URL, params);
    },

    updateDocReviewUserRead: (params) => {
        return Put(DOC_REVIEW_USER_READ_URL, params);
    }


}