<template>
  <div id="inputContainer">
  	<div class='input-column'>
		<h3>Plugin Settings</h3>
		<div class='checkbox-container'>
			<label>Conferencing (requires https)</label>
			<input v-model="conferencePlugin"
			  @change="update" @keyup="update"
			  type='checkbox'
			/>
		</div>

		<div class='checkbox-container'>
			<label>File Uploader</label>
			  <input v-model="fileuploader"
  			  @change="update" @keyup="update"
  			  type='checkbox'
  		  	/>
		</div>

		<div class='checkbox-container'>
			<label>Starry Plugin</label>
			<input v-model="starryPlugin"
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

<style scoped>
#inputContainer{
  margin:10px;
  line-height:2.5em;
}
.label{
  width:210px;
  text-align:right;
  display: inline-block;
}
</style>
