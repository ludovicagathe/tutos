import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './private/firestoreauth'
import crypto from 'crypto'

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inspections: [],
    localStorageTest: (localStorage) ? true : false,
    deviceID: "",
    localStorageCapacity: 0,
    localStorageUsed: 0,
    lastSaved: "",
    lastSynced: "",
    lastConnected: getLocalISODate(),
    cloudConnection: false,
    RMCount: 0,
    RMData: [],
    localities: [],
    enforcement: [{
        id: 1,
        name: "Mr O. Sewtohul",
        function: "Ag. DEE"
      },
      {
        id: 2,
        name: "Mr K. Ramkurrun",
        function: "E/SE EE"
      },
      {
        id: 3,
        name: "Ms N. Safee",
        function: "E/SE EE"
      },
      {
        id: 4,
        name: "Engineer 4",
        function: "E/SE EE"
      },
      {
        id: 5,
        name: "Mr K. Sooruth",
        function: "Ag. E/SE EE"
      },
      {
        id: 6,
        name: "Mr J.V.L. Agathe",
        function: "TO EE"
      },
      {
        id: 7,
        name: "Mr H. Gunness",
        function: "TO EE"
      },
      {
        id: 8,
        name: "Mr D. Mahadawoo",
        function: "TO EE"
      },
    ]
  },
  mutations: {
    pushInspection(state, inspection) {
      state.inspections.push(inspection);
      let sentObj = JSON.stringify(inspection);
      let savedObj = JSON.stringify(state.inspections[state.inspections.length - 1]);
      state.lastSaved = getLocalISODate();
      // eslint-disable-next-line
      localStorage.setItem('saveLocal', JSON.stringify(state));
      if (sentObj == savedObj) {
        return true;
      } else {
        return false;
      }
    },
    setLocalStorageInfo(state, localData) {
      state.localStorageUsed = localData.used;
      state.localStorageCapacity = localData.total;
    },
    retrieveLocalStorage(state) {
      let retVal = false;
      if (localStorage && localStorage.saveLocal) {
        let retrieved = JSON.parse(localStorage.getItem('saveLocal'));

        state.inspections = retrieved.inspections || [];
        state.deviceID = retrieved.deviceID || "";
        state.localStorageTest = retrieved.localStorageTest || true;
        state.localStorageCapacity = retrieved.localStorageCapacity || 0;
        state.localStorageUsed = retrieved.localStorageUsed || 0;
        state.lastSaved = retrieved.lastSaved || "";
        state.lastSynced = retrieved.lastSynced || "";
        state.RMCount = retrieved.RMCount || 0;
        state.RMData = retrieved.RMData || [];
        state.localities = retrieved.localities || [];

        retVal = true;
      }
      return retVal;
    },
    checkConnection(state) {
      state.cloudConnection = false;
      let fire = db.collection('devices');
      let fetched = fire.where('assigned', '==', false).get().then((res) => {
        if(res.empty) {
          console.log("No devices left")
        } else {
          res.forEach((doc)  => {
            if(!state.deviceID) {
              state.deviceID = doc.id;
              if(state.localStorageTest) {
                localStorage.setItem('deviceID', doc.id);
              }
              fire.doc(doc.id).set({
                assigned: true
              })
            }
          });
        }
        state.cloudConnection = true;
      });
    },
    sendToCloud(state, str) {
      // test
    }
  },
  actions: {
  },
  getters: {
    getInspections(state) {
      return state.inspections.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    },
    getRMCount(state) {
      return state.RMCount;
    },
    getEnforcement(state) {
      return state.enforcement;
    },
    getLastSaved(state) {
      return state.lastSaved;
    },
    getCloudConnection(state) {
      return state.cloudConnection;
    }
  }
})

function getLocalISODate() {
  let actual = new Date();
  let tzo = -actual.getTimezoneOffset();
  let dif = tzo >= 0 ? '+' : '-';
  let pad = function(num) {
    let norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return actual.getFullYear() +
    '-' + pad(actual.getMonth() + 1) +
    '-' + pad(actual.getDate()) +
    'T' + pad(actual.getHours()) +
    ':' + pad(actual.getMinutes()) +
    ':' + pad(actual.getSeconds()) +
    dif + pad(tzo / 60) +
    ':' + pad(tzo % 60);
}

function sealMessage(str, key) {
  return crypto.createHmac('sha256', key).update(str).digest('hex');
}
