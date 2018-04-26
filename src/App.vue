<template>
  <div id="app">
    <div id="header">
      <button class="FinishButton" @click="download">Export HTML</button>
      <span class="headerText">Kiwi Client Builder Tool</span>
    </div>
    <vue-tabs class="tabs">
      <v-tab title="Startup Screen">
        <StartupScreen v-on:update="receive"></StartupScreen>
      </v-tab>

      <v-tab title="Message View">
        <MessageView v-on:update="receive"></MessageView>
      </v-tab>

      <v-tab title="Theme">
        <Theme v-on:update="receive"></Theme>
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
Vue.use(VueTabs)

window.currentConfig = {
  'windowTitle': 'Kiwi IRC - The web IRC client',
  'startupScreen': 'welcome',
  'kiwiServer': 'https://localdev.clients.kiwiirc.com/webirc/kiwiirc/',
  'restricted': true,
  'theme': 'Dark',
  'themes': [
    { 'name': 'Default', 'url': 'static/themes/default' },
    { 'name': 'Dark', 'url': 'static/themes/dark' }
  ],
  'startupOptions': {
    'server': 'irc.freenode.net',
    'port': 6667,
    'tls': false,
    'direct': false,
    'channel': '#kiwiirc-default',
    'nick': 'kiwi-n?'
  },
  'embedly': {
    'key': ''
  },
  'plugins': [
  ],
  warnOnExit: false
}

export default {
  name: 'App',
  components: {
    Theme,
    StartupScreen,
    MessageView
  },
  data: () => {
    return {
      configOptions: { StartupScreen: [], MessageView: [], Theme: [] },
      kiwiInstanceURL: 'https://cantelope.ml/Darren/kiwiirc/dist' // must be absolute
    }
  },
  methods: {
    receive: function (val) {
      this.configOptions[val.source] = val.data
      if (typeof val.startupScreen !== 'undefined') {
        window.currentConfig.startupScreen = val.startupScreen
      }
      if (typeof val.data.theme !== 'undefined') {
        window.currentConfig.theme = val.data.theme
      } else {
        for (let key in val.data) {
          if (key === 'restricted') {
            window.currentConfig.restricted = val.data[key]
          } else if (val.data.hasOwnProperty(key)) {
            window.currentConfig.startupOptions[key] = val.data[key]
          }
        }
      }
      this.setConfig()
    },
    setConfig: function () {
      let el = document.getElementById('previewFrame')
      if (el) {
        el.src = this.kiwiInstanceURL + '?externalConfig=1'
      }
    },
    download: function () {
      let HTML = '<!DOCTYPE html><html><head><style>body{margin:0}iframe{width:100%;height:100vh;border:0;display:block}</style></head>'
      window.currentConfig.warnOnExit = true
      let conf = encodeURIComponent(JSON.stringify(window.currentConfig))
      HTML += '<body><iframe src="' + this.kiwiInstanceURL + '?tokenizedConfig=' + conf + '"></iframe></body></html>'
      let el = document.createElement('a')
      el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HTML))
      el.setAttribute('download', 'KiwiClient.html')
      el.style.display = 'none'
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
    }
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
  width: 380px;
  text-align:left;
  margin:10px;
}
.preview{
  width: calc(100% - 420px);
  padding: 10px;
  height: 100%;
  float:left;
  text-align:justify;
  background:#edc;
  min-width:400px;
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
