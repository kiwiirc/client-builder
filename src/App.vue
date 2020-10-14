<template>
    <div id="app">
        <tabbed-view v-if="previewReady" @changed="tabChanged">
            <tabbed-tab :focus="true" header="Startup Screen">
                <StartupScreen :local-data="localData" @setConfig="setConfig"/>
            </tabbed-tab>

            <tabbed-tab header="IRC Network">
                <NetworkSettings :local-data="localData" @setConfig="setConfig"/>
            </tabbed-tab>

            <tabbed-tab header="Messages">
                <MessageView :local-data="localData" @setConfig="setConfig"/>
            </tabbed-tab>

            <tabbed-tab header="Theme">
                <Theme :local-data="localData" @setConfig="setConfig"/>
            </tabbed-tab>

            <tabbed-tab header="Plugins">
                <Plugins :local-data="localData" @setConfig="setConfig"/>
            </tabbed-tab>

            <tabbed-tab header="Save">
                <Save
                    :settings-id="settingsId"
                    :custom-instance-url="customInstanceUrl"
                    :local-data="localData"
                    @save="save"
                />
            </tabbed-tab>
        </tabbed-view>

        <div :class="{hidden: tabName === 'Save'}" class="preview">
            <iframe
                id="previewFrame"
                :ref="'previewFrame'"
                :src="kiwiInstanceURL"
                @load="previewLoaded"
            />
        </div>
    </div>
</template>

<script>
import Api from '@/libs/Api';
import Vue from 'vue';
import KiwiController from './libs/KiwiController';
import extractStructure from './libs/extractStructure';
import TabbedView from './components/Tabs.vue';
import Theme from './components/Theme.vue';
import NetworkSettings from './components/NetworkSettings.vue';
import StartupScreen from './components/StartupScreen.vue';
import MessageView from './components/MessageView.vue';
import Plugins from './components/Plugins.vue';
import Save from './components/Save.vue';

const data = new Vue({
    data() {
        return {
            config: {},
            savableConfig: window.kiwiuser.savableConfig,
            show_advanced: false,
            HTML: '',
            iframe: null,
            iframeSnippet: '',
            saving: false,
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
        TabbedView,
    },
    data() {
        return {
            localData: data,
            kiwiInstanceURL: window.kiwiuser.kiwi_instance,
            customInstanceUrl: null,
            changeThrottleTimer: 0,
            tabName: '',
            settingsId: null,
            previewReady: false,
        };
    },
    watch: {
        tabName(val) {
            if (val === 'Startup Screen' || val === 'IRC Network') {
                this.kiwi.showStartup(true);
            } else {
                this.kiwi.showStartup(false);
            }
        },
    },
    created() {
        this.kiwi = new KiwiController();
        // Just for debugging
        window.app = this;

        if (!window.kiwiuser.api_endpoint) {
            const url = `${window.kiwiuser.kiwi_instance}static/config.json`;
            fetch(url)
                .then((r) => r.json())
                .then((json) => {
                    json.kiwiServer = '/webirc/kiwiirc/';
                    this.localData.originalConfig = json;
                });
        }
    },
    methods: {
        tabChanged(tab) {
            this.tabName = tab.header;
        },
        setConfig(opts) {
            if (opts && opts.reload) {
                const prevFocus = document.activeElement;
                this.kiwi.reloadKiwiUi();
                Vue.nextTick(() => {
                    // newer kiwi likes to steal focus on load
                    prevFocus.focus();
                });
            } else {
                // Just in case any of the change settings effect message, uncache all existing ones
                this.kiwi.uncacheMessages();

                this.kiwi.kiwi.themes.setTheme(this.localData.config.theme);
            }
        },
        createSnippets(id) {
            this.localData.iframeSnippet = `<iframe src="${this.kiwiInstanceURL}?settings=${id}" style="width:100%;height:680px;border:0;display:block"></iframe>`;
            this.localData.HTML = `<!DOCTYPE html><html><head><style>body{margin:0}</style></head><body>${this.localData.iframeSnippet}</body></html>`;
        },
        async save() {
            let url = '/save';
            if (this.settingsId) {
                url += `?${this.settingsId}`;
            }

            // Just get the aprts of the confif we're interested in
            const config = extractStructure(this.localData.config, this.localData.savableConfig);
            const postData = { config: JSON.stringify(config) };

            this.localData.saving = true;
            const res = await Api.instance().call(url).post(postData).json();
            this.settingsId = res.settings_id;
            this.createSnippets(this.settingsId);
            const instanceURL = new URL(this.kiwiInstanceURL);
            instanceURL.searchParams.set('settings', this.settingsId);
            this.customInstanceUrl = instanceURL.toString();
            this.localData.saving = false;
        },
        previewLoaded() {
            // only do this once
            if (this.previewReady) {
                return;
            }

            // iframe loaded but its possible kiwi hasnt loaded in it yet
            const c = () => {
                const win = this.$refs.previewFrame.contentWindow;
                if (!win || !win.kiwi || !win.kiwi.state || !win.kiwi.state.settings) {
                    setTimeout(c, 20);
                    return;
                }

                this.kiwi.setKiwiWindow(win);
                this.localData.config = win.kiwi.state.settings;
                this.previewReady = true;

                setTimeout(() => {
                    this.kiwi.fakeConnect();
                }, 200);
            };

            c();
        },
    },
};

</script>

<style>
    .hidden {
        display:none;
    }
    ul.tabs {
        margin-bottom: 0;
    }
    .tabs li:last-child {
        margin-left: 2em;
    }
    ul.tabs a {
        cursor: pointer;
    }
    .u-tabbed-content {
        padding-top: 1em;
        border-bottom: 3px solid #eaeaea;
        overflow-y: auto;
        background: #efefef;
    }
</style>
