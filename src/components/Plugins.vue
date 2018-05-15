<template>
    <div id="inputContainer">
        <div class='input-column'>
            <h3>Plugin Settings</h3>
            <div class='checkbox-container'>
                <label for="conferencing-plugin">Conferencing (requires https)</label>
                <input id="conferencing-plugin" v-model="conferencePlugin"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>

            <div class='checkbox-container'>
                <label for="file-uploader">File Uploader</label>
                <input id="file-uploader" v-model="fileuploader"
                    @change="update" @keyup="update"
                    type='checkbox'
                />
            </div>

            <div class='checkbox-container'>
                <label for="starry-plugin">Starry Plugin</label>
                <input id="starry-plugin" v-model="starryPlugin"
                    @change="update" @keyup="update"
                    type='checkbox'
                    name = 'starryPlugin'
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Plugins',
  props: ['localData'],
  methods: {
    update: function () {
      this.localData.config.plugins = []
      if (this.conferencePlugin) this.localData.config.plugins.push({'name': 'conferencePlugin', url: './static/plugins/plugin-conference/dist/main.js'})
      if (this.starryPlugin) this.localData.config.plugins.push({'name': 'starryPlugin', url: './static/plugins/plugin-starry/dist/main.js'})
      if (this.fileuploader) {
        this.localData.config.fileuploader = {'server': this.localData.baseURL + '/files', 'maxFileSize': 10485760}
        this.localData.config.plugins.push({'name': 'fileuploader', url: './static/plugins/fileuploader-kiwiirc-plugin/dist/main.js'})
      }
      this.$emit('setConfig', 1)
    }
  }
}
</script>
