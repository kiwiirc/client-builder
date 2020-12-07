<template>
    <div id="inputContainer">
        <div v-if="localData.config.startupScreen == 'welcome'">
            <div class="input-column">
                <h3>Custom content</h3>
                <label for="welcome-greeting">Title</label>
                <input
                    id="welcome-greeting"
                    v-model="startupGreetingText"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="welcome-button">Connect button</label>
                <input
                    id="welcome-button"
                    v-model="startupButtonText"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="welcome-info">Extra information</label>
                <textarea
                    id="welcome-info"
                    v-model="startupInfoContent"
                    type="text"
                    class="extra-info"
                    @change="update"
                    @keyup="update"
                />
            </div>

            <div class="input-column">
                <h3>Login Options </h3>
                <div class="checkbox-container">
                    <label for="welcome-show-channel">Show channel</label>
                    <input
                        id="welcome-show-channel"
                        v-model="startupShowChannel"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <!--<div class="checkbox-container">
                    <label for="welcome-show-nick">Show nick</label>
                    <input
                        id="welcome-show-nick"
                        v-model="startupShowNick"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div> -->

                <div class="checkbox-container">
                    <label for="welcome-show-password">Show password</label>
                    <input
                        id="welcome-show-password"
                        v-model="startupShowPassword"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
            </div>
            <div class="input-column">
                <label for="welcome-background">Background URL</label>
                <input
                    id="welcome-background"
                    v-model="backgroundUrl"
                    type="text"
                    :style="{'border-color': isValidBackground ? '' : '#f00'}"
                    @blur="updateBackground"
                >
            </div>
        </div>
    <!--
    <div v-for="field in ZNCfields" :key="field">
    <label><div class="label">{{field.name}}</div>
    <input :type="field.type" @change="update" @keyup="update">
    </label><br>
    </div>
    -->
    </div>
</template>

<script>

// The startup screen has some default for undefined values, so bare this in mind when
// reading the values. Without this, some of the options appear as false when infact
// they are defaulted to true during runtime.
function startupOption(key, defaultVal) {
    return {
        get() {
            let startupOptions = this.localData.config.startupOptions;
            return startupOptions[key] === undefined ?
                defaultVal :
                startupOptions[key];
        },
        set(newVal) {
            let startupOptions = this.localData.config.startupOptions;
            if (key === 'infoContent') {
                newVal = newVal.replace(/\r?\n/g, '<br />');
            }
            this.$set(startupOptions, key, newVal);
        },
    };
}

function infoContent(defaultVal) {
    return {
        get() {
            let startupOptions = this.localData.config.startupOptions;
            return startupOptions.infoContent === undefined ?
                defaultVal :
                startupOptions.infoContent.replace(/<br\s?\/?>/g, '\n');
        },
        set(newVal) {
            let startupOptions = this.localData.config.startupOptions;
            this.$set(startupOptions, 'infoContent', newVal.replace(/\r?\n/g, '<br />'));
        },
    };
}

export default {
    name: 'StartupScreen',
    props: ['localData'],
    data() {
        return {
            backgroundUrl: '',
            urlRegex: null,
        };
    },
    computed: {
        startupGreetingText: startupOption('greetingText', ''),
        startupButtonText: startupOption('buttonText', ''),
        startupInfoContent: infoContent(''),
        startupShowChannel: startupOption('showChannel', true),
        startupShowNick: startupOption('showNick', true),
        startupShowPassword: startupOption('showPassword', true),
        isValidBackground() {
            if (!this.backgroundUrl) {
                return true;
            }
            return this.isValidUrl(this.backgroundUrl);
        },
    },
    methods: {
        update() {
            this.$emit('setConfig', { reload: true });
        },
        updateBackground() {
            if (this.backgroundUrl && !this.isValidUrl(this.backgroundUrl)) {
                // only return if the url is not empty and invalid
                return;
            }
            const baseBackgroundUrl = this.localData.baseBackgroundUrl;
            const startupOptions = this.localData.config.startupOptions;
            const newUrl = this.backgroundUrl ? baseBackgroundUrl + this.backgroundUrl : '';
            this.$set(startupOptions, 'infoBackground', newUrl);
            this.update();
        },
        isValidUrl(url) {
            if (!this.urlRegex) {
                // regex from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
                this.urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            }
            return this.urlRegex.test(url);
        },
    },
};
</script>
