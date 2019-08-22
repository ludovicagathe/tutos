<template>
  <v-app>
    <Toolbar>
      <span>Vuetify</span>
      <span class="font-weight-light">Boilerplate</span>
    </Toolbar>
    <v-container mt-5>
      <v-layout
        text-xs-center
        wrap
      >
        <v-flex xs12>
          <transition name="slide-router">
            <router-view :users="users"  name="link-bar-top"></router-view>
          </transition>
        </v-flex>
        <v-flex xs12>
          <v-content>
            <transition name="slide-router">
              <router-view :users="users" @update-user="refresh_user"></router-view>
            </transition>
          </v-content>
        </v-flex>
        <v-flex xs12>
          <transition name="slide-router">
            <router-view :users="users"  name="link-bar-bot"></router-view>
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
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
  },
  methods: {
    refresh_user(e) {
      this.users.forEach(user => {
        if (user.id == e.id) {
          user.name = e.name;
          user.role = e.role;
        }
      })
    }
  }
}
</script>
<style scoped>
.active {
  background-color: #03acf4;
}

>>> ul{
  display: block;
}

>>> li {
  list-style: none;
  display: inline;
  padding: 2px 6px;
}
</style>

<style>
@import './assets/css/styles.css';
</style>
