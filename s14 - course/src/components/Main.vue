<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6 offset-xs3 mb-5>
        <h1>Transitions</h1>
        <v-btn color="primary" @click="visible = !visible">Toggle</v-btn>
        <v-btn color="success" @click="toggle = !toggle">Toggle</v-btn>
        <transition name="slide" type="animation" appear>
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2">This appears</div>
        </transition>
        <transition name="fade">
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2" v-if="visible">This is toggled</div>
        </transition>
        <transition name="slide" type="animation">
          <div class="pink accent-2 teal--text text--darken-2 font-weight-bold mb-2 pa-2" v-if="visible">This is toggled</div>
        </transition>
        <transition name="slide" type="animation" mode="out-in">
          <div class="red accent-2 amber--text text--lighten-5 font-weight-bold mb-2 pa-2" v-if="toggle" key="swap1">This is swapped: 1</div>
          <div class="red accent-2 amber--text text--lighten-5 font-weight-bold mb-2 pa-2" v-else key="swap2">This is swapped: 2</div>
        </transition>
        <transition name="slide" type="animation"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false">
          <div class="red accent-2 amber--text text--lighten-5 font-weight-bold mb-2 pa-2" v-if="toggle" key="swap1">Using Hooks</div>
        </transition>
        <hr>
        <v-btn color="success" @click="active_component == 'success-alert' ? active_component = 'danger-alert' : active_component = 'success-alert'">Dynamize</v-btn>
        <transition mode="out-in" name="fade">
          <component :is="active_component"></component>
        </transition>
        <hr>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import SuccessAlert from './SuccessAlert'
import DangerAlert from './DangerAlert'

export default {
  data: () => ({
    visible: false,
    toggle: true,
    element_width: 100,
    active_component: 'success-alert'
  }),
  methods: {
    beforeEnter(el) {
      console.log("before enter");
      this.element_width = 100;
      el.style.width = this.element_width + 'px';
    },
    enter(el, done) {
      console.log("entering");
      var self = this;
      let round = 1;
      var interval = setInterval(function() {
        el.style.width = (self.element_width + (round * 10)) + 'px';
        round++;
        if(round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log("entered");
    },
    enterCancelled(el) {
      console.log("cancelled");
    },
    beforeLeave(el) {
      console.log("before leaving");
      this.element_width = 300;
      el.style.width = this.element_width + 'px';
    },
    leave(el, done) {
      console.log("leaving");
      var self = this;
      let round = 1;
      var interval = setInterval(function() {
        el.style.width = (self.element_width - (round * 10)) + 'px';
        round++;
        if(round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log("left");
    },
    leaveCancelled() {
      console.log("not leaving");
    }
  },
  components: {
    successAlert: SuccessAlert,
    dangerAlert: DangerAlert
  }
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
