import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false;
Vue.use(Vuetify);

export const Superbus = new Vue();

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app');
