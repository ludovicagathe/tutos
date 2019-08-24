<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12 mb-5>
        <h1>Double: {{ doubleCounter }}</h1>
        <h1>Net: {{ counterToString }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'doubleCounter',
      'counterToString'
    ])
  }
}
</script>
