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
            <div v-if="progressStep >= 6 && appSupported" class="text-center action-pane">
              <v-btn color="success" class="start-btn" width="60%">Start</v-btn>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="progressStep < 6" class="text-center linear-load">
              <v-container>
                <v-row class="fill-height" align-content="center" justify="center">
                  <v-col cols="6">
                    <v-progress-linear color="primary" :value="percentLoaded" rounded height="12"></v-progress-linear>
                  </v-col>
                  <v-col class="subtitle-1 text-center" cols="12" v-text="progressMessage">
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="!appSupported" class="text-center support-error">
              <v-container>
                <v-row class="fill-height" align-content="center" justify="center">
                  <v-col cols="6">
                    <v-icon class="warn-icon">mdi-alert</v-icon>
                  </v-col>
                  <v-col class="subtitle-1 text-center" cols="12">
                    Some features are not available in your browser or storage full. <br />Please contact an administrator.
                  </v-col>
                </v-row>
              </v-container>
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
  name: 'Home',

  components: {},
  data() {
    return {
      progressStep: 0,
      localStorageReady: false,
      online: false,
      lowStorage: false,
      deviceID: "",
    }
  },
  computed: {
    appSupported() {
      return !this.lowStorage && this.localStorageReady;
    },
    percentLoaded() {
      return Math.ceil(this.progressStep / 6 * 100)
    },
    progressMessage() {
      switch (this.progressStep) {
        case 1:
          return "Checking localStorage support"
        case 2:
          return this.localStorageReady ? "localStorage available" : "localStorage not supported"
        case 3:
          return "Checking available capacity"
        case 4:
          return (!this.lowStorage) ? "Storage available" : "Storage low"
        case 5:
          return (this.deviceID) ? "Device ID available" : "Device not registered"
        case 6:
          return "Loading complete"
        default:
          return "Initialising"
      }
    }
  },
  methods: {
    checkLocalStorage() {
      if (localStorage) {
        localStorage.setItem("test", "value");
        if (localStorage.test === "value") {
          localStorage.removeItem("test");
          this.localStorageReady = true;
          return true;
        }
      }
      return false;
    },
    localStorageStatus() {
      if (localStorage) {
        localStorage.removeItem('sessionCapacity');
        var i = 0;
        try {
          // Test up to 10 MB
          // for (i = 0; i < 10000; i += 250) {
          //   localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
          // }
          // Test for 500 kB free space
          for (i = 0; i < 500; i += 250) {
            localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            localStorage.removeItem('test');
            localStorage.setItem('sessionCapacity', "1");
          }
        } catch (e) {
          localStorage.removeItem('test');
          this.lowStorage = true;
        }
      }
      return true;
    },
  },
  mounted() {
    let self = this;
    let wait = 500;

    // check localStorage availability
    setTimeout(() => {
      self.progressStep++;
      // check for available capacity
      setTimeout(() => {
        if (self.checkLocalStorage());
        self.progressStep++;
        setTimeout(() => {
          self.progressStep++;
          if (self.localStorageStatus()) {
            setTimeout(() => {
              self.progressStep++;
              setTimeout(() => {
                if(localStorage && localStorage.deviceID) {
                  self.deviceID = localStorage.deviceID;
                } else {
                  self.deviceID = "";
                }
                self.progressStep++;
                setTimeout(() => {
                  self.progressStep++;
                }, wait);
              }, wait);
            }, wait);
          }
        }, wait);
      }, wait);
    }, wait);

    // if not calculated, get total localStorage

    // check for existing inspection data

    // check for internet


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

.linear-load {
  height: 300px;
}

.warn-icon {
  font-size: 72px !important;
  color: red !important;
}

.support-error {
  color: red;
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
