<template>
  <v-flex shrink pa-3 mb-2 mx-2 class="quote" @click.native="delete_me()">
    <slot></slot>
  </v-flex>
</template>

<script>

export default {
  data: () => ({

  }),
}
</script>

<style>
.quote {
  cursor: pointer;
  font-family: cursive, sans-serif;
  font-size: 24px;
  color: #6e6e6e;
  border: solid 1px #777777;
  border-radius: 8px;
}

.quote:hover {
  background-color: #ffe2e2;
}
</style>
