<template>
    <div style="padding: 0 1em;">
        <h4> {{ endpoint ? 'Save your custom client' : 'Copy your custom config' }}</h4>

        <p v-if="endpoint">
            <button v-if="!localData.saving" @click="save()">Generate HTML and links</button>
            <span v-else>Saving...</span>
        </p>

        <div v-else>
            <p>
                <button @click="copy('jsonConfig')">📋 Copy</button>
            </p>
            <textarea
                id="jsonConfig"
                v-model="jsonConfig"
                class="json-config"
            />
        </div>

        <div v-if="settingsId && !localData.saving" class="snippets">
            <hr>

            A link to your custom client. Share it on your website or send it over an email. <br>
            <button @click="copy('iframeLink')">📋 Copy</button>
            <div id="iframeLink" class="snippet">
                <a :href="customInstanceUrl" target="_blank">{{ customInstanceUrl }}</a>
            </div>

            <hr>

            iframe HTML. Embed it on your website, wordpress or blog. <br>
            <button @click="copy('iframeEmbed')">📋 Copy</button>
            <div id="iframeEmbed" class="snippet">{{ iframeSnippet }}</div>
        </div>
    </div>
</template>

<script>
import extractStructure from '../libs/extractStructure';
import { mergeConfig } from '../libs/helpers';

export default {
    name: 'Save',
    props: ['localData', 'customInstanceUrl', 'settingsId'],
    computed: {
        iframeSnippet() {
            return `<iframe src="${this.customInstanceUrl}" style="width:100%;height:680px;border:0;display:block"></iframe>`;
        },
        jsonConfig() {
            const newConfig = extractStructure(this.localData.config, this.localData.savableConfig);
            const config = this.localData.originalConfig;
            if (!this.localData.originalConfig) {
                return JSON.stringify({ error: 'missing original config' });
            }
            mergeConfig(config, newConfig);
            return JSON.stringify(config, null, 4);
        },
        endpoint() {
            return window.kiwiuser.api_endpoint;
        },
    },
    methods: {
        save() {
            this.$emit('save');
        },
        update() {
            this.$emit('setConfig', 1);
        },
        copy(containerid) {
            const textarea = this.getTextarea(containerid);
            textarea.id = 'temp_element';
            textarea.style.height = 0;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        },
        getTextarea(containerid) {
            const srcContainer = document.getElementById(containerid);
            if (srcContainer.tagName === 'TEXTAREA') {
                return srcContainer.cloneNode();
            }
            const textarea = document.createElement('textarea');
            textarea.value = document.getElementById(containerid).innerText;
            return textarea;
        },
    },
};
</script>

<style scoped>
.snippets {
    margin-top: 21px;
}

.snippets > button {
    margin-top: 5px;
}

.snippet {
    width: 50%;
    margin: 0;
    font-size: 1.2em;
    padding: 20px;
    margin-top: 10px;
    line-height: normal;
    background-color: #dedede;
}

.json-config {
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 340px);
    resize: none;
}
</style>
