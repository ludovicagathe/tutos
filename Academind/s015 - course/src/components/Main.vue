<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6>
        <!-- Firebase -->
        <v-flex xs12 mb-5>
          <h3>Get First Document</h3>
          <h5 class="text-xs-center">{{ first_doc.title }}</h5>
          <p v-if="first_doc.body != ''">{{ first_doc.body }}</p>
          <p class="info">{{ first_doc.info }}</p>
        </v-flex>

        <v-flex xs4 offset-xs4 mb-5>
          <h2>New Doc</h2>
          <v-text-field label="Title" v-model="new_doc.title"></v-text-field>
          <br>
          <v-textarea label="Enter new content here" v-model="new_doc.body"></v-textarea>
          <br>
          <v-btn color="info" @click="send">Submit</v-btn>
        </v-flex>

        <v-flex xs8 offset-xs2>
          <div v-if="!fetch_all" class="text-xs-center"><v-btn color="success" @click="fetch_now">Fetch All</v-btn></div>
          <div v-else class="text-xs-center">
          </div>
        </v-flex>
      </v-flex>

      <!-- Vue resource -->
      <v-flex xs6 wrap>
        <v-flex xs12 pa-3>
          <v-btn color="success" @click="get_from_server">Fetch</v-btn>
        </v-flex>
        <v-flex xs6 mr-1 pa-3>
          Data: {{ this.from_server.session_hash }}
        </v-flex>
        <v-flex xs6 pa-3>
          Data: {{ this.from_server.access }}
        </v-flex>
        <v-flex xs6 mr-1 pa-3>
          Data: {{ this.from_server.random_colour }}
        </v-flex>
        <v-flex xs6 pa-3>
          Data: {{ this.from_server.validity }}
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      first_doc: {
        title: "Fetching...",
        body: "Fetching...",
        created: 0,
        created_disp: "",
        modified: 0,
        modified_disp: "",
        info: ""
      },
      from_server: {
        session_hash: "--",
        access: "--",
        random_colour: "--",
        validity: 0
      },
      new_doc: {
        title: "",
        body: "",
        modified: Date.now()
      },
      fetch_all: false,
      db: this.$firebase.firestore
    }
  },
  methods: {
    fetch_doc() {
      var _vueapp = this;
      this.db().collection('Docs').doc('docs').get().then(function(result) {
        if (!result.exists) {
          _vueapp.first_doc.title = "No record found";
          _vueapp.first_doc.body = "";
          return;
        } else {
          let got = result.data();
          _vueapp.first_doc.title = got.title;
          _vueapp.first_doc.body = got.body;
          if(typeof got.created == "number") {
            got.created = _vueapp.db.Timestamp.fromDate(new Date(got.created));
          }

          if(typeof got.modified == "number") {
            got.modified = _vueapp.db.Timestamp.fromDate(new Date(got.modified));
          }

          _vueapp.first_doc.created = got.created.toDate();
          _vueapp.first_doc.modified = got.modified.toDate();
        }
      }).catch(function(error) {
        //eslint-disable-next-line
        console.log(error);
        _vueapp.first_doc.title = "Attention!";
        _vueapp.first_doc.body = "An error occurred";
      });
    },

    get_from_server() {
      this.$http.get('')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // this.from_server.session_hash = data.session_hash;
          // this.from_server.access = data.access;
          // this.from_server.random_colour = data.random_colour;
          // this.from_server.validity = data.validity;
          this.from_server = data;
        });
    },

    send() {
      // this.new_doc.created = this.$firebase.firestore.Timestamp.fromDate(new Date());
      this.new_doc.modified = this.db.Timestamp.fromDate(new Date());

      this.db().collection('Docs').doc('docs').set(this.new_doc, { merge: true });

      this.new_doc.title = "";
      this.new_doc.body = "";
    },

    fetch_now() {

    }
  },
  watch: {
    'first_doc.modified': {
      deep: true,
      immediate: true,
      handler() {
        let tmp = this.first_doc.created;
        if(tmp == 0) {
          return;
        }
        tmp = new Date(tmp);
        this.first_doc.info = "Created: " + tmp.toISOString() + " | Modified: ";
        tmp = new Date(this.first_doc.modified);
        this.first_doc.info += tmp.toISOString();
      }
    }
  },
  created() {
    this.fetch_doc();
  }
}
</script>

<style>
p.info {
  background-color: #EEE !important;
  color: #5b5fd1;
  font-size: 8px;
  font-size: 3vh;
  line-height: 10px;
  line-height: 4vh;
}
</style>
