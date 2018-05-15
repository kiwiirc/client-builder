<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Network Selection</h3>
            <label for="network_type">Network Type </label>
            <select v-model="localData.config.networkType" @change="update" id="network_type">
                <option value = "default">Standard</option>
                <option value = "custom">Custom Server</option>
                <option value = "znc">ZNC</option>
            </select>
        </div>

    <div v-if="localData.config.networkType == 'default'">
        <div class="input-column">
            <h3>IRC Network</h3>
            <label for="default-server">Server</label>
            <input id="default-server" v-model="localData.config.startupOptions.server"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="default-port">Port</label>
            <input id="default-port" v-model="localData.config.startupOptions.port"
                @change="update" @keyup="update"
                type='text'
            />
        </div>

        <div class="input-column">
            <h3>&nbsp;</h3>

            <label for="default-encoding">Encoding</label>
            <input id="default-encoding" v-model="localData.config.startupOptions.encoding"
                @change="update" @keyup="update"
                type='text'
            />

            <div class="checkbox-container">
                <label for="default-tlsLabel">TLS</label>
                <input id="default-tlsLabel" v-model="localData.config.startupOptions.tls"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>

            <label for="default-nick">Nick</label>
            <input id="default-nick" v-model="localData.config.startupOptions.nick"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="default-channel">Channel</label>
            <input id="default-channel" v-model="localData.config.startupOptions.channel"
                @change="update" @keyup="update"
                type='text'
            />
        </div>
    </div>

    <div v-else-if="localData.config.networkType == 'custom'">
        <div class='input-column'>
            <h3>Direct Options</h3>
            <label for="custom-gecos">gecos</label>
            <input id="custom-gecos" v-model="localData.config.startupOptions.gecos"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="custom-direct-path">Direct Path</label>
            <input id="custom-direct-path" v-model="localData.config.startupOptions.directPath"
                @change="update" @keyup="update"
                type='text'
            />

            <div class='checkbox-container'>
                <label for="custom-direct">Direct</label>
                <input id="custom-direct" v-model="localData.config.startupOptions.direct"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>
        </div>

        <div class='input-column'>
            <h3>IRC Network </h3>
            <label for="custom-server">Server</label>
            <input id="custom-server" v-model="localData.config.startupOptions.server"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="custom-port">Port</label>
            <input id="custom-port" v-model="localData.config.startupOptions.port"
                @change="update" @keyup="update"
                type='text'
            />
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>
            <label for="custom-encoding">Encoding</label>
            <input id="custom-encoding" v-model="localData.config.startupOptions.encoding"
                @change="update" @keyup="update"
                type='text'
            />

            <div class="checkbox-container">
                <label for="custom-TLS">TLS</label>
                <input id="custom-TLS" v-model="localData.config.startupOptions.tls"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>
            <label for="custom-channel">Channel</label>
            <input id="custom-channel" v-model="localData.config.startupOptions.channel"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="custom-nick">Nick</label>
            <input id="custom-nick" v-model="localData.config.startupOptions.nick"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="custom-password">Password</label>
            <input id="custom-password" v-model="localData.config.startupOptions.password"
                @change="update" @keyup="update"
                type='password'
            />
        </div>
    </div>

    <div v-else-if="localData.config.networkType == 'znc'">
        <div class='input-column'>
            <h3>Network Settings</h3>
            <label for="znc-server">Server</label>
            <input id="znc-server" v-model="localData.config.startupOptions.server"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="znc-network">Network</label>
            <input id="znc-network" v-model="localData.config.startupOptions.network"
                @change="update" @keyup="update"
                type='text'
            />
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>
            <label for="znc-username">User Name</label>
            <input id="znc-username" v-model="localData.config.startupOptions.userName"
                @change="update" @keyup="update"
                type='text'
            />

            <label for="znc-password">Password</label>
            <input id="znc-password" v-model="localData.config.startupOptions.password"
                @change="update" @keyup="update"
                type='password'
            />
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>
            <label for="znc-port">Port</label>
            <input id="znc-port" v-model="localData.config.startupOptions.port"
                @change="update" @keyup="update"
                type='text'
            />
        </div>

        <div class='input-column'>
            <h3>&nbsp;</h3>
            <div class='checkbox-container'>
                <label for="znc-shownetwork">Show Network</label>
                <input id="znc-shownetwork" v-model="localData.config.startupOptions.showNetwork"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>

            <div class='checkbox-container'>
                <label for="znc-showuser">Show User</label>
                <input id="znc-showuser" v-model="localData.config.startupOptions.showUser"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>

            <div class='checkbox-container'>
                <label for="znc-showpass">Show Pass</label>
                <input id="znc-showpass" v-model="localData.config.startupOptions.showPass"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>

            <div class='checkbox-container'>
                <label for="znc-tls">TLS</label>
                <input id="znc-tls" v-model="localData.config.startupOptions.tls"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkSettings',
  props: ['localData'],
  methods: {
    update: function () {
      this.$emit('setConfig', 1)
    }
  }
}
</script>
