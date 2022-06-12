import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: "/homePage",
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
    path: '/admin',
    name: 'Admin',
    component: function () {
      return import('../views/admin/Index.vue')
    },
    children: [
      {
        path: "newDocument",
        component: function () {
          return import("../views/newDocument/Index")
        }
      },
      {
        path: "category",
        component: function () {
          return import("../views/category/Index")
        }
      },
      {
        path: "tags",
        component: function () {
          return import("../views/tags/Index")
        }
      },
      {
        path: 'allDocuments',
        component: function () {
          return import('../views/allDocument/Index.vue')
        }
      },
      {
        path: "users",
        component: function () {
          return import("../views/users/Index")
        }
      }, {
        path: "stats",
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
]

const router = new VueRouter({
  routes
})

export default router
