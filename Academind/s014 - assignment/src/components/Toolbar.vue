<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <slot>
        <!-- <span>Vuetify</span><span class="font-weight-light">MATERIAL DESIGN</span> -->
      </slot>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-for="bt in btns" :key="bt.id"
      :flat="bt.flat || false"
      :href="bt.href || '#'"
      :target="bt.target || '_self'"
      :fab="bt.fab || false"
      :disabled="bt.disabled || false"
      :color="bt.color || 'primary'"
      :ripple="bt.ripple || true"
      :round="bt.round || false"
    >
      <span class="mr-2">{{ bt.label || "Button" }}</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: [
    'btns'
  ],
  data () {
    return {
      //
    }
  }, methods: {

  }
}
</script>

<style>

</style>
