const ADD_RELATE_URL = '/category/addRelationship'; // 增加文档和分类、标签的关系
const CATE_NO_RELATE_URL = '/category/removeRelationship'; // 取消关系

const CATE_LIST_URL = '/category/all'; // 分类列表
const CATE_ADD_URL = '/category/insert'; // 分类增加
const CATE_REMOVE_URL = '/category/remove'; // 分类删除
const CATE_UPDATE_URL = '/category/update'; // 分类更新
const QUERY_BY_CATE_URL = '/category/getDocByTagCateKeyWord'; // 根据分类进行查找文档


const DOC_DETAIL_URL = '/document/detail'; // 文档详情
const DOC_LIST_URL = '/document/list'; // 文档列表
const DOC_REMOVE_URL = '/document/auth/remove'; // 文档删除
const DOC_WITH_CHECK_URL = '/document/listWithCategory'; // 返回已经选中的信息

const ABC = '/files/view/'

const DOC_VIEW_URL = '/files/view/'; // 预览文档
const DOC_TXT_URL = '/files/text/'; // 下载文本文件
const DOC_REBUILD_URL = '/files/rebuildIndex'; // 重建文档索引

const COLLECT_ADD_URL = '/collect/auth/insert'; // 收藏增加
const COLLECT_REMOVE_URL = '/collect/auth/remove'; // 收藏减少

const USER_ADD_URL = '/user/insert'; // 用户增加
const USER_REMOVE_URL = '/user/auth/deleteByID'; // 用户删除
const USER_LOGIN_URL = '/user/login'; // 用户登录
const ALL_USER_URL = '/user/allUsers'; // 全部用户信息

const COMMENT_ADD_URL = '/comment/auth/insert'; // 评论增加
const COMMENT_LIST_URL = '/comment/list'; // 评论列表
const COMMENT_REMOVE_URL = '/comment/auth/remove'; // 评论删除
const COMMENT_UPDATE_URL = '/comment/auth/update'; // 评论更新
const COMMENT_ALL_URL = '/comment/auth/listALL'; // 管理员及用户主页查询评论列表

const STATS_TREND_URL = '/statistics/trend'; //
const STATS_ALL_URL = '/statistics/all';
const STATS_HOT_TREND = '/statistics/getHotTrend';
const STATS_SEARCH_HISTORY = 'statistics/getSearchResult';
const STATS_RECENT_DOC = 'statistics/recentDocs';


const ADMIN_DOC_REVIEW_URL = '/docReview/queryDocForReview';
const DOC_REVIEW_REFUSE_URL = '/docReview/refuse';
const DOC_REVIEW_REFUSE_BATCH_URL = '/docReview/refuseBatch';
const DOC_REVIEW_APPROVE_URL = '/docReview/approve';
const DOC_REVIEW_LOG_URL = '/docReview/queryReviewResultList';
const DOC_REVIEW_REMOVE_URL = 'docReview/removeDocReview';
const DOC_REVIEW_USER_READ_URL = '/docReview/userRead';

const DOC_LOG_LIST_URL = '/docLog/queryLogList';
const DOC_LOG_REMOVE_URL = '/docLog/removeLog';


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

    ABC
}
