<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-btn color="primary" @click="go_home">Go Home</v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <router-view :users="users"></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'users',
  ],
  data () {
    return {
      user_name: "John Doe",
      user_email: "john@doe.com"
    }
  }, methods: {
    go_home() {
      this.$router.push('/');
      return;
    },
  },
}
</script>

<style>

</style>
