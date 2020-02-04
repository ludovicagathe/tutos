export default {
  methods: {
    checkLocalStorage() {
      let existingLocalStorage = (localStorage) ?  (JSON.stringify(localStorage).length / (1024 * 1024)).toFixed(2) : 0;
      let totalLocalStorage = 0;
      let lowStorage = false;
      let recalculate = false;
      let usageDisplay = "N/A";

      if (localStorage && localStorage.storageSize) {
        let splitStr = localStorage.storageSize.split(" ");
        if (splitStr.length != 2) {
          recalculate = true;
        } else if (splitStr[1].trim() != "MB") {
          recalculate = true;
        } else {
          if(typeof parseFloat(splitStr[0]) != 'number' || parseFloat(splitStr[0]) < 0.9 || parseFloat(splitStr[0]) > 100) {
            recalculate = true;
          } else {
            totalLocalStorage = parseFloat(splitStr[0]).toFixed(2);
            usageDisplay = existingLocalStorage + " MB / " + totalLocalStorage + " " + splitStr[1];
            if(totalLocalStorage - existingLocalStorage < totalLocalStorage / 10) {
              lowStorage = true;
            }
            return {
              used: existingLocalStorage,
              total: totalLocalStorage,
              display: usageDisplay,
              low: lowStorage
            };
          }
        }
      }

      if (localStorage && (!localStorage.storageSize || recalculate)) {
        var i = 0;
        try {
          // Test up to 10 MB
          for (i = 0; i < 10000; i += 250) {
              localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
          }
        } catch (e) {
          localStorage.removeItem('test');
          totalLocalStorage = parseFloat((i / 1024) + existingLocalStorage).toFixed(2);
          localStorage.setItem('storageSize', totalLocalStorage + " MB");
          if(totalLocalStorage - existingLocalStorage < totalLocalStorage / 10) {
            lowStorage = true;
          }
          usageDisplay = existingLocalStorage + " MB / " + totalLocalStorage + " MB";
        }
      } else {
        return {
          used: 0,
          total: 0,
          display: usageDisplay,
          low: true
        }
      }
      return {
        used: existingLocalStorage,
        total: totalLocalStorage,
        display: usageDisplay,
        low: false
      }
    },
    saveToStore(submittedObject, storeTarget) {
      let retVal = {
        errorDescription: "",
        error: false
      }

      if(typeof storeTarget != 'string') {
        retVal.error = true;
        retVal.errorDescription = "Target argument should be of type 'String'";
      }

      if(storeTarget != "inspections" || storeTarget != "dealers") {
        retVal.error = true;
        retVal.errorDescription = "Target not found";
      }

      if(storeTarget == "inspections") {
        if(!submittedObject || submittedObject.locality == "" || submittedObject.date == "" || submittedObject.officer1 == "" || submittedObject.officer2 == "") {
          retVal.error = true;
          retVal.errorDescription = "Inspection details missing. Saving failed";
        } else {
          if(!submittedObject.dealers) {
            submittedObject.dealers = [];
          }
          if(!this.$store.commit('pushInspection', submittedObject)) {
            retVal.errorDescription = "Saving might not have been successful. Verify data integrity"
          }
        }
      }

      return retVal;
    },
    getLocalDate() {
      let today = new Date();
      return today.getFullYear() + '-' + (today.getMonth() > 10 ? today.getMonth() : '0' + today.getMonth()) + '-' + (today.getDate() > 10 ? today.getDate() : '0' + today.getDate());
    },
    getLocalISODate() {
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
  }
}
