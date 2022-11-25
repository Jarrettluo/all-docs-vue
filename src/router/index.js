import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/x',
        name: 'Home',
        component: Home
    },
    {
        path: "/",
        name: "New",
        component: function () {
            return import("../home/index")
        }
    },
    {
        path: "/login",
        name: "Login",
        component: function () {
            return import("../views/users/Login")
        }
    },
    {
        path: "/registry",
        name: "Registry",
        component: function () {
            return import("../views/users/Registry")
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    },
    {
        path: "/",
        name: "homePage",
        component: function () {
            return import("../views/homePage/Index")
        }
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
        children: [
            {
                path: "newDocument",
                name: "newDocument",
                component: function () {
                    return import("../views/newDocument/Index")
                }
            },
            {
                path: "newDocument1",
                name: "newDocument1",
                component: function () {
                    return import("../views/userPage/DocUpload")
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
            }
            // ...其他子路由
        ],
    },
    {
        path: '/category',
        name: "category",
        component: function () {
            return import('../views/category/Index.vue')
        }
    },
    {
        path: '/doc',
        name: "userdoc",
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

export default router
