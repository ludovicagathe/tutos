<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6 offset-xs3 mb-5>
        <h1>Transitions</h1>
        <v-btn color="primary" @click="visible = !visible">Toggle</v-btn>
        <transition name="fade">
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2" v-if="visible">This is toggled</div>
        </transition>
        <transition name="slide">
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2" v-if="visible">This is toggled</div>
        </transition>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    visible: false
  })
}
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {

}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
.slide-enter {
  transform: translateY(50px);
}
.slide-enter-active {
  animation: slidein 1s ease-in 1 forwards;
}
.slide-leave {

}
.slide-leave-active {
  transform: translateY(50px);
  animation: slideout 1s ease-out 1 forwards;
}

@keyframe slidein {
  0% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframe slideout {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(50px);
  }
}
</style>
