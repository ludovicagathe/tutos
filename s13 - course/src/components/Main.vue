<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12 mb-5>
        <h1>Filters</h1>
        <p class="pink deep-purple--text text--darken-4 pa-2">{{ my_up_text | uptext }}</p>
        <p class="blue darken-4 orange--text text--darken-2 pa-2">{{ my_lo_text | lotext }}</p>
      </v-flex>

      <v-flex xs12 mb-5>
        <h1>Mixins</h1>
        <p class="pink deep-purple--text text--darken-4 pa-2">
          <v-text-field v-model="query"></v-text-field>
        </p>
        <p class="blue darken-4 orange--text text--darken-2 pa-2" v-for="fruit in filt">{{ fruit | lotext }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mymixin } from '../mixin'

  export default {
    data: () => ({
      my_up_text: "This should be uppercase",
      my_lo_text: "This should be lowercase"
    }),
    filters: {
      uptext(value) {
        return value.toUpperCase();
      }
    },
    mixins: [mymixin]
  }
</script>

<style>

</style>
