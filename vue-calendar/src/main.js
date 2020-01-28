import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueTextAreaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueTextAreaAutosize);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDyi0MBQEsBdnViF6m4q6-pnHfrD3iTi2Y",
  authDomain: "vue-calendar-b1737.firebaseapp.com",
  databaseURL: "https://vue-calendar-b1737.firebaseio.com",
  projectId: "vue-calendar-b1737",
  storageBucket: "vue-calendar-b1737.appspot.com",
  messagingSenderId: "306469925836",
  appId: "1:306469925836:web:1d8bf288d3e4a29bd42369"
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
