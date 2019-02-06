<template>
    <div class="col-xs-12 col-sm-6">
        <p>Server status: {{ serverInfo.status }} &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
          <span v-show="serverInfo.active">
          <button class="btn-reboot server-action" @click="reboot">{{ reboot_label }}</button>&nbsp;
          <button class="btn-terminate server-action" @click="terminate">{{ terminator }}</button>&nbsp;
          <button class="btn-keep server-action" v-show="confirm_remove">Keep as is</button>&nbsp;
          <button class="btn-archive server-action">{{ archivor }}</button>&nbsp;
          <button class="btn-archive-not server-action" v-show="confirm_archive">Keep as is</button>&nbsp;
        </span>
        </p>
    </div>

</template>

<script>
export default {
  props: {
    serverInfo: Object
  },
  data: function() {
    return {
      confirm_remove: false,
      confirm_archive: false,
      reboot_label: "Reload"
    }
  },
  methods: {
    reboot: function(e) {
      var self = this;
      self.reboot_label = "Rebooting...";
      setTimeout(function() {
        self.reboot_label = "Reload";
        this.$emit('rebooted', 1);
      }, 500);
    },
    terminator: function() {
      return (this.confirm_remove) ? "Confirm" : "Terminate";
    },
    terminate: function() {
      if(!this.confirm_remove) {
        this.confirm_remove = !this.confirm_remove;
      } else {
        this.$emit('term', serverInfo.id);
        this.confirm_remove = !this.confirm_remove;
      }
    },
    archivor: function() {
      return (this.confirm_remove) ? "Confirm" : "Archive";
    },
    terminate: function() {
      if(!this.confirm_archive) {
        this.confirm_archive = !this.confirm_archive;
      } else {
        this.$emit('arch', serverInfo.id);
        this.confirm_archive = !this.confirm_archive;
      }
    }
  }
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
