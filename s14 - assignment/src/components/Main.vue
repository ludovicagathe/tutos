<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <transition name="fade" appear>
        <v-flex xs6 offset-xs3 mb-5 v-if="!started">
          <v-btn color="success" @click="start_quiz">START</v-btn>
        </v-flex>
      </transition>

      <transition name="pushin" mode="out-in" class="flex xs12">
        <v-flex xs6 offset-xs3 mb-5 v-if="finish" :key="'finish'">
          <h1 class="text-xs-center">Congratulations for completing the quiz!</h1>
          <p>
            <v-btn color="error" @click="start_quiz">RESTART</v-btn>
          </p>
        </v-flex>
      </transition>

      <transition-group tag="div" name="pushin" mode="out-in" class="flex xs12">
        <v-flex xs6 offset-xs3 mb-5 v-if="started" :key="'question-' + Math.round(Math.random() * 100)">
          <template v-for="(question, index) in asking">
            <div class="text-xs center" :key="'q-' + index">
              <h2 class="text-xs-center">What is {{ question.evaluate }} ?</h2>
              <v-layout row wrap>
                <v-flex xs6 v-for="(option, ind) in question.shuffle" :key="'op-' + ind">
                  <v-btn color="primary" @click="check_answer(option)">{{ option }}</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </template>
        </v-flex>
      </transition-group>
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
    ],
    active_question: 0,
    asking: []
  }),
  methods: {
    start_quiz() {
      this.finish = false;
      this.started = false;
      this.active_question = 0;
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
      this.change_question();
    },
    shuffle_options(options) {
      var arr = options.map(function(item) { return item });
      for(var i = 0; i < arr.length; i++) {
       var tmp = Math.floor(Math.random() * arr.length);
       var swap = arr[i];
       arr[i] = arr[tmp];
       arr[tmp] = swap;
      }

      return arr;
    },
    check_answer(ans) {
      if(this.questions[this.active_question].answer == ans) {
        this.asking[0].right_answer = true;
        this.change_question();
      }
    },
    change_question() {
      if(!this.started) {
        this.asking = [];
      } else {
        if(this.asking.length < 1) {
          this.asking.push(this.questions[0]);
        }
        if(this.asking[0].right_answer == true) {
          this.active_question++;
          this.asking.pop();
          if(this.active_question < this.questions.length) {
            this.$nextTick(function() {
              this.asking.push(this.questions[this.active_question]);
            }, 2000);
          } else {
            this.finish = true;
          }
        }
      }
    }
  }
}
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-leave {
  position: absolute;
}
.fade-leave-active {
  transform: translateX(-1000px);
  opacity: 0;
  transition: transform 2s ease-in, opacity 2s ease-out;
}

.pushin-enter {
  opacity: 0;
  transform: translateX(1000px);
}
.pushin-enter-active {
  transition: transform 2s ease-in, opacity 2s ease-in;
}
.pushin-leave {
  overflow: visible;
}
.pushin-leave-active {
  transition: transform 2s ease-in, opacity 2s ease-out, height 0.01s ease-in;
  height: 1px;
}
.pushin-leave-to {
  transform: translateX(-1000px);
  opacity: 0;
  height: 1px;
}
</style>
