import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
import iView from 'view-design'
import "@/assets/font/font.css";
import Api from './api/index';
import '../theme/my-theme.less'

import i18n from './langurage/index.js'

import '../theme/tag-input.css'

import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.component('tags-input', VoerroTagsInput);

Vue.use(VueRouter);
Vue.use(iView);

// import jm from 'vue-jsmind'
//
// Vue.use(jm)
// if (window.jsMind) {
//     Vue.prototype.jsMind = window.jsMind
// }

Vue.prototype.$axios = Api;

new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App)
});