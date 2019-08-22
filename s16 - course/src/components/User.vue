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
        <transition name="slide-router">
          <router-view :users="users" @update-user="user_updated"></router-view>
        </transition>
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
      this.$router.push({ name: 'home', query: {'from': this.$route.path}});
      return;
    },
    user_updated(e) {
      this.$emit('update-user', e);
    }
  },
}
</script>

<style>
@import '../assets/css/styles.css';
</style>
