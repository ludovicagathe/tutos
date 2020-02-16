<template>
<v-app>
  <v-content>
    <v-container fill-height>
      <v-row no-gutters>
        <v-col cols="12">
          <v-app-bar app color="indigo lighten-3" dark>
            <v-btn href="/inspections.html" fab color="grey lighten-4" height="32" width="32" class="mr-6">
              <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
            </v-btn>
            <div class="d-flex align-center">
              <v-img alt="Energy Efficiency Management Office" class="stretch mr-2" contain src="../../assets/eemo_logo.png" href="/index.html" transition="scale-transition" width="100" />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="/config.html" fab color="blue lighten-5" height="32" width="32" class="mr-12">
              <v-icon color="#999999">mdi-settings</v-icon>
            </v-btn>

            <v-btn dark color="primary" @click="openAddSheet">
              <span class="mr-2">New Sheet</span>
              <v-icon>mdi-file-plus</v-icon>
            </v-btn>
          </v-app-bar>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-container class="list-pane">
            <v-row align="start">
              <v-col cols="10" class="offset-sm-1">
                <h2 class="green--text text--accent-4">Inspection</h2>
              </v-col>
              <v-col cols="5" class="offset-sm-1">
                <h3 class="mx-3 mb-3"><v-icon class="mr-6">mdi-calendar</v-icon>Date</h3>
                <p class="mx-3 mb-3" v-text="parentDetails.date"></p>
                <h3 class="mx-3 mb-3"><v-icon class="mr-6">mdi-account</v-icon>Officer 1</h3>
                <p class="mx-3 mb-3" v-text="parentDetails.officer1"></p>
              </v-col>
              <v-col cols="5" class="offset-sm-1">
                <h3 class="mx-3 mb-3"><v-icon class="mr-6">mdi-map-marker</v-icon>Locality</h3>
                <p class="mx-3 mb-3" v-text="parentDetails.locality"></p>
                <h3 class="mx-3 mb-3"><v-icon class="mr-6">mdi-account</v-icon>Offier 2</h3>
                <p class="mx-3 mb-3" v-text="parentDetails.officer2"></p>
              </v-col>

              <v-col cols="12" min-height="300">
                <v-card max-width="96%" class="mx-auto">
                  <v-toolbar color="blue darken-4" dark>
                    <v-toolbar-title>Dealer</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="pl-12">Point of Sale</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>No. of Non Compliance</v-toolbar-title>
                  </v-toolbar>

                  <v-list two-line subheader>
                    <v-list-item-group color="primary">
                      <div v-for="(item, index) in dealers" :key="item.date + '-' + index">
                        <v-list-item color="primary">
                          <v-list-item-content v-text="item.name"></v-list-item-content>
                          <v-spacer></v-spacer>
                          <v-list-item-content v-text="item.pos" class="pr-12"></v-list-item-content>
                          <v-spacer></v-spacer>
                          <v-list-item-content>
                            <span v-text="item.nonCompliance.length" class="text-center"></span>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider v-if="index + 1 < dealers.length" :key="index"></v-divider>
                      </div>
                    </v-list-item-group>


                  </v-list>
                </v-card>
              </v-col>

            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col col="12">
          <v-footer fixed class="footer">
            <!--div :class="{ 'low-storage' : localStorageTest.low }" class="mr-4">localStorage: {{ localStorageTest.display }}</div-->
            <!--div class="mr-4">RM Count: {{ this.$store.getters.getRMCount }}</div>
            <div class="mr-4" v-if="$store.getters.getLastSaved">Last Saved: {{ this.$store.getters.getLastSaved }}</div-->
            <v-spacer></v-spacer>
            <div>Developed by and &copy; EEMO 2020</div>
          </v-footer>
        </v-col>
      </v-row>

      <!--v-row justify="center">
        <v-dialog v-model="dialogAdd" persistent max-width="60%">
          <v-card>
            <v-card-title class="headline">Add New Sheet ?</v-card-title>
            <v-card-text>
              <v-form class="pa-3" ref="form">
                <v-text-field label="Locality" v-model="newInspection.locality" :rules="validation.locality"></v-text-field>

                <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" min-width="200px" v-model="dateMenu">
                  <template v-slot:activator="{ on }">
                    <v-text-field slot="activator" label="Date" prepend-icon="event" :value="newInspection.date" readonly v-on="on" :rules="validation.date"></v-text-field>
                  </template>
                  <v-date-picker v-model="newInspection.date" @input="dateMenu = false"></v-date-picker>
                </v-menu>

                <v-select :items="['a','b','c']" label="Enforcement Officer 1" solo v-model="newInspection.officer1" :rules="validation.enforcement"></v-select>

                <v-select :items="['a','b','c']" label="Enforcement Officer 2" solo v-model="newInspection.officer2" :rules="validation.enforcement"></v-select>

              </v-form>
            </v-card-text>
            <v-card-text v-if="dialogText != ''" v-text="dialogText" class="low-storage"></v-card-text>
            <v-card-actions>
              <v-btn color="error dark" @click="closeForm">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success dark" @click="addInspection">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :multi-line="true">
          {{ snackbarText }}
          <v-btn color="red" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </v-row-->
    </v-container>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'Inspections',

  components: {

  },
  data() {
    return {
      dealers: [
        {
        name: "test dealer",
        pos: "Dealer Address, Somewhere, Maybe a long address",
        timeIn: "10:00",
        timeOut: "10:30",
        allInspected: {

        },
        nonCompliance: [4,5,6,3,7,5]
        }
      ],
      dialogAdd: false,
      dialogText: "",
      dateMenu: false,
      saveLocal: "",
      snackbar: false,
      snackbarText: "",
      inspections: [],
      parentDetails: {},
      queryParams: this.getQueryParams(),
      newSheet: {
        dealer: "",
        pointOfSale: "",
        timeIn: "",
        timeOut: "",
        pid: 0
      },
      validation: {
        locality: [
          val => (val && val.length > 2) || "Minimum input is 3 characters"
        ],
        date: [
          val => (val && new Date(val).getTime() <= (new Date().getTime() + (4 * 3600000))) || "Inspection date cannot occur in the future"
        ],
        enforcement: [
          val => (val && val.length > 0) || "Enforcement Officer field is mandatory",
          val => (val && (this.newInspection.officer1 != this.newInspection.officer2) && (val != "")) || "Enforcement Officer " + val + " name cannot be used twice"
        ]
      }
    }
  },
  computed: {},
  methods: {
    openAddSheet() {
      this.dialogAdd = true;
    },
    addSheet() {
      console.log("Add Sheet");
    },
    getParentInspection() {
      let inspections = [];
      let self = this;
      try {
        inspections = JSON.parse(localStorage.getItem('inspections'));
      } catch (e) {
        self.snackbarText = "No inspection on device";
        self.snackbar = true;
        self.parentDetails = {};
      }
      if (Array.isArray(inspections)) {
        self.parentDetails = inspections.filter((inspected) => {
          return inspected.id == parseInt(self.queryParams.iid);
        })[0];
      } else {
        self.snackbarText = "Inspection data corrupted"
        self.snackbar = true;
        self.parentDetails = {};
      }
    },
    closeForm() {
      // close form
    },
    getQueryParams() {
      let params = {}; window.location.search.substring(1).split("&").forEach((a) => {
        let splitted = a.split("=");
        params[splitted[0]] = splitted[1];
      });
      return params;
    }
  },
  mounted() {
    //this.TEST_fillLocalStorage(true);
    document.title = "Inspection" + this.queryParams.iid;
    this.getParentInspection();
    console.log(this.parentDetails);
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
