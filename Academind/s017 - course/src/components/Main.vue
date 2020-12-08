<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12 mb-5>
        <v-btn color="primary" @click="increment">Increment</v-btn> |
        <v-btn color="error" @click="decrement">Decrement</v-btn>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-btn color="primary" @click="asyncIncrement">Async Increment</v-btn> |
        <v-btn color="error" @click="asyncDecrement">AsyncDecrement</v-btn>
      </v-flex>

      <v-flex xs12>
        <Result />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Result from './Result';
import { mapActions } from 'vuex';

export default {
  components: {
    Result
  },
  data() {
    return {
      //
    }
  },
  methods: {
    ...mapActions(['increment', 'decrement', 'asyncIncrement', 'asyncDecrement'])
  }
};
</script>
