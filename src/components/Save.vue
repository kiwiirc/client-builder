<template>
    <div>
        <h4>Embedding your client</h4>
        <div v-if="settingsId">
            <p>
                Embed your custom Kiwi IRC client into your own website.
                On your contact page or next to a video stream - it can fit anywhere.
            </p>
            Preview URL: <button class="noBorder" @click="copy('iframeLink')">📋 Copy</button>
            <div id="iframeLink" class="snippet">
                <a :href="customInstanceUrl" target="_blank">{{ customInstanceUrl }}</a>
            </div>
            <hr>
            Embed HTML: <button class="noBorder" @click="copy('iframeEmbed')">📋 Copy</button>
            <div id="iframeEmbed" class="snippet">{{ localData.iframeSnippet }}</div>
        </div>
        <div v-else>
            <button class="noBorder" @click="save()">Create custom instance</button>
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
