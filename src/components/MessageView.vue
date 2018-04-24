<template>
  <div>
    <div v-for="option in options" :key="option.value">
      <input type="checkbox" value = "{{ option.SSOptions }}">
      <label for="{{ option.SSOptions }}">{{ option.SSOptions }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  data: () => {
    return {
      selected: '1',
      options: [
        { SSOptions: 'One', value: '1' },
        { SSOptions: 'Two', value: '2' },
        { SSOptions: 'Three', value: '3' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
