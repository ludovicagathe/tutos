<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12 mb-5>
        <h3>Get First Document</h3>
        <h5 class="text-xs-center">{{ first_doc.title }}</h5>
        <p v-if="first_doc.body != ''">{{ first_doc.body }}</p>
        <p class="info">{{ first_doc.info }}</p>
      </v-flex>

      <v-flex xs4 offset-xs4 mb-5>
        <h2>Update Doc</h2>
        <v-text-field label="Title" v-model="new_doc.title"></v-text-field>
        <br>
        <v-textarea label="Enter new_doc content here" v-model="new_doc.body"></v-textarea>
        <br>
        <v-btn color="info" @click="send">Submit</v-btn>
      </v-flex>

      <v-flex xs8 offset-xs2>
        <div v-if="!fetch_all" class="text-xs-center"><v-btn color="success" @click="fetch_now">Fetch All</v-btn></div>
        <div v-else class="text-xs-center">
        </div>
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
        modified: 0,
        info: ""
      },
      new_doc: {
        title: "",
        body: "",
      },
      fetch_all: false
    }
  },
  methods: {

    send() {

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
    const db = this.$firebase.firestore();
    db.collection('Docs').doc('docs').get().then(result => {
      if (!result.exists) {
        this.first_doc.title = "No record found";
        this.first_doc.body = "";
        return;
      } else {
        let got = result.data();
        this.first_doc.title = got.title;
        this.first_doc.body = got.body;
        this.first_doc.created = got.created.toDate();
        this.first_doc.modified = got.modified.toDate();
      }
    }).catch(error => {
      this.first_doc.title = "Attention!";
      this.first_doc.body = "An error occurred";
    });
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
