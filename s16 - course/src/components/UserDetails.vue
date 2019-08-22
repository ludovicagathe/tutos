<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <h1>{{ user.id }}</h1>
        <h3>{{ user.name }}</h3>
        <h5>({{ user.role }})</h5>
      </v-flex>
      <v-flex xs12>
        <router-link color="error" :to="{ name: 'user-edit', params: { id: user.id } }"><v-btn color="error" @click="edit_user()">Edit User</v-btn></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id', 'users'],
  data () {
    return {
      user: this.users.filter(user => { return this.id == user.id })[0],
    }
  }, methods: {
    edit_user() {
      this.$router.push({ name: 'user-edit', params: { id: this.user.id } });
      return;
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to) {
        this.user = this.users.filter(user => { return to.params.id == user.id })[0];
      }
    }
  }
}
</script>

<style>

</style>
