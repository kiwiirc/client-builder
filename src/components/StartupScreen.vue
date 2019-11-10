<template>
    <div id="inputContainer">
        <div v-if="localData.config.startupScreen == 'welcome'">
            <div class="input-column">
                <h3>Custom content</h3>
                <label for="welcome-greeting">Title</label>
                <input
                    id="welcome-greeting"
                    v-model="localData.config.startupOptions.greetingText"
                    type="text"
                    @change="update"
                    @keyup="update"
                >

                <label for="welcome-button">Connect button</label>
                <input
                    id="welcome-button"
                    v-model="localData.config.startupOptions.buttonText"
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
                    v-model="localData.config.startupOptions.infoContent"
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
                        v-model="localData.config.startupOptions.showChannel"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <!--<div class="checkbox-container">
                    <label for="welcome-show-nick">Show nick</label>
                    <input
                        id="welcome-show-nick"
                        v-model="localData.config.startupOptions.showNick"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div> -->

                <div class="checkbox-container">
                    <label for="welcome-show-password">Show password</label>
                    <input
                        id="welcome-show-password"
                        v-model="localData.config.startupOptions.showPassword"
                        type="checkbox"
                        @change="update"
                        @keyup="update"
                    >
                </div>

                <div class="checkbox-container">
                    <label for="welcome-recaptcha">Use recaptcha</label>
                    <input
                        id="welcome-recaptcha"
                        v-model="localData.config.startupOptions.recaptcha"
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
export default {
    name: 'StartupScreen',
    props: ['localData'],
    methods: {
        update() {
            this.$emit('setConfig', { reload: true });
        },
    },
};
</script>
