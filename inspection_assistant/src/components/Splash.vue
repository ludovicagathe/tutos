<template>
  <v-container fill-height>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12">
        <v-img
            :src="require('../assets/eemo_logo.png')"
            class="my-3"
            contain
            height="300"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <div class="text-center my-12 py-12">
          <v-btn color="success" height="80px" class="title" width="60%">Start</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Splash',

  data: () => ({

  }),
};
</script>
