import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('lotext', (value) => {
  return value.toLowerCase();
});

new Vue({
  render: h => h(App),
}).$mount('#app')
