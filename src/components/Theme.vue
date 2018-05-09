<template>
  <div id="inputContainer">
    <select v-model="localData.config.theme" @change="update">
      <option value = "Default">Default</option>
      <option selected value = "Dark">Dark</option>
    </select><br>
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
