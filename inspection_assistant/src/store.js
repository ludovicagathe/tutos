import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inspections: [
      {
        date: "2020-02-01",
        locality: "Port Louis",
        enforcement1_id: 1,
        enforcement2_id: 2,
        dealers: [
          {
            name: "Discount Kings Ltd",
            pos: "Cash and Pack, 48, Somewhere St., Port Louis",
            brn: "C01029785"
          },
          {
            name: "Money Saver Plus Ltd",
            pos: "Elephanto, 58, Somewhere Else St., Port Louis",
            brn: "C01021234"
          },
        ]
      },
      {
        date: "2020-02-02",
        locality: "Curepipe",
        enforcement1_id: 1,
        enforcement2_id: 2,
        dealers: [

        ]
      }
    ],
    localStorageTest: (localStorage) ? true : false,
    localStorageCapacity: 0,
    localStorageUsed: 0,
    lastSaved: "2020-02-01T23:59:00+04:00",
    lastSynced: "2020-02-01T23:50:00+04:00",
    RMCount: 0,
    localities: [
      "Port Louis",
      "Curepipe",
      "Rose Hill"
    ],
    enforcement: [
      {id: 1, name: "Mr O. Sewtohul", function: "Ag. DEE"},
      {id: 2, name: "Mr K. Ramkurrun", function: "E/SE EE"},
      {id: 3, name: "Ms N. Safee", function: "E/SE EE"},
      {id: 4, name: "Engineer 4", function: "E/SE EE"},
      {id: 5, name: "Mr K. Sooruth", function: "Ag. E/SE EE"},
      {id: 6, name: "Mr J.V.L. Agathe", function: "TO EE"},
      {id: 7, name: "Mr H. Gunness", function: "TO EE"},
      {id: 8, name: "Mr D. Mahadawoo", function: "TO EE"},
    ]
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getInspections: (state) => {
      return state.inspections;
    },
    getRMCount: (state) => {
      return state.RMCount;
    },
    getEnforcement: (state) => {
      return state.enforcement;
    }
  }
})
