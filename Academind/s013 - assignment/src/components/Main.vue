<template>
  <v-container grid-list-md>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs4 mb-5>
        <h1 class="title">Text Reversal</h1>
        <p class="pink brown--text text--lighten-5 font-weight-bold pa-2">{{ reverse_text | reverso }}</p>
      </v-flex>

      <v-flex xs4 mb-5 mr-5>
        <h1 class="title">Character Count</h1>
        <p class="amber brown--text text--darken-5 font-weight-bold pa-2">{{ count_text | characto }}</p>
      </v-flex>

      <v-flex xs4 mb-5>
        <h1 class="title">Text Reversal (comp)</h1>
        <p class="pink brown--text text--lighten-5 font-weight-bold pa-2">{{ computed_reverse_text }}</p>
      </v-flex>

      <v-flex xs4 mb-5 mr-5>
        <h1 class="title">Character Count (comp)</h1>
        <p class="amber brown--text text--darken-5 font-weight-bold pa-2">{{ computed_count_text }}</p>
      </v-flex>

      <v-flex xs8 mb-5>
        <h1 class="title">Character Count (mixin)</h1>
        <p class="purple brown--text text--lighten-5 font-weight-bold pa-2">{{ mixin_count_text }}</p>
      </v-flex>
    </v-layout>
  </v-container>

  <!-- Exercise 4 -->
  <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
</template>

<script>
import {characto} from './mixin'

export default {
  data: () => ({
    reverse_text: "12345 SODNAC",
    count_text: "This is some text to count "
  }),
  filters: {
    reverso(value) {
      return value.split('').reverse().join('');
    }
  },
  computed: {
    computed_reverse_text() {
      return this.reverse_text.split('').reverse().join('');
    },
    computed_count_text() {
      return this.count_text + ` (${this.count_text.length})`;
    }
  },
  mixins: [characto]
}
</script>
