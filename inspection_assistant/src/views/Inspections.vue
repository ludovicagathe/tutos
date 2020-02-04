<template>
<v-container fill-height>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar app color="indigo lighten-3" dark>
        <div class="d-flex align-center">
          <v-img alt="Energy Efficiency Management Office" class="stretch mr-2" contain src="../assets/eemo_logo.png" transition="scale-transition" width="100" />
        </div>

        <v-spacer></v-spacer>

        <v-btn href="/" dark color="error" class="mr-6">
          <span class="mr-2">Sync</span>
          <v-icon>mdi-sync</v-icon>
        </v-btn>

        <v-btn dark color="primary" @click="openAddInspection">
          <span class="mr-2">New Inspection</span>
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
                <div v-for="(item, index) in items" :key="item.date + '-' + index">
                  <v-list-item>
                    <v-list-item-content v-text="item.date"></v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-content v-text="item.locality"></v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-content>
                      <span v-text="item.dealers.length" class="text-center"></span>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
                </div>


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
        <div :class="{ 'low-storage' : localStorageTest.low }" class="mr-4">localStorage: {{ localStorageTest.display }}</div>
        <div class="mr-4">RM Count: {{ this.$store.getters.getRMCount }}</div>
        <div class="mr-4" v-if="$store.getters.getLastSaved">Last Saved: {{ this.$store.getters.getLastSaved }}</div>
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
            <v-text-field
              label="Locality"
              v-model="newInspection.locality"
              :rules="validation.locality"
            ></v-text-field>

            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  slot="activator"
                  label="Date"
                  prepend-icon="event"
                  :value="newInspection.date"
                  readonly v-on="on"
                  :rules="validation.date"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newInspection.date"></v-date-picker>
            </v-menu>

            <v-select :items="enforcementList" label="Enforcement Officer 1" solo v-model="newInspection.officer1" :rules="validation.enforcement"></v-select>

            <v-select :items="enforcementList" label="Enforcement Officer 2" solo v-model="newInspection.officer2" :rules="validation.enforcement"></v-select>

          </v-form>
        </v-card-text>
        <v-card-text v-if="dialogText != ''" v-text="dialogText" class="low-storage"></v-card-text>
        <v-card-actions>
          <v-btn color="error dark" @click="dialogAdd = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success dark" @click="addInspection">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Inspections',

  data() {
    return {
      localStorageTest: {
        used: 0,
        total: 0,
        display: 'Calculating...',
        low: false
      },
      lowStorage: false,
      dialogAdd: false,
      dialogText: "",
      saveLocal: { error: false, errorDescription: ""},
      newInspection: {
        locality: "",
        date: "",
        officer1: "",
        officer2: "",
        dealers: []
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

  computed: {
    items() {
      return this.$store.getters.getInspections;
    },
    enforcementList() {
      return this.$store.getters.getEnforcement.map((obj) => {
        return obj.name;
      });
    }
  },

  methods: {
    openAddInspection() {
      if(this.newInspection.locality != "" || this.newInspection.date != "" || this.newInspection.officer1 != "" || this.newInspection.officer2 != "") {
        this.newInspection.locality = "";
        this.newInspection.officer1 = "";
        this.newInspection.officer2 = "";
        this.newInspection.date = "";
        this.$refs.form.reset();
      }
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
      if(this.$refs.form.validate()) {
        this.dialogAdd = false;
        inspectionObject.locality = this.newInspection.locality;
        inspectionObject.date = this.newInspection.date;
        inspectionObject.officer1 = this.newInspection.officer1;
        inspectionObject.officer2 = this.newInspection.officer2;
        this.saveLocal = this.saveToStore(inspectionObject, 'inspections');
      }
    },
  },

  mounted() {
    // attempt localStorage retrieval
    this.$store.commit('retrieveLocalStorage');
    // test localStorage
    let localData = this.localStorageTest = this.checkLocalStorage(); this.$store.commit('setLocalStorageInfo', localData);
  }
};
</script>

<style>
.low-storage {
  color: red;
}
.footer {
  font-size: 0.75em
}
</style>
