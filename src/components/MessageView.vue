<template>
  <div id="inputContainer">
    <label>
      <div class="label">Compact View</div>
      <input v-model="localData.config.compactView"
        @change="update" @keyup="update"
        type='checkbox'
      />
    </label><br>
    <label>
      <div class="label">Emojis</div>
      <input v-model="localData.config.emojis"
        @change="update" @keyup="update"
        type='checkbox'
      />
    </label><br>
    <label>
      <div class="label">Extra Formatting (markdown)</div>
      <input v-model="localData.config.extraFormatting"
        @change="update" @keyup="update"
        type='checkbox'
      />
    </label><br>
    <label>
      <div class="label">Private Messages</div>
      <input v-model="localData.config.privateMessages"
        @change="update" @keyup="update"
        type='checkbox'
      />
    </label><br>
    <label>
      <div class="label">Show Join / Parts</div>
      <input v-model="localData.config.showJoinParts"
        @change="update" @keyup="update"
        type='checkbox'
      />
    </label><br>
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
