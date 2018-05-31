<template>
  <div>
    <h4>Embedding your client</h4>
    <p>Embed your custom Kiwi IRC client into your own website. On your contact page or next to a video stream - it can fit anywhere.</p>
    Preview URL:
    <textarea disabled spellcheck="false" v-model="localData.iframe.src" id="settings-link"></textarea>
    <hr>
    Embed HTML:
    <textarea disabled spellcheck="false" v-model="localData.iframeSnippet" id="settings-link"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Export',
  props: ['localData'],
  methods: {
    update: function () {
      this.$emit('setConfig', 1)
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin: 0;
  font-size: 1.2em;
  padding: 20px;
  line-height: normal;
  background-color: #f5f5f5;
}
#settings-link{
  margin-bottom:20px;
}
</style>
