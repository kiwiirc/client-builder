<template>
  <div id="inputContainer">
 	<div class="input-column">
		<h3>Kiwi Theme</h3>
		<label>Select theme to use: </label>
	    <select v-model="localData.config.theme" @change="update">
	      <option selected value = "Default">Default</option>
	      <option value = "Dark">Dark</option>
	    </select>
	</div>
  </div>
</template>

<script>
export default {
  name: 'Theme',
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
  font-size:1.25em;
  text-align: center;
}
#inputContainer{
  margin:10px;
  line-height:2.5em;
}
</style>
