import Vue from 'vue'
import App from './App.vue'
import router from './router'


import ViewUIPlus from 'view-ui-plus'
// import store from './store'
import 'view-ui-plus/dist/styles/viewuiplus.css'

Vue.config.productionTip = false

new Vue({
  router,
  ViewUIPlus,
  render: function (h) { return h(App) }
}).$mount('#app')
