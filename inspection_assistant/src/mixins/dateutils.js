export default {
  methods: {
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
    },
    validateDate(dateStr) {
      let dateValid = false;
      let inputDate = new Date(dateStr);

      if (!isNaN(inputDate) && inputDate.getTime() < Date.now()) {
        dateValid = true;
      }

      return dateValid;
    }
  }
}
