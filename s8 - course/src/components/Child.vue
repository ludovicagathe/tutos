<template>
  <div class="child">
    <h4>{{ msg }}</h4>
    <div>From parent: {{ randomNum }}</div>
    <div><button @click="pingParent()">Ping</button></div>
  </div>
</template>

<script>
import { Superbus } from '../main'

export default {
  name: 'Child',
  props: {
    msg: String,
    refId: String
  },
  data: function() {
    return{
      randomNum: 0
    }
  },
  methods: {
    pingParent: function() {
      Superbus.$emit("childPing", this.$vnode.data.ref);
    }
  }
}
</script>

<style scoped>

</style>
