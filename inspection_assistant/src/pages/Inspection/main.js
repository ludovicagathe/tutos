import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import dateutils from '../../mixins/dateutils'
import localStore from '../../mixins/localStore'

Vue.config.productionTip = false;
Vue.mixin(dateutils);
Vue.mixin(localStore);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
