import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.directive('declare', {
  bind: function (el, binding, vnode) {
  	console.log(vnode);
  	Vue.set(vnode.data, "ref", binding.value);
  }
})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
