import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
//import Axios from 'axios'
import Firebase from 'firebase'
import VueResource from 'vue-resource'

var fbaseconfig = require('./private/config.js')

Vue.config.productionTip = false;

/* Using axios
Vue.prototype.$http = Axios;
require('es6-promise').polyfill();
*/

/* Using Firebas */
Firebase.initializeApp(fbaseconfig);
Vue.prototype.$firebase = Firebase;

Vue.use(VueResource);

Vue.http.options.root = "http://ec2-34-251-138-40.eu-west-1.compute.amazonaws.com/";

new Vue({
  render: h => h(App),
}).$mount('#app')
