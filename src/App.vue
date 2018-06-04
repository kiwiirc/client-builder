<template>
  <div id="app">
    <vue-tabs class="tabs" v-model="tabName">
      <v-tab title="Startup Screen">
        <StartupScreen :localData="localData" v-on:setConfig="setConfig"></StartupScreen>
      </v-tab>

      <v-tab title="IRC Network">
        <NetworkSettings :localData="localData" v-on:setConfig="setConfig"></NetworkSettings>
      </v-tab>

      <v-tab title="Messages">
        <MessageView :localData="localData" v-on:setConfig="setConfig"></MessageView>
      </v-tab>

      <v-tab title="Theme">
        <Theme :localData="localData" v-on:setConfig="setConfig"></Theme>
      </v-tab>

      <v-tab title="Plugins">
        <Plugins :localData="localData" v-on:setConfig="setConfig"></Plugins>
      </v-tab>

      <v-tab title="Save">
        <Save :localData="localData"></Save>
      </v-tab>
    </vue-tabs>
    <div class="preview" :class="{hidden: tabName === 'Save'}">
        <iframe id="previewFrame"></iframe>
    </div>
  </div>
</template>

<script>
import Api from '@/libs/Api'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Vue from 'vue'
import Theme from './components/Theme.vue'
import NetworkSettings from './components/NetworkSettings.vue'
import StartupScreen from './components/StartupScreen.vue'
import MessageView from './components/MessageView.vue'
import Plugins from './components/Plugins.vue'
import Save from './components/Save.vue'
Vue.use(VueTabs)

window.currentConfig = {
  'windowTitle': 'Kiwi IRC - The web IRC client',
  'startupScreen': 'welcome',
  'kiwiServer': 'https://localdev.clients.kiwiirc.com/webirc/kiwiirc/',
  'restricted': true,
  'theme': 'Default',
  'messageLayout': 'compact',
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
    'encoding': 'utf8',
    'directPath': '',
    'gecos': '',
    'state_key': false
  },
  'buffers': {
    'show_emoticons': true,
    'extraFormatting': false,
    'privateMessages': true,
    'showJoinsParts': true
  },
  'embedly': {
    'key': ''
  },
  'plugins': [
  ],
  'warnOnExit': false
}

var data = new Vue({
  data: function () {
    return {
      config: window.currentConfig,
      HTML: '',
      iframe: '',
      iframeSnippet: '',
      networkType: 'default'
    }
  }
})

export default {
  name: 'App',
  components: {
    Theme,
    NetworkSettings,
    StartupScreen,
    MessageView,
    Plugins,
    Save
  },
  data: function () {
    return {
      localData: data,
      kiwiInstanceURL: window.kiwiuser.kiwi_instance,
      changeThrottleTimer: 0,
      tabName: ''
    }
  },
  methods: {
    setConfig: function () {
      let d = new Date()
      setTimeout(this.doConfig, Math.max(0, this.changeThrottleTimer - d.getTime()))
    },
    createSnippets (id) {
      this.localData.iframeSnippet = `<iframe src="${this.kiwiInstanceURL}?settings=${id}" style="width:100%;height:100vh;border:0;display:block"></iframe>`
      this.localData.HTML = `<!DOCTYPE html><html><head><style>body{margin:0}</style></head><body>${this.localData.iframeSnippet}</body></html>`
    },
    doConfig: async function () {
      let url = '/clientconfig'
      let config = JSON.parse(JSON.stringify(window.currentConfig))
      config.warnOnExit = true
      let data = { settings: JSON.stringify(config) }
      let res = await Api.instance().call(url).post(data).json()
      this.settingsID = res.settings_id
      this.localData.iframe = document.getElementById('previewFrame')
      if (this.localData.iframe) {
        let d = new Date()
        this.changeThrottleTimer = d.getTime() + 2000
        this.localData.iframe.src = `${this.kiwiInstanceURL}?settings=${this.settingsID}`
        this.createSnippets(this.settingsID)
      }
    }
  },
  mounted: function () {
    this.doConfig()
  },
  watch: {
    settingsID (val) {
      this.createSnippets(val)
    }
  }
}

</script>

<style scoped>
.hidden{
  display:none;
}
>>> .nav-tabs .tab:last-child{
    margin-left: 2em;
}
</style>
