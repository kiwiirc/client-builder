<template>
  <div id="app">
    <div id="header">Kiwi Client Builder Tool</div>
    <vue-tabs class="tabs">
      <v-tab title="Startup Screen">
        <StartupScreen v-on:update="receiveOptions"></StartupScreen>
      </v-tab>

      <v-tab title="Message View">
        <MessageView></MessageView>
      </v-tab>

      <v-tab title="Theme">
        <Theme></Theme>
      </v-tab>
    </vue-tabs>
    <div class="preview">
      output: {{ output.data }}
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
      json: [],
      output: { data: 1 }
    }
  },
  methods: {
    receiveOptions: function (val) {
      Vue.set(this.output, 'data', val)
      console.log(val)
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
  font-size:2.5em;
  color: #ffc;
  background: #113;
  color: #fff;
}
.tabs{
  float:left;
  width: calc(33.33% - 20px);
  text-align:left;
  margin:10px;
}
.preview{
  width:66.66%;
  float:right;
}
</style>
