const ADD_RELATE_URL = '/api/v1.0/category/addRelationship'; // 增加文档和分类、标签的关系
const CATE_NO_RELATE_URL = '/api/v1.0/category/removeRelationship'; // 取消关系

const CATE_LIST_URL = '/api/v1.0/category/all'; // 分类列表
const CATE_ADD_URL = '/api/v1.0/category/insert'; // 分类增加
const CATE_REMOVE_URL = '/api/v1.0/category/remove'; // 分类删除
const CATE_UPDATE_URL = '/api/v1.0/category/update'; // 分类更新
const QUERY_BY_CATE_URL = '/api/v1.0/category/getDocByTagCateKeyWord'; // 根据分类进行查找文档


const DOC_DETAIL_URL = '/api/v1.0/document/detail'; // 文档详情
const DOC_LIST_URL = '/api/v1.0/document/list'; // 文档列表
const DOC_REMOVE_URL = '/api/v1.0/document/auth/remove'; // 文档删除
const DOC_WITH_CHECK_URL = '/api/v1.0/document/listWithCategory'; // 返回已经选中的信息

const ABC = '/api/v1.0/files/view/'

const DOC_VIEW_URL = '/api/v1.0/files/view/'; // 预览文档
const DOC_TXT_URL = '/api/v1.0/files/text/'; // 下载文本文件
const DOC_REBUILD_URL = '/api/v1.0/files/rebuildIndex'; // 重建文档索引

const COLLECT_ADD_URL = '/api/v1.0/collect/auth/insert'; // 收藏增加
const COLLECT_REMOVE_URL = '/api/v1.0/collect/auth/remove'; // 收藏减少

const USER_ADD_URL = '/api/v1.0/user/insert'; // 用户增加
const USER_REMOVE_URL = '/api/v1.0/user/auth/deleteByID'; // 用户删除
const USER_LOGIN_URL = '/api/v1.0/user/login'; // 用户登录
const ALL_USER_URL = '/api/v1.0/user/allUsers'; // 全部用户信息
const USER_INFO_URL = '/api/v1.0/user/getById'; // 根据用户id进行查询
const USER_UPDATE_URL = '/api/v1.0/user/updateUser'; // 根据用户id进行更新
const USER_ADD_AVATAR_URL = '/api/v1.0/user/auth/uploadUserAvatar'; // 用户增加头像

const COMMENT_ADD_URL = '/api/v1.0/comment/auth/insert'; // 评论增加
const COMMENT_LIST_URL = '/api/v1.0/comment/list'; // 评论列表
const COMMENT_REMOVE_URL = '/api/v1.0/comment/auth/remove'; // 评论删除
const COMMENT_UPDATE_URL = '/api/v1.0/comment/auth/update'; // 评论更新
const COMMENT_ALL_URL = '/api/v1.0/comment/auth/listALL'; // 管理员及用户主页查询评论列表

const STATS_TREND_URL = '/api/v1.0/statistics/trend'; //
const STATS_ALL_URL = '/api/v1.0/statistics/all';
const STATS_HOT_TREND = '/api/v1.0/statistics/getHotTrend';
const STATS_SEARCH_HISTORY = '/api/v1.0/statistics/getSearchResult';
const STATS_RECENT_DOC = '/api/v1.0/statistics/recentDocs';


const ADMIN_DOC_REVIEW_URL = '/api/v1.0/docReview/queryDocForReview';
const DOC_REVIEW_REFUSE_URL = '/api/v1.0/docReview/refuse';
const DOC_REVIEW_REFUSE_BATCH_URL = '/api/v1.0/docReview/refuseBatch';
const DOC_REVIEW_APPROVE_URL = '/api/v1.0/docReview/approve';
const DOC_REVIEW_LOG_URL = '/api/v1.0/docReview/queryReviewResultList';
const DOC_REVIEW_REMOVE_URL = '/api/v1.0/docReview/removeDocReview';
const DOC_REVIEW_USER_READ_URL = '/api/v1.0/docReview/userRead';

const DOC_LOG_LIST_URL = '/api/v1.0/docLog/queryLogList';
const DOC_LOG_REMOVE_URL = '/api/v1.0/docLog/removeLog';

const SYSTEM_CONFIG_URL = '/api/v1.0/system/getConfig'; // 获取系统设置信息
const SYSTEM_CONFIG_UPDATE_URL = '/api/v1.0/system/updateConfig'; // 更新系统设置
const DOWN_PROHIBITED_WORD_URL = '/api/v1.0/system/getProhibitedWord'; // 下载敏感词文件
const UP_PROHIBITED_WORD_URL = '/api/v1.0/system/updateProhibitedWord'; // 更新敏感词文件

const ADD_LIKE_URL = '/api/v1.0/like/';
const GET_LIKE_URL = '/api/v1.0/queryLikeInfo/';


module.exports = {
    ADD_RELATE_URL,
    CATE_NO_RELATE_URL,

    CATE_LIST_URL,
    CATE_ADD_URL,
    CATE_REMOVE_URL,
    CATE_UPDATE_URL,
    QUERY_BY_CATE_URL,

    DOC_DETAIL_URL,
    DOC_LIST_URL,
    DOC_REMOVE_URL,
    DOC_WITH_CHECK_URL,

    DOC_VIEW_URL,
    DOC_TXT_URL,
    DOC_REBUILD_URL,

    COLLECT_ADD_URL,
    COLLECT_REMOVE_URL,

    USER_ADD_URL,
    USER_REMOVE_URL,
    USER_LOGIN_URL,
    ALL_USER_URL,
    USER_INFO_URL,
    USER_UPDATE_URL,
    USER_ADD_AVATAR_URL,

    COMMENT_ADD_URL,
    COMMENT_LIST_URL,
    COMMENT_REMOVE_URL,
    COMMENT_UPDATE_URL,
    COMMENT_ALL_URL,

    STATS_TREND_URL,
    STATS_ALL_URL,
    STATS_HOT_TREND,
    STATS_SEARCH_HISTORY,
    STATS_RECENT_DOC,

    ADMIN_DOC_REVIEW_URL,
    DOC_REVIEW_REFUSE_URL,
    DOC_REVIEW_REFUSE_BATCH_URL,
    DOC_REVIEW_APPROVE_URL,
    DOC_REVIEW_LOG_URL,
    DOC_REVIEW_REMOVE_URL,
    DOC_REVIEW_USER_READ_URL,

    DOC_LOG_LIST_URL,
    DOC_LOG_REMOVE_URL,

    SYSTEM_CONFIG_URL,
    SYSTEM_CONFIG_UPDATE_URL,
    DOWN_PROHIBITED_WORD_URL,
    UP_PROHIBITED_WORD_URL,

    ADD_LIKE_URL,
    GET_LIKE_URL,

    ABC
}
