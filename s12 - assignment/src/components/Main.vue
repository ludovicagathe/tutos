<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12 mb-5>
        <button v-myon:click="func" @click="vonclicked = true">Click me</button>
        <div style="background-color: lightcoral; color: white; padding 10px" v-if="clicked">Clicked!</div>
        <div style="background-color: lime; color: #555; padding 10px" v-if="vonclicked">Clicked!</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        clicked: false,
        vonclicked: false
      }
    },
    directives: {
      myon: {
        bind(el, binding, vnode) {
          if(binding.arg == 'click') {
            el.addEventListener('click', binding.value)
          }
        }
      }
    },
    methods: {
      func() {
        var self = this;
        self.clicked = true;
        setTimeout(function() { self.clicked = false; self.vonclicked = false; }, 1000);
      }
    }
  }
</script>

<style>

</style>
