<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <h1>Edit user details: {{ current_user.name }} (id: {{ current_user.id }})</h1>
        <v-flex xs4 offset-xs4>
          <v-text-field v-model="save_user.name" placeholder="name" mb2></v-text-field>
          <v-text-field v-model="save_user.role" placeholder="role" mb2></v-text-field>
          <v-btn color="primary" @click="update_user()">Save</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['users'],
  data () {
    return {
      current_user: {},
      save_user: {
        name: "",
        id: -1,
        role: ""
      }
    }
  },
  methods: {
    update_user() {
      this.save_user.id = this.current_user.id;
      this.$emit('update-user', this.save_user);
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to) {
        this.current_user = this.users.filter(user => {
          return to.params.id == user.id;
        })[0];
        this.save_user.name = this.current_user.name;
        this.save_user.id = this.current_user.id;
        this.save_user.role = this.current_user.role;
      }
    }
  }
}
</script>

<style>

</style>
