<template>
  <v-container fill-height>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12">
        <div class="center-img">
          <v-img
              :src="require('../assets/eemo_logo.png')"
              class="my-3"
              contain
              position="center center"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-center my-12 py-12">
          <v-btn color="success" class="start-btn" width="60%" to="/inspections">Start</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {

  },
};
</script>

<style>
#app {
  background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #ECF1FF 100%)
}
.center-img {
  width: 60%;
  margin: 0 auto;
}
.start-btn {
  height: 100px !important;
  font-size: 36px !important;
}

</style>
