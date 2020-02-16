<template>
<v-app>
  <v-content>

  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'Dealers',

  components: {

  },
  data() {
    return {

    }
  },
  methods: {},
  mounted() {
    document.title = "Dealers"
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
