<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Startup Screen</h3>
            <label for="screen-to-edit"> </label>
            <select id="screen-to-edit" v-model="localData.config.startupScreen" @change="update">
                <option value = "welcome">Welcome Screen</option>
                <option value = "customServer">Custom Server</option>
                <option value = "znc">ZNC</option>
            </select>
        </div>

        <div v-if="localData.config.startupScreen == 'welcome'">
            <div class="input-column">
                <h3>Custom content</h3>
                <label for="welcome-greeting">Title</label>
                <input id="welcome-greeting" v-model="localData.config.startupOptions.greetingText"
                    @change="update" @keyup="update"
                    type='text'
                />

                <label for="welcome-button">Connect button</label>
                <input id="welcome-button" v-model="localData.config.startupOptions.buttonText"
                    @change="update" @keyup="update"
                    type='text'
                />
            </div>

            <div class='input-column'>
                <h3>&nbsp;</h3>
                <label for="welcome-info">Extra information</label>
                <input id="welcome-info" v-model="localData.config.startupOptions.infoContent"
                    @change="update" @keyup="update"
                    type='text'
                />
            </div>

            <div class="input-column">
                <h3>Login Options </h3>
                <div class="checkbox-container">
                    <label for="welcome-show-channel">Show channel</label>
                    <input id="welcome-show-channel" v-model="localData.config.startupOptions.showChannel"
                        @change="update" @keyup="update"
                        type='checkbox'
                    />
                </div>

                <div class="checkbox-container">
                    <label for="welcome-show-nick">Show nick</label>
                    <input id="welcome-show-nick" v-model="localData.config.startupOptions.showNick"
                        @change="update" @keyup="update"
                        type='checkbox'
                    />
                </div>

                <div class="checkbox-container">
                    <label for="welcome-show-password">Show password</label>
                    <input id="welcome-show-password" v-model="localData.config.startupOptions.showPassword"
                        @change="update" @keyup="update"
                        type='checkbox'
                    />
                </div>

                <div class="checkbox-container">
                    <label for="welcome-recaptcha">Use recaptcha</label>
                    <input id="welcome-recaptcha" v-model="localData.config.startupOptions.recaptcha"
                        @change="update" @keyup="update"
                        type='checkbox'
                    />
                </div>
            </div>
        </div>

        <div v-else-if="localData.config.startupScreen == 'customServer'">
            <div class='input-column'>
                <h3>Custom content</h3>
                <label for="customServer-button">Connect button</label>
                <input id="customServer-button" v-model="localData.config.startupOptions.buttonText"
                    @change="update" @keyup="update"
                    type='text'
                />

                <label for="customServer-button">Title</label>
                <input id="customServer-button" v-model="localData.config.startupOptions.greetingText"
                    @change="update" @keyup="update"
                    type='text'
                />
            </div>

        </div>

        <div v-else-if="localData.config.startupScreen == 'znc'">
            <div class='input-column'>
                <h3>Custom content</h3>
                <label for="znc-greeting">Ttitle</label>
                <input id="znc-greeting" v-model="localData.config.startupOptions.greetingText"
                    @change="update" @keyup="update"
                    type='text'
                />

                <label for="znc-button-text">Connect button</label>
                <input id="znc-button-text" v-model="localData.config.startupOptions.buttonText"
                    @change="update" @keyup="update"
                    type='text'
                />
            </div>

            <div class="input-column">
                <h3>&nbsp;</h3>
                <label for="znc-info-content">Extra information</label>
                <input id="znc-info-content" v-model="localData.config.startupOptions.infoContent"
                    @change="update" @keyup="update"
                    type='text'
                />
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
    update: function () {
      this.$emit('setConfig', 1)
    }
  }
}
</script>
