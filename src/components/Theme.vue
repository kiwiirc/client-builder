<template>
  <div id="inputContainer">
    <select v-model="selected" @change="update">
      <option disabled selected value="">Choose a Theme</option>
      <option value = "Theme 1">Theme 1</option>
      <option value = "Theme 2">Theme 2</option>
      <option value = "Theme 3">Theme 3</option>
      <option value = "Theme 4">Theme 4</option>
      <option value = "Theme 5">Theme 5</option>
      <option value = "Theme 6">Theme 6</option>
    </select><br>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  data: () => {
    return {
      selected: ''
    }
  },
  methods: {
    update: function (e) {
      this.$emit('update', { source: 'Theme', data: { theme: this.selected } })
    }
  },
  beforeMount () {
    this.update()
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
