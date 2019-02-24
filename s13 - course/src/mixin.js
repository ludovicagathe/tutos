export const mymixin = {
  data() {
    return {
      fruits: ['Apple', 'Mango', 'Litchi', 'Melon', 'Jamalac'],
      query: ''
    }
  },
  computed: {
    filt() {
      let q = new RegExp(this.query, 'ig')
      return this.fruits.filter((fruit) => {
        return fruit.match(q);
      });
    }
  }
}
