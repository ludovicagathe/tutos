<template>
  <div v-show="serverInfo.active">Server status: {{ serverInfo.status }} &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
      <div v-show="serverInfo.isOpen">
      <button class="btn-reboot server-action" @click="reboot" v-show="serverInfo.status == 'normal' || serverInfo.status == 'critical'">{{ reboot_label }}</button>&nbsp;
      <button class="btn-terminate server-action" @click="terminate" v-show="serverInfo.status == 'normal' || serverInfo.status == 'critical'">{{ terminator() }}</button>&nbsp;
      <button class="btn-keep server-action" v-show="confirm_remove" @click="confirm_remove = false">Keep as is</button>&nbsp;
      <button class="btn-archive server-action" @click="archive" v-show="serverInfo.status == 'terminated' || serverInfo.status == 'unknown'">{{ archivor() }}</button>&nbsp;
      <button class="btn-archive-not server-action" v-show="confirm_archive" @click="confirm_archive = false">Keep as is</button>&nbsp;
      </div>
  </div>
</template>

<script>
export default {
  props: {
    'serverInfo': [Object]
  },
  data: function() {
    return {
      confirm_remove: false,
      confirm_archive: false,
      reboot_label: "Reload",
      received: {
        status: "default",
        id: 99999
      }
    }
  },
  methods: {
    reboot: function(e) {
      var self = this;
      self.reboot_label = "Rebooting...";
      setTimeout(function() {
        self.reboot_label = "Reload";
        self.$emit('rebooted', self.serverInfo.id);
      }, 1000);
    },
    terminator: function() {
      return (this.confirm_remove) ? "Confirm" : "Terminate";
    },
    terminate: function() {
      if(!this.confirm_remove) {
        this.confirm_remove = !this.confirm_remove;
      } else {
        this.$emit('term', this.serverInfo.id);
        this.confirm_remove = !this.confirm_remove;
      }
    },
    archivor: function() {
      return (this.confirm_remove) ? "Confirm" : "Archive";
    },
    archive: function() {
      if(!this.confirm_archive) {
        this.confirm_archive = !this.confirm_archive;
      } else {
        this.$emit('arch', this.serverInfo.id);
        this.confirm_archive = !this.confirm_archive;
      }
    }
  },
}
</script>

<style>
.server-action {
  color: white;
  text-shadow: 2px 2px #AAAAAA;
  font-weight: bold;
}
.btn-reboot {
  background-color: orange;
}
.btn-terminate {
  background-color: red;
}
.btn-reboot {
  background-color: green;
}
</style>
