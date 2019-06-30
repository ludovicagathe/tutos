import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'
import VueRouter from 'vue-router'
import { routes } from './routes.js'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
require('es6-promise').polyfill();
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
