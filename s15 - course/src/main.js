import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'
import Firebase from 'firebase'

Vue.config.productionTip = false;

/* Using axios
Vue.prototype.$http = Axios;
require('es6-promise').polyfill();
*/

/* Using Firebas */
Firebase.initializeApp({
  apiKey: "AIzaSyDK8g_d-BsLfCX9A4Bc_THpty-2bZLGo74",
  authDomain: "remindo-20190407.firebaseapp.com",
  databaseURL: "https://remindo-20190407.firebaseio.com",
  projectId: "remindo-20190407",
  storageBucket: "remindo-20190407.appspot.com",
  messagingSenderId: "184955603324"
});
Vue.prototype.$firebase = Firebase;

new Vue({
  render: h => h(App),
}).$mount('#app')
