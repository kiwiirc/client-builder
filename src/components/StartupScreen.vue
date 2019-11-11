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
                <input
                    id="welcome-info"
                    v-model="startupInfoContent"
                    type="text"
                    @change="update"
                    @keyup="update"
                >
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

                <div class="checkbox-container">
                    <label for="welcome-recaptcha">Use recaptcha</label>
                    <input
                        id="welcome-recaptcha"
                        v-model="startupRecaptcha"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>
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
            this.$set(startupOptions, key, newVal);
        },
    };
}

export default {
    name: 'StartupScreen',
    props: ['localData'],
    computed: {
        startupGreetingText: startupOption('greetingText', ''),
        startupButtonText: startupOption('buttonText', ''),
        startupInfoContent: startupOption('infoContent', ''),
        startupShowChannel: startupOption('showChannel', true),
        startupShowNick: startupOption('showNick', true),
        startupShowPassword: startupOption('showPassword', true),
        startupRecaptcha: startupOption('recaptcha', false),
    },
    methods: {
        update() {
            this.$emit('setConfig', { reload: true });
        },
    },
};
</script>
