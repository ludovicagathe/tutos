<template>
  <v-container fill-height>
    <v-row fill-height>
      <v-col cols="12">
        <Splash />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Splash from '../components/Splash';

export default {
  name: 'Home',

  components: {
    Splash,
  },
};
</script>

<style>
#app {
  background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #ECF1FF 100%)
}
</style>
