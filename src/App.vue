<template>
    <div id="app">
        <vue-tabs v-model="tabName" class="tabs">
            <v-tab title="Startup Screen">
                <StartupScreen :local-data="localData" @setConfig="setConfig"/>
            </v-tab>

            <v-tab title="IRC Network">
                <NetworkSettings :local-data="localData" @setConfig="setConfig"/>
            </v-tab>

            <v-tab title="Messages">
                <MessageView :local-data="localData" @setConfig="setConfig"/>
            </v-tab>

            <v-tab title="Theme">
                <Theme :local-data="localData" @setConfig="setConfig"/>
            </v-tab>

            <v-tab title="Plugins">
                <Plugins :local-data="localData" @setConfig="setConfig"/>
            </v-tab>

            <v-tab title="Save">
                <Save
                    :settings-id="settingsId"
                    :custom-instance-url="customInstanceUrl"
                    :local-data="localData"
                    @save="save"
                />
            </v-tab>
        </vue-tabs>
        <div :class="{hidden: tabName === 'Save'}" class="preview">
            <iframe id="previewFrame" />
        </div>
    </div>
</template>

<script>
import Api from '@/libs/Api';
import VueTabs from 'vue-nav-tabs';
import 'vue-nav-tabs/themes/vue-tabs.css';
import Vue from 'vue';
import Theme from './components/Theme.vue';
import NetworkSettings from './components/NetworkSettings.vue';
import StartupScreen from './components/StartupScreen.vue';
import MessageView from './components/MessageView.vue';
import Plugins from './components/Plugins.vue';
import Save from './components/Save.vue';

Vue.use(VueTabs);

/* eslint-disable quote-props */
window.currentConfig = {
    'windowTitle': 'Kiwi IRC - The web IRC client',
    'startupScreen': 'welcome',
    'kiwiServer': 'http://10.0.0.16:8081/webirc/kiwiirc/',
    'restricted': true,
    'theme': 'Default',
    'themes': [{
        'name': 'Default',
        'url': '/static/themes/default/',
    }, {
        'name': 'Dark',
        'url': '/static/themes/dark/',
    }, {
        'name': 'Nightswatch',
        'url': '/static/themes/nightswatch/',
    }, {
        'name': 'Radioactive',
        'url': '/static/themes/radioactive/',
    }, {
        'name': 'Osprey',
        'url': '/static/themes/osprey/',
    }, {
        'name': 'Sky',
        'url': '/static/themes/sky/',
    }, {
        'name': 'Coffee',
        'url': '/static/themes/coffee/',
    }, {
        'name': 'custom',
        'url': '/static/themes/default/',
    }],
    'startupOptions': {
        'server': 'irc.freenode.net',
        'port': 6667,
        'tls': false,
        'direct': false,
        'channel': '#kiwiirc-default',
        'nick': 'kiwi-n?',
        'password': '',
        'greetingText': 'Welcome to KiwiIRC!',
        'infoContent': 'Have a nice day!',
        'buttonText': 'Connect...',
        'showChannel': true,
        'showNick': true,
        'showUser': true,
        'showPassword': true,
        'autoConnect': false,
        'recaptcha': false,
        'encoding': 'utf8',
        'directPath': '',
        'gecos': '',
        'state_key': false,
    },
    'buffers': {
        'messageLayout': 'modern',
        'show_emoticons': true,
        'extra_formatting': true,
        'block_pms': false,
        'show_joinparts': true,
        'show_timestamps': true,
    },
    'embedly': {
        'key': '',
    },
    'plugins': [
    ],
    'warnOnExit': false,
};

let data = new Vue({
    data() {
        return {
            config: window.currentConfig,
            show_advanced: false,
            HTML: '',
            iframe: null,
            iframeSnippet: '',
            networkType: 'default',
        };
    },
});

export default {
    name: 'App',
    components: {
        Theme,
        NetworkSettings,
        StartupScreen,
        MessageView,
        Plugins,
        Save,
    },
    data() {
        return {
            localData: data,
            kiwiInstanceURL: window.kiwiuser.kiwi_instance,
            customInstanceUrl: null,
            changeThrottleTimer: 0,
            tabName: '',
            settingsId: null,
        };
    },
    watch: {
        tabName(val) {
            if (!this.localData.iframe) {
                return;
            }
            let ifr = this.localData.iframe;

            if (val === 'Startup Screen' || val === 'IRC Network') {
                ifr.contentWindow.postMessage({
                    'showStartup': true,
                }, this.kiwiInstanceURL);
            } else {
                ifr.contentWindow.postMessage({
                    'showStartup': false,
                }, this.kiwiInstanceURL);
            }
        },
    },
    mounted() {
        this.preview();
    },
    methods: {
        setConfig() {
            this.preview();
        },
        createSnippets(id) {
            this.localData.iframeSnippet = `<iframe src="${this.kiwiInstanceURL}?settings=${id}" style="width:100%;height:680px;border:0;display:block"></iframe>`;
            this.localData.HTML = `<!DOCTYPE html><html><head><style>body{margin:0}</style></head><body>${this.localData.iframeSnippet}</body></html>`;
        },
        async save() {
            let url = '/clientconfig';
            if (this.settingsId) {
                url += '/' + this.settingsId;
            }
            let config = JSON.parse(JSON.stringify(window.currentConfig));
            config.warnOnExit = true;
            let postData = { settings: JSON.stringify(config) };
            let res = await Api.instance().call(url).post(postData).json();
            this.settingsId = res.settings_id;
            this.createSnippets(this.settingsId);
            let instanceURL = new URL(this.kiwiInstanceURL);
            instanceURL.searchParams.set('settings', this.settingsId);
            this.customInstanceUrl = instanceURL.toString();
        },
        async preview() {
            let config = JSON.parse(JSON.stringify(window.currentConfig));
            config.warnOnExit = true;
            let ifr = document.getElementById('previewFrame');
            if (ifr) {
                let d = new Date();
                this.changeThrottleTimer = d.getTime() + 2000;
                if (!ifr.src) {
                    ifr.onload = () => {
                        ifr.contentWindow.postMessage({
                            'previewConfig': config,
                        }, this.kiwiInstanceURL);
                        this.localData.iframe = ifr;
                    };
                    let instanceURL = new URL(this.kiwiInstanceURL);
                    instanceURL.searchParams.set('settings_preview', 1);
                    ifr.src = instanceURL.toString();
                } else {
                    ifr.contentWindow.postMessage({
                        'previewConfig': config,
                    }, this.kiwiInstanceURL);
                }
            }
        },
    },
};

</script>

<style scoped>
    .hidden {
        display:none;
    }
    .nav-tabs .tab:last-child {
        margin-left: 2em;
    }
    .tabs {
        overflow-y: scroll;
        height: 277px;
        max-height: 277px;
    }
</style>
