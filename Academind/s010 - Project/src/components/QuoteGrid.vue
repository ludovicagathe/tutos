<template>
  <v-layout text-xs-center wrap align-center justify-space-between class="grid">
    <Quote v-for="(quote, index) in quotes" @click.native="delete_me(index)">{{ quote }}</Quote>
  </v-layout>
</template>

<script>
import Quote from './Quote'

export default {
  props: ['quotes'],
  components: {
    Quote
  },
  data: () => ({

  }),
  methods: {
    delete_me(index) {
      this.$emit('deleteThisQuote', index);
    }
  }
}
</script>

<style>
.grid {
  margin: 0 -1em;
}
</style>
