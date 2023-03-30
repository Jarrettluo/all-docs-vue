import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
import iView from 'view-design'
import "@/assets/font/font.css";

import Api from './api/index';

import '../theme/my-theme.less'

Vue.use(VueRouter);
Vue.use(iView);


Vue.prototype.$axios = Api;

// The routing configuration
// const RouterConfig = {
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});