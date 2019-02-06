<template>
    <div class="col-xs-12 col-sm-6">
        <ul class="list-group">
            <li
                    class="list-group-item" :class="state_class(server.status)"
                    v-for="server in servers.filter(function(server) { return server.active })">
                Server id : {{ server.id }} &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;{{ server.type }}
                <ServerDetails :server-details="server" @term="terminate"></ServerDetails>
            </li>
        </ul>
    </div>
</template>

<script>
import ServerDetails from './ServerDetails.vue'
export default {
  data: function() {
    return {
      servers: [
        { id: 1, type: 'ecxs', status: 'normal', isOpen: false, active: true },
        { id: 2, type: 'dbmd', status: 'critical', isOpen: false, active: true },
        { id: 3, type: 'eclg', status: 'unknown', isOpen: false, active: true },
        { id: 4, type: 'dksm', status: 'normal', isOpen: false, active: true }
      ]
    };
  },
  methods: {
    state_class: function(status) {
      var st = {"background-color": "", "color": ""};
      switch(status) {
        case 'normal':
          st = {"background-color": "rgba(160,240,160,0.5)", "color": "#2b9d4e"};
          break;
        case 'critical':
          st = {"background-color": "rgba(240,160,160,0.5)", "color": "#ed4646"};
          break;
        case 'unknown':
          st = {"background-color": "rgba(206,159,72,0.5)", "color": "#934b00"};
          break;
        case 'terminated':
          st = {"background-color": "rgba(192,192,192,0.5)", "color": "#9b9b9b"};
          break;
      }
    },
    terminate: function(e) {
      servers[servers.findIndex(function(server) { return server.id == e })].status = "terminated";
    }
  }
}
</script>

<style>

</style>
