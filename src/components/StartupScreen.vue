<template>
  <div>
    <input type="checkbox" value = "One" v-model="options">
    <label>One</label><br>
    <input type="checkbox" value = "Two" v-model="options">
    <label>Two</label><br>
    <input type="checkbox" value = "Three" v-model="options">
    <label>Three</label><br>
  </div>
</template>

<script>
export default {
  name: 'StartupScreen',
  data: () => {
    return {
      options: []
    }
  },
  watch: {
    options: function (value) {
      this.$emit('update', this.options)
    }
  }
}
</script>

<style scoped>
</style>
