export default {
  methods: {
    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    localStorageAvailable() {
      if (localStorage) {
        localStorage.removeItem('sessionCapacity');
        var i = 0;
        try {
          for (i = 0; i < 500; i += 250) {
            localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            //localStorage.removeItem('test');
            localStorage.setItem('sessionCapacity', "1");
          }
        } catch (e) {
          //localStorage.removeItem('test');
          return false;
        }
      }
      return true;
    },
    saveToStore(submittedObject, storeTarget) {
      submittedObject.synced = false;
      let actualStore = [];

      if (typeof storeTarget != 'string') {
        return "Invalid target";
      } else if (storeTarget != "inspections" && storeTarget != "dealers" && storeTarget != "sheets") {
        return "Invalid data group"
      } else if (!this.localStorageAvailable()) {
        return "Not enough storage"
      }

      try {
        if (!localStorage[storeTarget]) {
          submittedObject.id = 1;
          actualStore.push(submittedObject);
          localStorage[storeTarget] = JSON.stringify(actualStore);
        } else if (this.isJsonString(localStorage[storeTarget])) {
          actualStore = JSON.parse(localStorage[storeTarget]);
          if (!Array.isArray(actualStore)) {
            return false;
          } else {
            if (actualStore[actualStore.length - 1].id && !isNaN(actualStore[actualStore.length - 1].id)) {
              submittedObject.id = actualStore[actualStore.length - 1].id + 1;
              actualStore.push(submittedObject);
              localStorage[storeTarget] = JSON.stringify(actualStore);
            } else {
              return "Entry id error"
            }
          }
        }
      } catch (e) {
        return "Saving failed";
      }

      return "ok";
    },
    TEST_fillLocalStorage(purge) {
      let i;
      try {
        localStorage.setItem('test', 'a');
        // Test up to 20 MB
        for (i = 0; i < 200; i++) {
          localStorage.setItem("test" + i, new Array(100 * 1024).join('a'));
        }
      } catch (e) {
        console.log("localStorage full");
        console.log(this.localStorageAvailable());
      }
      console.log((JSON.stringify(localStorage).length / 1024).toFixed(2) + " kB");
      console.log(this.localStorageAvailable());
      if (purge == true) {
        try {
          console.log("clearing localStorage");
          localStorage.removeItem('test');
          for (i = 0; i < 200; i++) {
            if (localStorage["test" + i]) {
              localStorage.removeItem("test" + i);
            }
          }
          console.log("localStorage test cleared");
          console.log(this.localStorageAvailable());
        } catch (e) {
          console.log("localStorage cleared");
          console.log(this.localStorageAvailable());
        }
      }
    }
  }
}
