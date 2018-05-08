<template>
  <div id="app">
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
    </vue-tabs>
    <div class="preview">
      <iframe src='../../kiwiirc/dist' id="previewFrame"></iframe>
    </div>
	<div id="header">
	  <button class="FinishButton" @click="download">Export HTML</button>
	  <span class="headerText">Kiwi Client Builder Tool</span>
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
    'gecos': ''
  },
  'embedly': {
    'key': ''
  },
  'plugins': [
  ],
  'warnOnExit': false,
  'compactView': false,
  'emojis': true,
  'extraFormatting': false,
  'privateMessages': true,
  'showJoinsParts': true
}

var data = new Vue({
  data: function () {
    return {
      config: window.currentConfig
    }
  }
})

export default {
  name: 'App',
  components: {
    Theme,
    StartupScreen,
    MessageView
  },
  data: function () {
    return {
      localData: data,
      kiwiInstanceURL: 'https://cantelope.ml/Darren/kiwiirc/dist'
    }
  },
  methods: {
    setConfig: function () {
      let el = document.getElementById('previewFrame')
      if (el) {
        el.src = this.kiwiInstanceURL + '?externalConfig=1'
      }
    },
    download: function () {
      let HTML = '<!DOCTYPE html><html><head><style>body{margin:0}iframe{width:100%;height:100vh;border:0;display:block}</style></head>'
      this.localData.config.warnOnExit = true
      let conf = encodeURIComponent(JSON.stringify(this.localData.config))
      HTML += '<body><iframe src="' + this.kiwiInstanceURL + '?tokenizedConfig=' + conf + '"></iframe></body></html>'
      let el = document.createElement('a')
      el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HTML))
      el.setAttribute('download', 'KiwiClient.html')
      el.style.display = 'none'
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
    }
  },
  mounted: function () {
    this.setConfig()
  }
}

</script>
