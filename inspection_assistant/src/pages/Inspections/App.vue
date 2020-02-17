<template>
<v-app>
  <v-content>
    <v-container fill-height>
      <v-row no-gutters>
        <v-col cols="12">
          <v-app-bar app color="indigo lighten-3" dark>
            <div class="d-flex align-center">
              <v-img alt="Energy Efficiency Management Office" class="stretch mr-2" contain src="../../assets/eemo_logo.png" href="./index.html" transition="scale-transition" width="100" />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="./config.html" fab color="blue lighten-5" height="32" width="32" class="mr-12">
              <v-icon color="#999999">mdi-settings</v-icon>
            </v-btn>

            <v-btn dark color="primary" @click="openAddInspection">
              <span class="mr-2">New Inspection</span>
              <v-icon>mdi-folder-plus-outline</v-icon>
            </v-btn>
          </v-app-bar>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-container class="list-pane">
            <v-row align="start">
              <v-col cols="10" class="offset-sm-1">
                <h2>Inspection Records on this Device</h2>
              </v-col>

              <v-col cols="12">
                <v-card max-width="96%" class="mx-auto">
                  <v-toolbar color="blue darken-4" dark>
                    <v-toolbar-title>Date</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Locality</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>No. of Dealers</v-toolbar-title>
                  </v-toolbar>

                  <v-list two-line subheader>
                    <v-list-item-group color="primary">
                      <div v-for="(item, index) in inspections" :key="item.date + '-' + index">
                        <v-list-item color="primary" :href="'./inspection.html?iid=' + item.id">
                          <v-list-item-content v-text="item.date"></v-list-item-content>
                          <v-spacer></v-spacer>
                          <v-list-item-content v-text="item.locality"></v-list-item-content>
                          <v-spacer></v-spacer>
                          <v-list-item-content>
                            <span v-text="item.dealers.length" class="text-center"></span>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider v-if="index + 1 < inspections.length" :key="index"></v-divider>
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

      <v-row justify="center">
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

                <v-select :items="settings.officers" label="Enforcement Officer 1" solo v-model="newInspection.officer1" :rules="validation.enforcement"></v-select>

                <v-select :items="settings.officers" label="Enforcement Officer 2" solo v-model="newInspection.officer2" :rules="validation.enforcement"></v-select>

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
      </v-row>
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
      dialogAdd: false,
      dialogText: "",
      dateMenu: false,
      saveLocal: "",
      snackbar: false,
      snackbarText: "",
      inspections: [],
      newInspection: {
        locality: "",
        date: "",
        officer1: "",
        officer2: ""
      },
      settings: this.getSettings(),
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
    openAddInspection() {
      this.dialogAdd = true;
    },
    addInspection() {
      let inspectionObject = {
        locality: "",
        date: "",
        officer1: "",
        officer2: "",
        dealers: []
      }
      if (this.$refs.form.validate()) {
        this.dialogAdd = false;
        inspectionObject.locality = this.newInspection.locality;
        inspectionObject.date = this.newInspection.date;
        inspectionObject.officer1 = this.newInspection.officer1;
        inspectionObject.officer2 = this.newInspection.officer2;
        if (this.localStorageAvailable()) {
          this.saveLocal = this.saveToStore(inspectionObject, 'inspections');
        } else {
          this.saveLocal = "Storage space not available"
        }
        if (this.saveLocal != "ok") {
          this.snackbarText = this.saveLocal;
          this.snackbar = true;
        } else {
          this.snackbarText = "Saved";
          this.snackbar = true;
          this.$refs.form.reset();
          this.inspectionObject = {
            locality: "",
            date: "",
            officer1: "",
            officer2: "",
            dealers: []
          };
          this.getInspections();
        }
      }
    },
    getInspections() {
      let inspections = [];
      let self = this;
      try {
        inspections = JSON.parse(localStorage.getItem('inspections'));
        if (Array.isArray(inspections)) {
          self.inspections = inspections.sort((a, b) => {
            return (a.date < b.date) ? 1 : -1;
          })
        } else {
          self.snackbarText = "Inspection data absent or corrupted"
          self.snackbar = true;
          localStorage.setItem('inspections', "")
        }
      } catch (e) {
        self.snackbarText = "No inspection on device";
        self.snackbar = true;
        localStorage.setItem('inspections', "")
      }
    },
    getSettings() {
      let settings = JSON.parse(localStorage.getItem('settings'));
      let self = this;
      let defaultSettings = '{"officers":["Mr O. Sewtohul","Mr K. Ramkurrun","Ms S. Safee","Mr K.Sooruth","Mr L. Agathe","Mr H. Gunness","Mr D. Mahadawoo","Engineer 4"],"regulatedMachinery":["Refrigerating Appliances","Electric Ovens","Dishwashers","Washing Machines","Air Conditioners","Televisions"]}';
      try {
        if (Object.keys(settings).length > 0) {
          return settings;
        } else {
          self.snackbarText = "Settings not found. Using default"
          self.snackbar = true;
          localStorage.setItem('settings', defaultSettings);
          settings = JSON.parse(defaultSettings);
        }
      } catch (e) {
        self.snackbarText = "Settings not found. Using default";
        self.snackbar = true;
        localStorage.setItem('settings', defaultSettings);
        settings = JSON.parse(defaultSettings);
      }
      return settings;
    },
    closeForm() {
      this.$refs.form.reset();
      this.inspectionObject = {
        locality: "",
        date: "",
        officer1: "",
        officer2: "",
        dealers: []
      }
      this.dialogAdd = false;
    }
  },
  mounted() {
    //this.TEST_fillLocalStorage(true);
    this.getInspections();
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
