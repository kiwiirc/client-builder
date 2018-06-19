<template>
    <div id="inputContainer">
        <div class="input-column">

        <h3>Messages</h3>

        <div class="checkbox-container">
            <label for="layout-select">
                Layout
            </label>
            <select id="layout-select" v-model="localData.config.messageLayout" @change="update">
                <option value="compact">Compact</option>
                <option value="modern">Modern</option>
            </select>
        </div>

        </div>
        <div class="input-column">
        <h3>&nbsp;</h3>

        <div class="checkbox-container">
            <label for="emojis">Show emojis</label>
            <input id="emojis" v-model="localData.config.buffers.show_emoticons"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="extra-formatting">Basic markdown</label>
            <input id="extra-formatting" v-model="localData.config.buffers.extraFormatting"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="private-messages">Block private messages</label>
            <input id="private-messages" v-model="localData.config.buffers.block_pms"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="show-join-show-parts">Show join / parts</label>
            <input id="show-join-show-parts" v-model="localData.config.buffers.showJoinParts"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        </div>
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
