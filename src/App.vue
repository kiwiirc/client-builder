<template>
  <div id="app">
    <div id="header">
      <button class="FinishButton">Export HTML</button>
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
      <pre>
        {{ JSON.stringify(configOptions, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script>
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Vue from 'vue'
import StartupScreen from './components/StartupScreen.vue'
import MessageView from './components/MessageView.vue'
import Theme from './components/Theme.vue'
Vue.use(VueTabs)

export default {
  name: 'App',
  components: {
    StartupScreen,
    MessageView,
    Theme
  },
  data: () => {
    return {
      configOptions: { StartupScreen: [], MessageView: [], Theme: [] }
    }
  },
  methods: {
    receive: function (val) {
      this.configOptions[val.source] = val.data
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
  float:right;
  text-align:justify;
  background:#edc;
}
.FinishButton{
  margin:10px;
  width:220px;
  background:#6e8;
  border-radius:5px;
  font-size:30px;
  top: 0;
}
</style>
