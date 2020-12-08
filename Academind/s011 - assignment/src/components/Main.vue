<template>
  <v-container grid-list-lg justify-center>
    <v-layout>
      <v-flex xs6 offset-xs3 v-if="!submitted">
        <v-card>
          <v-card-title class="red text-xs-center" dark primary-title>
            <h3 class="grow">Registration</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="First Name" v-model="first_name" solo mb-2></v-text-field>
              <v-text-field label="Last Name" v-model="last_name" solo mb-2></v-text-field>
              <v-text-field label="Full Name" :value="full_name" disabled solo mb-2></v-text-field>
              <v-text-field label="e-mail" type="email" v-model="email" solo mb-2></v-text-field>
              <v-text-field label="Password" type="password" v-model="password" solo mb-2></v-text-field>
              <v-switch v-model="save" :label="'Save data? ' + (save ? 'Yes' : 'No')" mb-2></v-switch>
              <v-btn color="success" @click="submit">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 offset-xs3 v-if="submitted">
        <v-card>
          <v-card-title class="blue text-xs-center" dark primary-title>
            <h3 class="grow">Your Submission</h3>
          </v-card-title>
          <v-card-text>

            <v-layout row wrap>
              <v-flex xs6 text-xs-right>
                <h4>First Name</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ first_name }}
              </v-flex>

              <v-flex xs6 text-xs-right>
                <h4>Last Name</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ last_name }}
              </v-flex>

              <v-flex xs6 text-xs-right>
                <h4>First Name</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ full_name }}
              </v-flex>

              <v-flex xs6 text-xs-right>
                <h4>e-mail</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ email }}
              </v-flex>

              <v-flex xs6 text-xs-right>
                <h4>Password</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ password }}
              </v-flex>

              <v-flex xs6 text-xs-right>
                <h4>Save Data</h4>
              </v-flex>
              <v-flex xs6 text-xs-left>
                {{ (save ? 'Yes' : 'No') }}
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      first_name: "",
      last_name: "",
      save: false,
      email: "",
      password: "",
      submitted: false
    }),
    methods: {
      submit() {
        this.submitted = !this.submitted;
      }
    },
    computed:{
      full_name() {
        return this.first_name + ' ' + this.last_name;
      }
    }
  }
</script>

<style>
.red h3 {
  color: white;
}
</style>
