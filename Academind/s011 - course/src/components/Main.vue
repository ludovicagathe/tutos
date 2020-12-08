<template>
  <v-container grid-list-lg>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6 mb-5>
        <v-form>
          <v-toolbar dark color="blue" py-2>
            <v-toolbar-title>Form</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <div class="px-5 pt-2">
              <v-text-field label="email" id="email" @change="email_fn" my-0></v-text-field>
              <v-text-field label="password" type="password" required @change="passwd_fn"></v-text-field>
              <v-text-field label="age" type="number" @change="age_fn" suffix="years" min="50" step="4" class="mb-2"></v-text-field>
              <v-textarea solo clearable auto-grow counter="140" rows="3" class="pb-3 mb-2" @change="message_fn" @blur="message_fn"></v-textarea>
              <v-layout row>
                <v-flex xs6><v-checkbox label="Send mail" @change="send_mail($event, 'sendmail')"></v-checkbox></v-flex>
                <v-flex xs6><v-checkbox label="Send info mail" @change="send_mail($event, 'sendinfomail')"></v-checkbox></v-flex>
              </v-layout>
              <v-layout>
                <v-radio-group v-model="sex" row>
                  <v-radio label="male" value="male"></v-radio>
                  <v-radio label="female" value="female"></v-radio>
                </v-radio-group>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-select :items="Object.keys(priority)" label="Priority" solo mb-3 v-model="status"></v-select>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
        </v-form>
      </v-flex>

      <v-flex xs6 mb-5 shrink>
        <div id="controls">
          <v-btn @click="submit" v-if="!submitted" color="success">submit</v-btn>
        </div>
        <div id="results" v-if="submitted" >
          <v-toolbar dark color="pink" py-2>
            <v-toolbar-title>Results</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="submitted = !submitted" color="error">clear</v-btn>
          </v-toolbar>

          <v-card>
            <v-layout px-5 pt-2 mb-2>
              <v-flex xs3 offset-xs1>
                e-mail:
              </v-flex>
              <v-flex xs7>{{ email }}</v-flex>
            </v-layout>
            <v-layout px-5 pt-2 mb-2>
              <v-flex xs3 offset-xs1>
                Password:
              </v-flex>
              <v-flex xs7>{{ passwd }}</v-flex>
            </v-layout>
            <v-layout px-5 pt-2 mb-2>
              <v-flex xs3 offset-xs1>
                Age:
              </v-flex>
              <v-flex xs7>{{ age }}</v-flex>
            </v-layout>
            <v-layout px-5 pt-2 mb-2>
              <v-flex xs3 offset-xs1>
                Message:
              </v-flex>
              <v-flex xs7 text-output>{{ message }}</v-flex>
            </v-layout>
            <v-layout px-5 pt-2 mb-2>
              <v-flex xs3 offset-xs1>
                Sex:
              </v-flex>
              <v-flex xs7>{{ sex }}</v-flex>
            </v-layout>
            <v-layout px-5 pt-2 v-for="(option, key) in mail_options" :key="option.id" mb-2>
              <v-flex xs3 offset-xs1>
                Send mail option ({{ key }}) :
              </v-flex>
              <v-flex xs7>{{ option }}</v-flex>
            </v-layout>
            <v-layout pt-2 mb-2 style="margin: auto 0px;">
              <v-flex justify-center xs12 dark :style="{ 'background-color': priority[status], 'color': 'white', 'margin': 'auto 0'}" pa-3>
                <div>{{ status }}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      email: "",
      passwd: "",
      age: 0,
      message: "",
      mail_options: { sendmail: false, sendinfomail: false },
      sex: '',
      priority: {
        'Critical':'crimson',
        'Severe':'lightcoral',
        'Serious':'pink',
        'Medium':'lightblue',
        'Low':'turquoise',
        'Insignificant':'lime'
      },
      status: 'Medium',
      submitted: false
    }),
    methods: {
      email_fn(value) {
        this.email = value;
      },
      passwd_fn(value) {
        this.passwd = value;
      },
      age_fn(value) {
        this.age = value;
      },
      message_fn(value) {
        if(typeof value == 'string') {
          this.message = value;
        } else {
          this.message = value.target.value;
        }
      },
      send_mail(ev, index) {
        this.mail_options[index] = !this.mail_options[index];
      },
      submit() {
        this.submitted = true;
      }
    }
  }
</script>

<style>
.text-output {
  white-space: pre;
}
</style>
