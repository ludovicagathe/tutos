<template>
  <v-container>
    <slot></slot> {{ counter }}
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      counter: 0
    }
  },
  activated: function() {
    this.counter++;
  }
}
</script>

<style scoped>
    div {
        border: 1px solid red;
        background-color: lightcoral;
        padding: 30px;
        margin: 20px auto;
        text-align: center
    }
</style>
