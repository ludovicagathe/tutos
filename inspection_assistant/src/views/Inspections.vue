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

        <v-btn href="/" dark color="primary">
          <span class="mr-2">New Inspection</span>
          <v-icon @click="dialogAdd = true">mdi-file-plus</v-icon>
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
                <v-toolbar-title class="subtitle-2 px-6">Date</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="subtitle-2">Locality</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="subtitle-2">No. of Dealers</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="subtitle-2">Delete</v-toolbar-title>
              </v-toolbar>

              <v-list two-line subheader>
                <div v-for="(item, index) in items" :key="item.date">
                  <v-list-item>
                    <v-list-item-content v-text="item.date"></v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-content v-text="item.locality"></v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-content v-text="item.dealers.length"></v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="red lighten-1">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
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
        <div :class="{ 'low-storage' : lowStorage }" class="mr-4">localStorage: {{ localStorageTest }}</div>
        <div class="mr-4">RM Count: {{ this.$store.getters.getRMCount }}</div>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-col>
  </v-row>

  // modal
  <v-row justify="center">
    <v-dialog v-model="dialogAdd" persistent max-width="60%">
      <v-card>
        <v-card-title class="headline">Add New Sheet ?</v-card-title>
        <v-card-text v-if="dialogText == ''">

        </v-card-text>
        <v-card-text v-else v-text="dialogText"></v-card-text>
        <v-card-actions>
          <v-btn color="error dark" @click="dialogAdd = false">Disagree</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="addSheet">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Inspections',

  data: () => ({
    localStorageTest: localStorage ? "Available" : "Not available",
    lowStorage: false,
    dialogAdd: false,
    dialogText: ""
  }),

  computed: {
    items() {
      return this.$store.getters.getInspections
    }
  },

  methods: {
    checkLocalStorage() {
      let existingLocalStorage = JSON.stringify(localStorage).length;
      let totalLocalStorage = 0;
      if (localStorage) {
        var i = 0;
        try {
            // Test up to 10 MB
            for (i = 0; i < 10000; i += 250) {
                localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            }
        } catch (e) {
            localStorage.removeItem('test');
            totalLocalStorage = (i +  (existingLocalStorage / 1024)) / 1024;
            if(totalLocalStorage - (existingLocalStorage / 1024) < totalLocalStorage / 10) {
              this.lowStorage = true;
            }
        }
      } else {
        return {
          used: 0,
          total: 0
        }
      }
      this.localStorageTest = ((existingLocalStorage / 1024 / 1024)).toFixed(2) + " / " + totalLocalStorage.toFixed(2) + " MB";
      return {
        used: (existingLocalStorage / 1024 / 1024),
        total: totalLocalStorage
      }
    },
    addSheet() {
      this.dialogAdd = false;

    }
  },

  mounted() {
    // test localStorage
    this.checkLocalStorage();
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
