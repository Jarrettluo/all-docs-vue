import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "homePage",
        component: function () {
            return import("../home/Index")
        }
    },
    {
        path: "/login",
        name: "Login",
        component: function () {
            return import("../views/users/Login")
        },
    },
    {
        path: "/registry",
        name: "Registry",
        component: function () {
            return import("../views/users/Registry")
        },
    },
    {
        path: "/searchResult",
        name: "searchResult",
        component: function () {
            return import("../views/searchResult/Index")
        }
    },
    {
        path: "/preview",
        name: "preview",
        component: function () {
            return import("../views/preview/index")
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: function () {
            return import('../views/admin/Index.vue')
        },
        meta: { title: '管理员页面' },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                return next()
            }
            return next(from.path)
        },
        children: [
            {
                path: "newDocument1",
                name: "newDocument1",
                component: function () {
                    return import("../views/admin/NewUpload")
                }
            },
            {
                path: "docReview",
                name: "docReview",
                component: function () {
                    return import("../views/admin/DocReview")
                }
            },
            {
                path: "category",
                name: "category",
                component: function () {
                    return import("../views/category/Index")
                }
            },
            {
                path: "tags",
                name: "tags",
                component: function () {
                    return import("../views/tags/Index")
                }
            },
            {
                path: 'allDocuments',
                name: "allDocuments",
                component: function () {
                    return import('../views/allDocument/Index.vue')
                }
            },
            {
                path: 'commentManage',
                name: "commentManage",
                component: function () {
                    return import('../views/admin/CommentManage.vue')
                }
            },
            {
                path: "users",
                name: "users",
                component: function () {
                    return import("../views/users/Index")
                }
            }, {
                path: "stats",
                name: "stats",
                component: function () {
                    return import("../views/stats/Index")
                }
            }, {
                path: "systemConfig",
                name: "systemConfig",
                component: function () {
                    return import("../views/admin/SystemConfig")
                }
            }
            // ...其他子路由
        ],
    },
    {
        path: '/doc',
        name: "UserDoc",
        component: function () {
            return import('../views/filterDoc/Index.vue')
        }
    },
    {
        path: '/userPage',
        name: "userPage",
        redirect: "/userPage/msg",  //重定向到第一个子路由
        component: function () {
            return import('../views/userPage/Index.vue')
        },
        meta: { title: '用户页面' },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                return next()
            }
            return next(from.path)
        },
        children: [
            {
                path: "msg",
                name: "msg",
                component: function () {
                    return import("../views/userPage/UserMsg")
                }
            },
            {
                path: "userCollection",
                name: "userCollection",
                component: function () {
                    return import("../views/userPage/UserCollection")
                }
            },
            {
                path: "userInfo",
                name: "userInfo",
                component: function () {
                    return import("../views/userPage/UserInfo")
                }
            },

            {
                path: "userUpload",
                name: "userUpload",
                component: function () {
                    return import("../views/userPage/UserUpload")
                }
            },{
                path: "docUpload",
                name: "docUpload",
                component: function () {
                    return import("../views/userPage/DocUpload")
                }
            },


        ]
    },
]

const router = new VueRouter({
    routes
})



// // 设置路由导航卫士,通过判断是否存在token,对网页访问权限进行设置
// router.beforeEach((to, from, next) => {
//     // to表示将要访问的地址
//     // from表示从哪个路径跳转而来
//     // next是放行函数  next()放行    next('/path')强制跳转
//     if (to.path === '/login') return next()
//     if (to.path.)
//     const tokenStr = localStorage.getItem('token')
//     if (!tokenStr) return next('/login')
//     next()
// })

export default router
