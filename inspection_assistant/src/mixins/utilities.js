export default {
  methods: {
    checkLocalStorage() {
      let existingLocalStorage = (JSON.stringify(localStorage).length / (1024 * 1024)).toFixed(2);
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
  }
}
