<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Plugins</h3>
            <div class="checkbox-container">
                <label for="conferencing-plugin">Conference</label>
                <input
                    id="conferencing-plugin"
                    v-model="conferencePlugin"
                    type="checkbox"
                >
            </div>

            <div class="checkbox-container">
                <label for="file-uploader">File uploader</label>
                <input
                    id="file-uploader"
                    v-model="fileuploaderPlugin"
                    type="checkbox"
                >
            </div>
        </div>
    </div>
</template>

<script>

function computedPluginProperty(name, url) {
    return {
        get() {
            return this.hasPlugin(name);
        },
        set(newVal) {
            if (newVal) {
                this.addPlugin(name, url);
            } else {
                this.removePlugin(name);
            }
        },
    };
}

export default {
    name: 'Plugins',
    props: ['localData'],
    data() {
        return { };
    },
    computed: {
        conferencePlugin: computedPluginProperty('conference', '/nextplugins/conference.js'),
        fileuploaderPlugin: computedPluginProperty('fileuploader', '/nextplugins/fileuploader.js'),
    },
    methods: {
        hasPlugin(name) {
            let plugins = this.localData.config.plugins;
            return !!plugins.find(p => p.name === name);
        },
        addPlugin(name, url) {
            let plugins = this.localData.config.plugins;
            if (!plugins.find(p => p.name === name)) {
                plugins.push({ name, url });
            }
        },
        removePlugin(name) {
            let plugins = this.localData.config.plugins;
            let idx = plugins.findIndex(p => p.name === name);
            if (idx > -1) {
                plugins.splice(idx, 1);
            }
        },
        update() {
            this.$emit('setConfig', 1);
        },
    },
};
</script>
