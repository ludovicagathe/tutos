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
        <transition name="slide" type="animation">
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2" v-if="visible">This is toggled</div>
        </transition>
        <transition name="slide" type="animation" appear>
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2">This is toggled</div>
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
  opacity: 0;
}
.slide-enter-active {
  animation: slidein 0.5s ease-out forwards;
  transition: opacity 1s;
}
.slide-leave {

}
.slide-leave-active {
  animation: slideout 0.5s ease-in forwards;
  opacity: 0;
  transition: opacity 1s;
}

@keyframes slidein {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes slideout {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(20px);
  }
}
</style>
