<template>
    <div id="inputContainer">
        <div class="input-column">

        <h3>Message View Settings </h3>

        <div class="checkbox-container">
            <label for="compact-view">Compact View</label>
            <input id="compact-view" v-model="localData.config.compactView"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="emojis">Emojis</label>
            <input id="emojis" v-model="localData.config.emojis"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="extra-formatting">Extra Formatting (markdown)</label>
            <input id="extra-formatting" v-model="localData.config.extraFormatting"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="private-messages">Private Messages</label>
            <input id="private-messages" v-model="localData.config.privateMessages"
                @change="update" @keyup="update"
                type='checkbox'
            />
        </div>

        <div class="checkbox-container">
            <label for="show-join-show-parts">Show Join / Parts</label>
            <input id="show-join-show-parts" v-model="localData.config.showJoinParts"
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
