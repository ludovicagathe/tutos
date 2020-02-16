<template>
<v-app>
  <v-content>
    <v-container fill-height>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12">
          <div class="center-img">
            <v-img :src="require('../../assets/eemo_logo.png')" class="my-3" contain position="center center"></v-img>
          </div>
        </v-col>
        <v-col cols="12">
          <transition name="fade">
            <div class="text-center action-pane">
              <v-btn color="success" class="start-btn" width="60%">Home</v-btn>
            </div>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'Config',

  components: {

  },
  data() {
    return {

    }
  },
  methods: {},
  mounted() {
    document.title = "Settings"
  }
};
</script>

<style>
#app {
  background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #ECF1FF 100%)
}

.action-pane {
  height: 300px;
}

.center-img {
  width: 60%;
  margin: 0 auto;
}

.start-btn {
  height: 100px !important;
  font-size: 36px !important;
}

.completed-success {
  color: #00C853 !important;
}

.completed-failed {
  color: #D50000 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  height: 1px;
}
</style>
