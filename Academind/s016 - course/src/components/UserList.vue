<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-list>
          <template v-for="user in users">
            <router-link  :key="user.id" :to="{ name: 'user-details', params: { id:user.id } }">
              <v-list-tile>
                {{ user.id }} : {{ user.name }} | {{ user.role }}
              </v-list-tile>
            </router-link>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['users'],
  data () {
    return {
      current_user_id: this.$route.params.id,
      text: "test"
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
