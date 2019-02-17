<template>
  <v-container>
    <v-layout class="new-quote">
      <v-flex class="xs6">
        <div>
          <label>Quote</label>
          <textarea name="" id="" cols="30" rows="3" class="form-control" v-model="quote"></textarea>
        </div>
        <div>
          <v-btn color="primary" ripple right @click.prevent="add_quote()">New Quote</v-btn>
        </div>
      </v-flex>
      <v-flex xs12 md12 lg12>
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="10"
          :value="quotes.length / max_quotes * 100"
          color="primary"
        >
          {{ quotes.length }}
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <QuoteGrid :quotes="quotes" @deleteThisQuote="delete_index" />
    <v-layout color="secondary">
      <v-flex xs12 md12 lg12 text-xs-center>Click on quote to delete it</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuoteGrid from './QuoteGrid'

export default {
  components: {
    QuoteGrid
  },
  data: () => ({
    quote: '',
    quotes: [
      "Just a simple quote",
      "And another quote"
    ],
    max_quotes: 10
  }),
  methods: {
    add_quote() {
      if(this.quotes.length < this.max_quotes) {
        this.quotes.push(this.quote);
        this.quote = '';
      }
    },
    delete_index(index) {
      this.quotes.splice(index, 1);
    }
  }
}
</script>

<style>

</style>
