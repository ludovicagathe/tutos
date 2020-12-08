import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
    counterToString(state) {
      return state.counter + " clicks";
    }
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    decrement({ commit }) {
      commit('decrement');
    },
    asyncIncrement({ commit }) {
      setTimeout(function() {
        commit('increment');
      }, 2000);
    },
    asyncDecrement({ commit }) {
      setTimeout(function() {
        commit('decrement');
      }, 2000);
    }
  }
})
