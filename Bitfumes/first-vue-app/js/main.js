const app = Vue.createApp({
  data() {
    return {
      name: 'First Vue App'
    }
  },
  render() {
    return Vue.h('h1', this.name)
  }
})
app.mount('#app')