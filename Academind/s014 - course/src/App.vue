<template>
  <v-app>
    <Toolbar
    ><span>Vuetify</span><span class="font-weight-light">Boilerplate</span></Toolbar>
    <v-content>
      <Main />
    </v-content>
  </v-app>
</template>

<script>
import Main from './components/Main'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Main,
    Toolbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
