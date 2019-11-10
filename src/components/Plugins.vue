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
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="checkbox-container">
                <label for="file-uploader">File uploader</label>
                <input
                    id="file-uploader"
                    v-model="fileuploader"
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
    name: 'Plugins',
    props: ['localData'],
    data() {
        return {
            conferencePlugin: false,
            fileuploader: false,
        };
    },
    methods: {
        update() {
            this.localData.config.plugins = [];
            if (this.conferencePlugin) {
                this.localData.config.plugins.push({
                    name: 'conference',
                    url: '/nextplugins/conference.js',
                });
            }
            if (this.fileuploader) {
                this.localData.config.plugins.push({
                    name: 'fileuploader',
                    url: '/nextplugins/fileuploader.js',
                });
            }
            this.$emit('setConfig', 1);
        },
    },
};
</script>
