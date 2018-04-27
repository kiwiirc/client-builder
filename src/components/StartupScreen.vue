<template>
  <div id="inputContainer">
    <select v-model="localData.config.startupScreen" @change="update">
      <option value = "welcome">Welcome Screen</option>
      <option value = "customServer">Custom Server</option>
      <option value = "znc">ZNC</option>
    </select><br>
    <div v-if="localData.config.startupScreen == 'welcome'">
      <label>
        <div class="label">Greeting Text</div>
        <input v-model="localData.config.startupOptions.greetingText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Button Text</div>
        <input v-model="localData.config.startupOptions.buttonText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Info Content</div>
        <input v-model="localData.config.startupOptions.infoContent"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Show Channel</div>
        <input v-model="localData.config.startupOptions.showChannel"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Show Nick</div>
        <input v-model="localData.config.startupOptions.showNick"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Show Password</div>
        <input v-model="localData.config.startupOptions.showPassword"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Auto-Connect</div>
        <input v-model="localData.config.startupOptions.autoConnect"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Recaptcha</div>
        <input v-model="localData.config.startupOptions.recaptcha"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">restricted</div>
        <input v-model="localData.config.restricted"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Server</div>
        <input v-model="localData.config.startupOptions.server"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Port</div>
        <input v-model="localData.config.startupOptions.port"
          @change="update" @keyup="update"
          type='text'
        />
      </label>
      <label>
        <div class="tlsLabel">TLS</div>
        <input v-model="localData.config.startupOptions.tls"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Encoding</div>
        <input v-model="localData.config.startupOptions.encoding"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Direct</div>
        <input v-model="localData.config.startupOptions.direct"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Direct Path</div>
        <input v-model="localData.config.startupOptions.direct_path"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">gecos</div>
        <input v-model="localData.config.startupOptions.gecos"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Nick</div>
        <input v-model="localData.config.startupOptions.nick"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Password</div>
        <input v-model="localData.config.startupOptions.password"
          @change="update" @keyup="update"
          type='password'
        />
      </label><br>
      <label>
        <div class="label">Channel</div>
        <input v-model="localData.config.startupOptions.channel"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
    </div>

    <div v-else-if="localData.config.startupScreen == 'customServer'">
      <label>
        <div class="label">Server</div>
        <input v-model="localData.config.startupOptions.server"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Port</div>
        <input v-model="localData.config.startupOptions.port"
          @change="update" @keyup="update"
          type='text'
        />
      </label>
      <label>
        <div class="tlsLabel">TLS</div>
        <input v-model="localData.config.startupOptions.tls"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Encoding</div>
        <input v-model="localData.config.startupOptions.encoding"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Direct</div>
        <input v-model="localData.config.startupOptions.direct"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Direct Path</div>
        <input v-model="localData.config.startupOptions.directPath"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">gecos</div>
        <input v-model="localData.config.startupOptions.gecos"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Nick</div>
        <input v-model="localData.config.startupOptions.nick"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Password</div>
        <input v-model="localData.config.startupOptions.password"
          @change="update" @keyup="update"
          type='password'
        />
      </label><br>
      <label>
        <div class="label">Channel</div>
        <input v-model="localData.config.startupOptions.channel"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Button Text</div>
        <input v-model="localData.config.startupOptions.buttonText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Greeting Text</div>
        <input v-model="localData.config.startupOptions.greetingText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
    </div>

    <div v-else-if="localData.config.startupScreen == 'znc'">
      <label>
        <div class="label">User Name</div>
        <input v-model="localData.config.startupOptions.userName"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Password</div>
        <input v-model="localData.config.startupOptions.password"
          @change="update" @keyup="update"
          type='password'
        />
      </label><br>
      <label>
        <div class="label">Network</div>
        <input v-model="localData.config.startupOptions.network"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Show Network</div>
        <input v-model="localData.config.startupOptions.showNetwork"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Show User</div>
        <input v-model="localData.config.startupOptions.showUser"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Show Pass</div>
        <input v-model="localData.config.startupOptions.showPass"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Auto-Connect</div>
        <input v-model="localData.config.startupOptions.autoConnect"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Server</div>
        <input v-model="localData.config.startupOptions.server"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Port</div>
        <input v-model="localData.config.startupOptions.port"
          @change="update" @keyup="update"
          type='text'
        />
      </label>
      <label>
        <div class="tlsLabel">TLS</div>
        <input v-model="localData.config.startupOptions.tls"
          @change="update" @keyup="update"
          type='checkbox'
        />
      </label><br>
      <label>
        <div class="label">Greeting Text</div>
        <input v-model="localData.config.startupOptions.greetingText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Button Text</div>
        <input v-model="localData.config.startupOptions.buttonText"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
      <label>
        <div class="label">Info Content</div>
        <input v-model="localData.config.startupOptions.infoContent"
          @change="update" @keyup="update"
          type='text'
        />
      </label><br>
    </div>
    <!--
      <div v-for="field in ZNCfields" :key="field">
        <label><div class="label">{{field.name}}</div>
        <input :type="field.type" @change="update" @keyup="update">
        </label><br>
      </div>
    -->
  </div>
</template>

<script>
export default {
  name: 'StartupScreen',
  props: ['localData'],
  methods: {
    update: function () {
      this.$emit('setConfig', 1)
    }
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
  width:115px;
  text-align:right;
  display: inline-block;
}
.tlsLabel{
  width:25px;
  text-align:right;
  display: inline-block;
}
</style>
