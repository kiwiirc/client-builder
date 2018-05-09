<template>
  <div id="inputContainer">
  	<div class="input-column">

		<h3>Message View Settings </h3>

		<div class="checkbox-container">
			<label>Compact View</label>
			<input v-model="localData.config.compactView"
			@change="update" @keyup="update"
			type='checkbox'
			/>
		</div>

		<div class="checkbox-container">
			<label>Emojis</label>
			<input v-model="localData.config.emojis"
			  @change="update" @keyup="update"
			  type='checkbox'
			/>
		</div>

		<div class="checkbox-container">
			<label>Extra Formatting (markdown)</label>
			<input v-model="localData.config.extraFormatting"
			@change="update" @keyup="update"
			type='checkbox'
			/>
		</div>

		<div class="checkbox-container">
			<label>Private Messages</label>
			<input v-model="localData.config.privateMessages"
			  @change="update" @keyup="update"
			  type='checkbox'
			/>
		</div>

		<div class="checkbox-container">
			<label>Show Join / Parts</label>
			<input v-model="localData.config.showJoinParts"
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
  name: 'MessageView',
  props: ['localData'],
  methods: {
    update: function () {
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
