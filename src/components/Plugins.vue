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

            <div class="checkbox-container">
                <label for="starry-plugin">Starry Plugin</label>
                <input
                    id="starry-plugin"
                    v-model="starryPlugin"
                    type="checkbox"
                    name="starryPlugin"
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
            starryPlugin: false,
        };
    },
    methods: {
        update() {
            this.localData.config.plugins = [];
            if (this.conferencePlugin) {
                this.localData.config.plugins.push({
                    name: 'conference',
                    url: './static/plugins/plugin-conference/dist/main.js',
                });
            }
            if (this.starryPlugin) {
                this.localData.config.plugins.push({
                    name: 'starry',
                    url: './static/plugins/plugin-starry/dist/main.js',
                });
            }
            if (this.fileuploader) {
                this.localData.config.fileuploader = {
                    server: this.localData.baseURL + '/files',
                    maxFileSize: 10485760,
                };
                this.localData.config.plugins.push({
                    name: 'fileuploader',
                    url: './static/plugins/fileuploader-kiwiirc-plugin/dist/main.js',
                });
            }
            this.$emit('setConfig', 1);
        },
    },
};
</script>
