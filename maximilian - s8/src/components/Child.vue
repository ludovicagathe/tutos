<template>
  <div class="child">
    <h4>{{ msg }}</h4>
    <div>From parent: {{ randomNum }}</div>
    <div><button @click="pingParent()">Ping</button></div>
  </div>
</template>

<script>
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
      this.$emit("childPing", this.refId);
    }
  }
}
</script>

<style scoped>

</style>
