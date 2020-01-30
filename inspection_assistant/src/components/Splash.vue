<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" fill-height>
        <v-row align="center">
          <v-img
            :src="require('../assets/eemo_logo.png')"
            class="my-3"
            contain
            height="300"
          ></v-img>
        </v-row>
        <v-spacer></v-spacer>
        <v-row justify="center">
          <v-btn color="success" height="80px" class="title" width="60%">Start</v-btn>
        </v-row>
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
