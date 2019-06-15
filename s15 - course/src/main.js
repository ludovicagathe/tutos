import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'
import Firebase from 'firebase'

var fbaseconfig = require('./private/config.js')

Vue.config.productionTip = false;

/* Using axios
Vue.prototype.$http = Axios;
require('es6-promise').polyfill();
*/

/* Using Firebas */
Firebase.initializeApp(fbaseconfig);
Vue.prototype.$firebase = Firebase;

new Vue({
  render: h => h(App),
}).$mount('#app')
