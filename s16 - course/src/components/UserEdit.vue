<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <h1>Edit user details: {{ current_user_id }}</h1>
        <div>
          <v-text-field></v-text-field>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      current_user_id: this.$route.params.id,
    }
  }, methods: {
  },
  watch: {
    '$route'(to) {
      this.current_user_id = to.params.id;
    }
  }
}
</script>

<style>

</style>
