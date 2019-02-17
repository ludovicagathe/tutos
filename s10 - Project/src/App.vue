<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Section 10</span>
        <span class="font-weight-light">Project</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Main />
    </v-content>
  </v-app>
</template>

<script>
import Main from './components/Main'

export default {
  name: 'App',
  components: {
    Main
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
.font-weight-light {
  margin-left: 20px;
}
</style>
