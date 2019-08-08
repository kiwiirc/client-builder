<template>
    <div id="inputContainer">
        <div v-if="localData.config.startupScreen == 'welcome'">
            <div class="input-column">
                <h3>IRC Network </h3>
                <label for="custom-server">Server</label>
                <input
                    id="custom-server"
                    v-model="localData.config.startupOptions.server"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-port">Port</label>
                <input
                    id="custom-port"
                    v-model="localData.config.startupOptions.port"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="custom-encoding">Encoding</label>
                <input
                    id="custom-encoding"
                    v-model="localData.config.startupOptions.encoding"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <div class="checkbox-container">
                    <label for="custom-TLS">TLS</label>
                    <input
                        id="custom-TLS"
                        v-model="localData.config.startupOptions.tls"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="custom-channel">Channel</label>
                <input
                    id="custom-channel"
                    v-model="localData.config.startupOptions.channel"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-nick">Nick</label>
                <input
                    id="custom-nick"
                    v-model="localData.config.startupOptions.nick"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-password">Password</label>
                <input
                    id="custom-password"
                    v-model="localData.config.startupOptions.password"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div v-if="showDirectOptions" class="input-column">
                <h3>Direct Options</h3>
                <label for="custom-gecos">gecos</label>
                <input
                    id="custom-gecos"
                    v-model="localData.config.startupOptions.gecos"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-direct-path">Direct Path</label>
                <input
                    id="custom-direct-path"
                    v-model="localData.config.startupOptions.directPath"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <div class="checkbox-container">
                    <label for="custom-direct">Direct</label>
                    <input
                        id="custom-direct"
                        v-model="localData.config.startupOptions.direct"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>
        </div>

        <div v-else-if="localData.config.startupScreen == 'customServer'">
            <div class="input-column">
                <h3>IRC Network </h3>
                <label for="custom-server">Server</label>
                <input
                    id="custom-server"
                    v-model="localData.config.startupOptions.server"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-port">Port</label>
                <input
                    id="custom-port"
                    v-model="localData.config.startupOptions.port"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="custom-encoding">Encoding</label>
                <input
                    id="custom-encoding"
                    v-model="localData.config.startupOptions.encoding"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <div class="checkbox-container">
                    <label for="custom-TLS">TLS</label>
                    <input
                        id="custom-TLS"
                        v-model="localData.config.startupOptions.tls"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="custom-channel">Channel</label>
                <input
                    id="custom-channel"
                    v-model="localData.config.startupOptions.channel"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-nick">Nick</label>
                <input
                    id="custom-nick"
                    v-model="localData.config.startupOptions.nick"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-password">Password</label>
                <input
                    id="custom-password"
                    v-model="localData.config.startupOptions.password"
                    type="password"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>Direct Options</h3>
                <label for="custom-gecos">gecos</label>
                <input
                    id="custom-gecos"
                    v-model="localData.config.startupOptions.gecos"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="custom-direct-path">Direct Path</label>
                <input
                    id="custom-direct-path"
                    v-model="localData.config.startupOptions.directPath"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <div class="checkbox-container">
                    <label for="custom-direct">Direct</label>
                    <input
                        id="custom-direct"
                        v-model="localData.config.startupOptions.direct"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>
        </div>

        <div v-else-if="localData.config.startupScreen == 'znc'">
            <div class="input-column">
                <h3>Network Settings</h3>
                <label for="znc-server">Server</label>
                <input
                    id="znc-server"
                    v-model="localData.config.startupOptions.server"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="znc-network">Network</label>
                <input
                    id="znc-network"
                    v-model="localData.config.startupOptions.network"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="znc-username">User Name</label>
                <input
                    id="znc-username"
                    v-model="localData.config.startupOptions.userName"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="znc-password">Password</label>
                <input
                    id="znc-password"
                    v-model="localData.config.startupOptions.password"
                    type="password"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="znc-port">Port</label>
                <input
                    id="znc-port"
                    v-model="localData.config.startupOptions.port"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <div class="checkbox-container">
                    <label for="znc-shownetwork">Show Network</label>
                    <input
                        id="znc-shownetwork"
                        v-model="localData.config.startupOptions.showNetwork"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <div class="checkbox-container">
                    <label for="znc-showuser">Show User</label>
                    <input
                        id="znc-showuser"
                        v-model="localData.config.startupOptions.showUser"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <div class="checkbox-container">
                    <label for="znc-showpass">Show Pass</label>
                    <input
                        id="znc-showpass"
                        v-model="localData.config.startupOptions.showPass"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <div class="checkbox-container">
                    <label for="znc-tls">TLS</label>
                    <input
                        id="znc-tls"
                        v-model="localData.config.startupOptions.tls"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NetworkSettings',
    props: ['localData'],
    data() {
        return {
            showDirectOptions: false,
        };
    },
    methods: {
        update() {
            this.$emit('setConfig', 1);
        },
    },
};
</script>
