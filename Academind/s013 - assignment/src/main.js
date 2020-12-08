import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('characto', (value) => {
  return value + ' (' + value.length + ')';
});

new Vue({
  render: h => h(App),
}).$mount('#app')
