<template>
  <div id="inputContainer">
    <select v-model="selected" @change="update">
      <option value = "WelcomeScreen">Welcome Screen</option>
      <option value = "CustomServer">Custom Server</option>
      <option value = "ZNC">ZNC</option>
    </select><br>
    <div v-if="selected == 'WelcomeScreen'">
      <div v-for="field in WSfields" :key="field">
        <div class="label">{{field.name}}</div>
        <input :type="field.type" v-model="field.value" @change="update" @keyup="update">
        <br>
      </div>
    </div>
    <div v-else-if="selected == 'CustomServer'">
      <div v-for="field in CSfields" :key="field">
        <div class="label">{{field.name}}</div>
        <input :type="field.type" v-model="field.value" @change="update" @keyup="update">
        <br>
      </div>
    </div>
    <div v-else-if="selected == 'ZNC'">
      <div v-for="field in ZNCfields" :key="field">
        <div class="label">{{field.name}}</div>
        <input :type="field.type" v-model="field.value" @change="update" @keyup="update">
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartupScreen',
  data: () => {
    return {
      selected: 'WelcomeScreen',
      WSfields: [
        {type: 'text', name: 'greetingText', value: 'Welcome to KiwiIRC!'},
        {type: 'text', name: 'buttonText', value: 'Connect'},
        {type: 'text', name: 'infoContent', value: 'Have a nice day!'},
        {type: 'checkbox', name: 'showChannel', value: true},
        {type: 'checkbox', name: 'showNick', value: true},
        {type: 'checkbox', name: 'showPassword', value: false},
        {type: 'checkbox', name: 'autoConnect', value: false},
        {type: 'checkbox', name: 'recaptcha', value: false},
        {type: 'checkbox', name: 'restricted', value: true},
        {type: 'text', name: 'server', value: 'irc.freenode.net'},
        {type: 'text', name: 'port', value: '6667'},
        {type: 'checkbox', name: 'tls', value: false},
        {type: 'text', name: 'encoding', value: ''},
        {type: 'checkbox', name: 'direct', value: false},
        {type: 'text', name: 'direct_path', value: ''},
        {type: 'text', name: 'gecos', value: ''},
        {type: 'text', name: 'nick', value: 'kiwi-n?'},
        {type: 'password', name: 'password', value: ''},
        {type: 'text', name: 'channel', value: '#kiwiirc-default'}
      ],
      CSfields: [
        {type: 'text', name: 'server', value: 'irc.freenode.net'},
        {type: 'text', name: 'port', value: '6667'},
        {type: 'checkbox', name: 'tls', value: false},
        {type: 'text', name: 'encoding', value: ''},
        {type: 'checkbox', name: 'direct', value: false},
        {type: 'text', name: 'direct_path', value: ''},
        {type: 'text', name: 'gecos', value: ''},
        {type: 'text', name: 'nick', value: 'kiwi-n?'},
        {type: 'password', name: 'password', value: ''},
        {type: 'text', name: 'channel', value: '#kiwiirc-default'},
        {type: 'text', name: 'greetingText', value: ''},
        {type: 'text', name: 'buttonText', value: 'Connect'}
      ],
      ZNCfields: [
        {type: 'text', name: 'username', value: ''},
        {type: 'password', name: 'password', value: ''},
        {type: 'text', name: 'network', value: ''},
        {type: 'checkbox', name: 'showNetwork', value: ''},
        {type: 'checkbox', name: 'showUser', value: ''},
        {type: 'checkbox', name: 'showPass', value: ''},
        {type: 'checkbox', name: 'autoConnect', value: ''},
        {type: 'text', name: 'server', value: ''},
        {type: 'text', name: 'port', value: ''},
        {type: 'checkbox', name: 'tls', value: ''},
        {type: 'text', name: 'greetingText', value: ''},
        {type: 'text', name: 'buttonText', value: 'Connect'},
        {type: 'text', name: 'infoContent', value: ''}
      ]
    }
  },
  methods: {
    update: function (e) {
      let WSout = {}
      let CSout = {}
      let ZNCout = {}
      let field = {}
      for (let i = 0; i < this.WSfields.length; ++i) {
        field = this.WSfields[i]
        WSout[field.name] = field.value
      }
      for (let i = 0; i < this.CSfields.length; ++i) {
        field = this.CSfields[i]
        CSout[field.name] = field.value
      }
      for (let i = 0; i < this.ZNCfields.length; ++i) {
        field = this.ZNCfields[i]
        ZNCout[field.name] = field.value
      }
      let out = {}
      let startupScreen = ''
      switch (this.selected) {
        case 'WelcomeScreen': out = WSout; startupScreen = 'welcome'; break
        case 'CustomServer': out = CSout; startupScreen = 'customServer'; break
        case 'ZNC': out = ZNCout; startupScreen = 'znc'; break
      }
      this.$emit('update', { source: 'StartupScreen', data: out, startupScreen })
    }
  },
  mounted: function () {
    this.update()
  }
}
</script>

<style scoped>
select{
  position:relative;
  font-size:1.25em;
  text-align: center;
  margin-left:auto;
  margin-right:auto;
}
#inputContainer{
  margin:10px;
  line-height:2.5em;
}
.label{
  width:110px;
  text-align:right;
  display: inline-block;
}
</style>
