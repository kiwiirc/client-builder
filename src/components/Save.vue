<template>
    <div style="padding: 0 1em;">
        <h4>Save your custom client</h4>

        <p>
            <button v-if="!localData.saving" @click="save()">Generate HTML and links</button>
            <span v-else>Saving...</span>
        </p>

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
            <div id="iframeEmbed" class="snippet">{{ localData.iframeSnippet }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Save',
    props: ['localData', 'customInstanceUrl', 'settingsId'],
    methods: {
        save() {
            this.$emit('save');
        },
        update() {
            this.$emit('setConfig', 1);
        },
        copy(containerid) {
            let textarea = document.createElement('textarea');
            textarea.id = 'temp_element';
            textarea.style.height = 0;
            document.body.appendChild(textarea);
            textarea.value = document.getElementById(containerid).innerText;
            let selector = document.querySelector('#temp_element');
            selector.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
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
</style>
