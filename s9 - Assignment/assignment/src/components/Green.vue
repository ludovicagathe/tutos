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
        border: 1px solid green;
        background-color: lightgreen;
        padding: 30px;
        margin: 20px auto;
        text-align: center
    }
</style>
