<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12 mb-5>
        <h1 class="text-xs-center">Some default Math</h1>
        <p>When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
      </v-flex>
      <v-flex xs12 mb-5>
        <h1 class="text-xs-center">Or the input version</h1>
        <p class="text-xs-justify" ref="mathval" v-html="math_val"></p>
        <hr>
        <v-textarea v-model="math_val" @change="update_math" solo auto-grow counter="140" rows="3" class="pb-3 mb-2"></v-textarea>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    math_val: ""
  }),
  methods: {
    update_math() {
      this.$nextTick(function() {
        try {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.$refs.mathval]);
        } catch {
          this.math_val = this.math_val;
        }
      });
    }
  }
}
</script>

<style>

</style>
