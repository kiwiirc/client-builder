<template>
    <div id="inputContainer">
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
            this.$emit('setConfig', { reload: true });
        },
    },
};
</script>
