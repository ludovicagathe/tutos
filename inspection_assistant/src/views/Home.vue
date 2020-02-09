<template>
<v-container fill-height>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12">
      <div class="center-img">
        <v-img :src="require('../assets/eemo_logo.png')" class="my-3" contain position="center center"></v-img>
      </div>
    </v-col>
    <v-col cols="12">
      <transition name="fade">
      <div v-if="!initialized" class="action-pane">
        <v-card max-width="500" class="mx-auto">
          <v-list>
            <v-list-item v-for="item in operations" :key="item.label">
              <v-list-item-content>
                <v-list-item-title>
                  <span :class="{
                    'completed-success' : (item.completed && item.success),
                    'completed-failed' : (item.completed && !item.success)
                  }" v-text="item.label"></span>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-progress-circular v-if="!item.completed && !item.success" indeterminate color="primary"></v-progress-circular>
                <v-icon color="green accent-4" v-if="item.success && item.completed">mdi-check</v-icon>
                <v-icon color="red accent-4" v-if="!item.success && item.completed">mdi-close</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
      </transition>
      <transition name="fade">
      <div v-if="initialized" class="text-center action-pane">
        <v-btn color="success" class="start-btn" width="60%" to="/inspections">Start</v-btn>
      </div>
    </transition>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {

  },
  data() {
    return {
      localStorageTest: {
        used: 0,
        total: 0,
        display: 'Calculating...',
        low: false
      },
      initialized: false,
      operations: [{
          label: "Check Local Data",
          completed: false,
          success: false
        },
        {
          label: "Check Connectivity",
          completed: false,
          success: false
        },
/*        {
          label: "Check Sync Status",
          completed: false,
          success: false
        },
*/
        {
          label: "Application initialization",
          completed: false,
          success: false
        }
      ]
    }
  },
  methods: {
    initLocalStorage() {
      this.$store.commit('retrieveLocalStorage');
      // test localStorage
      this.localStorageTest = this.checkLocalStorage();
      this.$store.commit('setLocalStorageInfo', this.localStorageTest);
      this.operations[0].completed = true;

      if(this.localStorageTest.low || this.localStorageTest.total == 0) {
        this.operations[0].success = false;
      } else {
        this.operations[0].success = true;
      }
    },
    checkConnectivity() {
      this.$store.commit('checkConnection');
      let vueInstance = this;
      setTimeout(function() {
        if(vueInstance.$store.getters.getCloudConnection) {
          vueInstance.operations[1].success = true;
          vueInstance.operations[1].completed = true;
        } else {
          vueInstance.operations[1].completed = true;
        }
        vueInstance.completeInit();
      }, 3000);
    },
    completeInit() {
      let vueInstance = this;
      setTimeout(function() {
        vueInstance.operations[vueInstance.operations.length - 1].completed = true;
        vueInstance.operations[vueInstance.operations.length - 1].success = true;
      }, 1000);
      setTimeout(function() {
        vueInstance.initialized = true;
      }, 2000);
    }
  },
  mounted() {
    this.initLocalStorage();

    this.checkConnectivity();
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 1px;
}
</style>
