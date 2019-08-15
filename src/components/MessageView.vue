<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Messages</h3>
            <label for="layout-select">
                Layout
            </label>
            <select
                id="layout-select"
                v-model="localData.config.buffers.messageLayout"
                @change="update"
            >
                <option value="compact">Compact</option>
                <option value="modern">Modern</option>
                <option value="inline">Inline</option>
            </select>
            <div class="checkbox-container">
                <label for="useMonospace">Use monospace font</label>
                <input
                    id="useMonospace"
                    v-model="localData.config.useMonospace"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
        </div>
        <div class="input-column">
            <h3>&nbsp;</h3>
            <div class="checkbox-container">
                <label for="emojis">Show emojis</label>
                <input
                    id="emojis"
                    v-model="localData.config.buffers.show_emoticons"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
            <div class="checkbox-container">
                <label for="extra-formatting">Basic markdown</label>
                <input
                    id="extra-formatting"
                    v-model="localData.config.buffers.extra_formatting"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
            <div class="checkbox-container">
                <label for="private-messages">Block private messages</label>
                <input
                    id="private-messages"
                    v-model="localData.config.buffers.block_private"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
            <div class="checkbox-container">
                <label for="show-join-show-parts">Show join / parts</label>
                <input
                    id="show-join-show-parts"
                    v-model="localData.config.buffers.show_joinparts"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
            <div class="checkbox-container">
                <label for="buffers--show_timestamps">Show timestamps</label>
                <input
                    id="buffers--show_timestamps"
                    v-model="localData.config.buffers.show_timestamps"
                    type="checkbox"
                    @change="update" @keyup="update"
                >
            </div>
            <div v-if="localData.show_advanced">
                <div class="checkbox-container">
                    <label for="buffers--show_hostnames">Show hostnames</label>
                    <input
                        id="buffers--show_hostnames"
                        v-model="localData.config.buffers.show_hostnames"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--show_topics">Show topics</label>
                    <input
                        id="buffers--show_topics"
                        v-model="localData.config.buffers.show_topics"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--show_nick_changes">Show nick changes</label>
                    <input
                        id="buffers--show_nick_changes"
                        v-model="localData.config.buffers.show_nick_changes"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--show_mode_changes">Show mode changes</label>
                    <input
                        id="buffers--show_mode_changes"
                        v-model="localData.config.buffers.show_mode_changes"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--traffic_as_activity">Show traffic as activity</label>
                    <input
                        id="buffers--traffic_as_activity"
                        v-model="localData.config.buffers.traffic_as_activity"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--coloured_nicklist">Show colours in nick list</label>
                    <input
                        id="buffers--coloured_nicklist"
                        v-model="localData.config.buffers.coloured_nicklist"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--colour_nicknames_in_messages">
                        Colour nicknames in messages
                    </label>
                    <input
                        id="buffers--colour_nicknames_in_messages"
                        v-model="localData.config.buffers.colour_nicknames_in_messages"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--extra_formatting">Extra formatting</label>
                    <input
                        id="buffers--extra_formatting"
                        v-model="localData.config.buffers.extra_formatting"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--mute_sound">Mute sounds</label>
                    <input
                        id="buffers--mute_sound"
                        v-model="localData.config.buffers.mute_sound"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--hide_message_counts">Hide message counts</label>
                    <input
                        id="buffers--hide_message_counts"
                        v-model="localData.config.buffers.hide_message_counts"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--show_realnames">Show real name</label>
                    <input
                        id="buffers--show_realnames"
                        v-model="localData.config.buffers.show_realnames"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <!-- Default ban mask -->
                <!-- Default kick reason -->
                <div class="checkbox-container">
                    <label for="buffers--shared_input">Shared input</label>
                    <input
                        id="buffers--shared_input"
                        v-model="localData.config.buffers.shared_input"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--show_message_info">Show message info</label>
                    <input
                        id="buffers--show_message_info"
                        v-model="localData.config.buffers.show_message_info"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--who_loop">Who loop</label>
                    <input
                        id="buffers--who_loop"
                        v-model="localData.config.buffers.who_loops"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <div class="checkbox-container">
                    <label for="buffers--share_typing">Share typing</label>
                    <input
                        id="buffers--share_typing"
                        v-model="localData.config.buffers.share_typing"
                        type="checkbox"
                        @change="update" @keyup="update"
                    >
                </div>
                <label for="buffers--flash_title">
                    Flash title on
                </label>
                <select
                    id="buffers--flash_title"
                    v-model="localData.config.buffers.flash_title"
                    @change="update"
                >
                    <option value="message">Message</option>
                    <option value="highlight">Highlight</option>
                    <option value="off">Off</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageView',
    props: ['localData'],
    methods: {
        update() {
            this.$emit('setConfig', 1);
        },
    },
};
</script>
