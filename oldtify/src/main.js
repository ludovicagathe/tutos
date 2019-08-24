import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false;
require('es6-promise').polyfill();

new Vue({
  render: h => h(App),
}).$mount('#app')
