<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6 offset-xs3 mb-5 v-if="!started">
        <v-btn color="success" @click="start_quiz">START</v-btn>
      </v-flex>
      <v-flex xs6 offset-xs3 mb-5 v-else-if="finish">
        <h1 class="text-xs-center">Congratulations for completing the quiz!</h1>
      </v-flex>
      <v-flex xs6 offset-xs3 mb-5 v-else>
        <template v-for="(question, index) in questions">
          <div class="text-xs center" :key="'q-' + index" v-if="!question.right_answer">
            <h2 class="text-xs-center">What is {{ question.evaluate }} ?</h2>
            <v-layout>
              <v-flex xs6 v-for="(option, ind) in question.shuffle" :key="'op-' + ind">
                <v-btn color="primary" @click="check_answer(index, option)">{{ option }}</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </template>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    started: false,
    finish: false,
    questions: [
      {
        evaluate: "1 + 1",
        answer: 0,
        options: [
        ],
        right_answer: false,
        shuffle: []
      },
      {
        evaluate: "6 + 1",
        answer: 0,
        options: [
        ],
        right_answer: false,
        shuffle: []
      },
      {
        evaluate: "1 + 9",
        answer: 0,
        options: [
        ],
        right_answer: false,
        shuffle: []
      },
      {
        evaluate: "1 - 10",
        answer: 0,
        options: [
        ],
        right_answer: false,
        shuffle: []
      },
      {
        evaluate: "20 - 1",
        answer: 0,
        options: [
        ],
        right_answer: false,
        shuffle: []
      }
    ]
  }),
  methods: {
    start_quiz() {
      for(var i = 0; i < this.questions.length; i++) {
        this.questions[i].answer = eval(this.questions[i].evaluate);
        this.questions[i].options = [
            this.questions[i].answer,
            this.questions[i].answer + Math.ceil(Math.random() * 4),
            this.questions[i].answer - Math.ceil(Math.random() * 4),
            this.questions[i].answer + Math.ceil(Math.random() * 4) + 4
        ];
        this.questions[i].shuffle = this.shuffle_options(this.questions[i].options);
      }
      this.started = true;
    },
    shuffle_options(options) {
      var arr = options.map(function(item) { return item });
      for(var i = 0; i < arr.length; i++) {
       var tmp = Math.floor(Math.random() * arr.length);
       // eslint-disable-next-line
       console.log(tmp);
       var swap = arr[i];
       arr[i] = arr[tmp];
       arr[tmp] = swap;
      }

      return arr;
    },
    check_answer(q_i, ans) {
      if(this.questions[q_i].answer == ans) {
        this.questions[q_i].right_answer = true;
      }
    }
  }
}
</script>

<style>

</style>
