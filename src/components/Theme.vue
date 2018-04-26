<template>
  <div id="inputContainer">
    <select v-model="selected" @change="update">
      <option selected value = "Default">Default</option>
      <option value = "Dark">Dark</option>
    </select><br>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  data: () => {
    return {
      selected: 'Dark'
    }
  },
  methods: {
    update: function (e) {
      this.$emit('update', { source: 'Theme', data: { theme: this.selected } })
    }
  },
  mounted: function () {
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
