<template>
  <div>
    <h4>Embedding your client</h4>
    <p>Embed your custom Kiwi IRC client into your own website. On your contact page or next to a video stream - it can fit anywhere.</p>
    Preview URL: <button @click="copy('iframeLink')" class="noBorder">📋 Copy</button>
    <div class="snippet" id="iframeLink"><a :href="localData.iframe.src" target="_blank">{{localData.iframe.src}}</a></div>
    <hr>
    Embed HTML: <button @click="copy('iframeEmbed')" class="noBorder">📋 Copy</button>
    <div class="snippet" id="iframeEmbed">{{localData.iframeSnippet}}</div>
  </div>
</template>

<script>
export default {
  name: 'Save',
  props: ['localData'],
  methods: {
    update: function () {
      this.$emit('setConfig', 1)
    },
    copy (containerid) {
      var textarea = document.createElement('textarea')
      textarea.id = 'temp_element'
      textarea.style.height = 0
      document.body.appendChild(textarea)
      textarea.value = document.getElementById(containerid).innerText
      var selector = document.querySelector('#temp_element')
      selector.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }
}
</script>

<style scoped>
.snippet {
  width: 50%;
  margin: 0;
  font-size: 1.2em;
  padding: 20px;
  line-height: normal;
  background-color: #dedede;
}
.noBorder{
  border: none;
}
</style>
