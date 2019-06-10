import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
require('es6-promise').polyfill();

new Vue({
  render: h => h(App),
}).$mount('#app')
