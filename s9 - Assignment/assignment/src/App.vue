<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Section 8</span> - <span class="font-weight-light">Assignment</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" ripple right @click="currentTab = 'blue'">Load Blue Template</v-btn>
      <v-btn color="success" ripple right @click="currentTab = 'green'">Load Green Template</v-btn>
      <v-btn color="error" ripple right @click="currentTab = 'red'">Load Red Template</v-btn>
    </v-toolbar>

    <v-content>
      <div>
        <keep-alive>
          <component :is="'app-' + currentTab">
            <span>This is a {{ currentTab.toUpperCase() }} tab -> Actications: </span>
          </component>
        </keep-alive>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Blue from './components/Blue.vue';
import Green from './components/Green.vue';
import Red from './components/Red.vue';

export default {
  name: 'App',
  components: {
    "app-blue": Blue,
    "app-green": Green,
    "app-red": Red
  },
  data () {
    return {
      currentTab: "blue",
      blue_selected: 1,
      green_selected: 0,
      red_selected: 0
    }
  }
}
</script>
