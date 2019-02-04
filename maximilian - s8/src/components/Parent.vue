<template>
  <div class="parent">
    <h2>{{ msg }}</h2>
    <div>
      <span>Parent to child</span>&nbsp;&nbsp;&nbsp;&nbsp; <button @click="mutate_child('child1')">Random Num in C1</button>&nbsp;&nbsp;&nbsp;&nbsp; <button @click="mutate_child('child2')">Random Num in C2</button>
    </div>
    <Child msg="Child" ref-id="child1" @childPing="log_event" v-declare="'child1'" />
    <Child msg="Child" ref-id="child2" @childPing="log_event" v-declare="'child2'" />
    <div class="ping-log">
      <h4>Ping Log (Events)</h4>
      <div class="log">
        <ul>
          <li v-for="entry in ev_log">{{ entry }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Parent',
  props: {
    msg: String
  },
  components: {
    Child
  },
  data: function() {
    return {
      ev_log: []
    }
  },
  methods: {
    randomGen: function() {
      return Math.floor(Math.random() * 10);
    },
    mutate_child: function(ref) {
      console.log(this);
      this.$refs[ref].randomNum = this.randomGen();
    },
    log_event: function(e) {
      this.ev_log.push(e + " pinged at " + Date.now());
    }
  },
  created: function() {
    //console.log(this);
  }
}
</script>

<style scoped>
.parent {
  position: relative;
  background-color: #11ACED;
  width: 80%;
  padding: 60px;
  margin: 10px auto;
  border: solid 1px #333333;
  border-radius: 8px;
}

/deep/ .child {
  position: relative;
  display: inline-block;
  background-color: #FDACAC;
  width: 20%;
  padding: 20px;
  margin: 10px auto;
  border: solid 2px #AAAAAA;
  border-radius: 8px;
  margin-right: 20px;
}
</style>
