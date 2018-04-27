<template>
  <div id="app">
    <div id="header">
      <button class="FinishButton" @click="download">Export HTML</button>
      <span class="headerText">Kiwi Client Builder Tool</span>
    </div>
    <vue-tabs class="tabs">
      <v-tab title="Startup Screen">
        <StartupScreen :localData="localData" v-on:setConfig="setConfig"></StartupScreen>
      </v-tab>

      <v-tab title="Message View">
        <MessageView :localData="localData" v-on:setConfig="setConfig"></MessageView>
      </v-tab>

      <v-tab title="Theme">
        <Theme :localData="localData" v-on:setConfig="setConfig"></Theme>
      </v-tab>

      <v-tab title="Plugins">
        <Plugins :localData="localData" v-on:setConfig="setConfig"></Plugins>
      </v-tab>
    </vue-tabs>
    <div class="preview">
      <iframe src='../../kiwiirc/dist' id="previewFrame"></iframe>
    </div>
  </div>
</template>

<script>
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Vue from 'vue'
import Theme from './components/Theme.vue'
import StartupScreen from './components/StartupScreen.vue'
import MessageView from './components/MessageView.vue'
import Plugins from './components/Plugins.vue'
Vue.use(VueTabs)

window.currentConfig = {
  'windowTitle': 'Kiwi IRC - The web IRC client',
  'startupScreen': 'welcome',
  'kiwiServer': 'https://localdev.clients.kiwiirc.com/webirc/kiwiirc/',
  'restricted': true,
  'theme': 'Dark',
  'themes': [
    { 'name': 'Default', 'url': './static/themes/default' },
    { 'name': 'Dark', 'url': './static/themes/dark' }
  ],
  'startupOptions': {
    'server': 'irc.freenode.net',
    'port': 6667,
    'tls': false,
    'direct': false,
    'channel': '#kiwiirc-default',
    'nick': 'kiwi-n?',
    'password': '',
    'greetingText': 'Welcome to KiwiIRC!',
    'infoContent': 'Have a nice day!',
    'buttonText': 'Connect...',
    'showChannel': true,
    'showNick': true,
    'showUser': true,
    'showPassword': true,
    'autoConnect': false,
    'recaptcha': false,
    'encoding': '',
    'directPath': '',
    'gecos': '',
    'state_key': false
  },
  'embedly': {
    'key': ''
  },
  'plugins': [
  ],
  'compactView': false,
  'emojis': true,
  'extraFormatting': false,
  'privateMessages': true,
  'showJoinsParts': true,
  'warnOnExit': false
}

var data = new Vue({
  data: function () {
    return {
      config: window.currentConfig,
      baseURL: 'https://cantelope.ml'
    }
  }
})

export default {
  name: 'App',
  components: {
    Theme,
    StartupScreen,
    MessageView,
    Plugins
  },
  data: function () {
    return {
      localData: data,
      kiwiInstanceURL: data.baseURL + '/Darren/kiwiirc/dist', // must be absolute
      changeThrottleTimer: 0
    }
  },
  methods: {
    setConfig: function () {
      let d = new Date()
      setTimeout(this.doConfig, Math.max(this.changeThrottleTimer - d.getTime(), 0))
    },
    doConfig: function () {
      let el = document.getElementById('previewFrame')
      if (el) {
        let d = new Date()
        this.changeThrottleTimer = d.getTime() + 2000
        el.src = this.kiwiInstanceURL + '?externalConfig=1'
      }
    },
    download: function () {
      let HTML = '<!DOCTYPE html><html><head><style>body{margin:0}iframe{width:100%;height:100vh;border:0;display:block}</style></head>'
      this.localData.config.warnOnExit = true
      this.localData.config.startupOptions.state_key = true
      let conf = encodeURIComponent(JSON.stringify(this.localData.config))
      HTML += '<body><iframe src="' + this.kiwiInstanceURL + '?tokenizedConfig=' + conf + '"></iframe></body></html>'
      let el = document.createElement('a')
      el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HTML))
      el.setAttribute('download', 'KiwiClient.html')
      el.style.display = 'none'
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
      this.localData.config.warnOnExit = false
      this.localData.config.startupOptions.state_key = false
    }
  },
  mounted: function () {
    this.setConfig()
  }
}

</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#header{
  text-align:left;
  color: #ffc;
  background: #113;
  color: #fff;
  height:65px;
}
.headerText{
  font-size:30px;
  margin-left:30px;
}
.tabs{
  float:left;
  width: 480px;
  text-align:left;
  margin:10px;
}
.preview{
  width: calc(100% - 520px);
  padding: 10px;
  height: 100%;
  float:left;
  text-align:justify;
  background:#edc;
  min-width:500px;
}
.FinishButton{
  margin:10px;
  width:220px;
  background:#6e8;
  border-radius:5px;
  font-size:30px;
  top: 0;
}
#previewFrame{
  width:100%;
  height: calc(100vh - 90px);
  display:block;
}
</style>
