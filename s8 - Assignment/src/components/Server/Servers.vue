<template>
    <div class="col-xs-12 col-sm-6">
        <ul class="list-group">
            <li class="list-group-item" v-for="server in servers">
                <div  @click="show_actions(server.id)">Server id : {{ server.id }} &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;{{ server.type }}</div>
                <app-server-details :server-info="server" @term="terminate" @rebooted="rebooted" @arch="archive"></app-server-details>
            </li>
        </ul>
    </div>
</template>

<script>
import ServerDetails from './ServerDetails.vue';

export default {
  components: {
      'app-server-details': ServerDetails
  },

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
    show_actions: function(e) {
      var index = this.servers.findIndex(function(server) { return server.id == e })
      this.servers[index].isOpen = !this.servers[index].isOpen;
    },
    rebooted: function(e) {
      var index = this.servers.findIndex(function(server) { return server.id == e })
      if(this.servers[index].status == 'critical'){
        this.servers[index].status = 'normal';
      }
    },
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
    active_servers: function() {
      return this.servers.filter(function(server) { return server.active });
    },
    terminate: function(e) {
      this.servers[this.servers.findIndex(function(server) { return server.id == e })].status = "terminated";
    },
    archive: function(e) {
      this.servers[this.servers.findIndex(function(server) { return server.id == e })].active = false;
    },
  },
}
</script>

<style>

</style>
