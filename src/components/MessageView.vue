<template>
  <div id="inputContainer">
    <div v-for="field in fields" :key="field">
      <label><div class="label">{{field.name}}</div>
      <input :type="field.type" v-model="field.value" @change="update" @keyup="update">
      </label>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  data: () => {
    return {
      fields: [
        {type: 'checkbox', name: 'Compact View', value: ''},
        {type: 'checkbox', name: 'Emojis', value: ''},
        {type: 'checkbox', name: 'Extra Formatting (markdown)', value: ''},
        {type: 'checkbox', name: 'Private Messages', value: ''},
        {type: 'checkbox', name: 'Show join / parts', value: ''}
      ]
    }
  },
  methods: {
    update: function (e) {
      let out = {}
      let field = {}
      for (let i = 0; i < this.fields.length; ++i) {
        field = this.fields[i]
        out[field.name] = field.value
      }
      this.$emit('update', { source: 'MessageView', data: out })
    }
  },
  mounted: function () {
    this.update()
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
