<template>
  <v-app>
    <Toolbar>
      <span>Vuetify</span>
      <span class="font-weight-light">Boilerplate</span>
      <span class="ml-2">
        <ul>
          <router-link class="ml-5" :to="{ name: 'home', params: {} }" active-class="active" exact>Home</router-link>
          <router-link class="ml-5" :to="{ name: 'user-list', params: {} }" active-class="active" exact>Users</router-link>
          <template v-for="user in users">
            <router-link class="ml-5" :to="{ name: 'user-details', params: { id: user.id} }" active-class="active" :key="user.id" exact>User with ID {{ user.id }}</router-link>
          </template>
        </ul>
      </span>
    </Toolbar>
    <v-content>
      <router-view :users="users"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data () {
    return {
      users: [
        { name: "ludovic", id: 1, role: "admin" },
        { name: "christophe", id: 2, role: "brother" },
        { name: "patrice", id: 3, role: "father" },
        { name: "elsie", id: 4, role: "mother" },
      ]
    }
  }
}
</script>
<style scoped>
.active {
  background-color: #03acf4;
}

ul, li {
  display: inline;
}

li {
  list-style: none;
  padding: 2px 6px;
}
</style>
