/* eslint-disable vue/html-indent */
/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-extend-native */
/* eslint-disable no-underscore-dangle */
import isEqual from 'lodash/isEqual';
import MockTransport from './mock.transport';

const _ = {
    isEqual,
};

let Misc;
let Vue;

const configTemplates = {};

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }

    return false;
}

function applyConfig(config) {
    Misc.dedotObject(config);
    // if we have a config template apply that before other configs
    if (configTemplates[config.template]) {
        applyConfigObj(configTemplates[config.template], state.settings);
    }
    applyConfigObj(config, state.settings);
}

// Recursively merge an object onto another via Vue.$set
function applyConfigObj(obj, target) {
    _.each(obj, (val, key) => {
        if (typeof val === 'object') {
            if (typeof target[key] !== 'object') {
                // Create the correct type of object
                let newVal = _.isArray(val) ?
                    [] :
                    {};

                Vue.set(target, key, newVal);
            }
            applyConfigObj(val, target[key]);
        } else {
            Vue.set(target, key, val);
        }
    });
}
let state;

kiwi.plugin('previewPlugin', async(kiwi, log) => { /* eslint-disable-line no-undef */
    Misc = kiwi.require('helpers/Misc');
    const App = kiwi.require('components/App');

    state = kiwi.state;
    state.settings.startupOptions.state_key = false;
    state.user_settings = {};
    state.networks = [];

    Vue = kiwi.Vue;
    console.log("live preview plugin loaded", kiwi, state);
    let vueInstance = kiwi.Vue;
    if (getQueryVariable('settings_preview')) {
        setTimeout(() => {
            console.log("startup", document.querySelector('.kiwi-startup-common').__vue__);

            let net = state.addNetwork('Network', 'demo', {
                server: 'irc.example.com',
                port: 6667,
                tls: false,
                password: '',
                encoding: 'utf8',
                direct: false,
            });

            net.ircClient.connect({
                server: 'irc.example.com',
                port: 6667,
                tls: false,
                password: '',
                encoding: 'utf8',
                direct: false,
                transport: MockTransport,
            });
            net.ircClient.emit('connected');
            let buffer = state.addBuffer(net.id, '#example');
            state.addMessage(buffer, {
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at fermentum mi. Morbi id augue ac magna aliquam pretium. Phasellus erat lacus, facilisis eu velit non, tempor eleifend lectus.',
                nick: 'demo',
                time: Date.now(),
            });
            buffer.joined = true;
            state.setActiveBuffer(net.id, buffer.name);
        }, 200);
        let startupOptsCheck = null;
        // Listen for messages from parent window about config changes
        window.addEventListener('message', (event) => {
            console.log(event);
            if (!startupOptsCheck && event.data.previewConfig) {
                startupOptsCheck = { ...event.data.previewConfig.startupOptions };
            }
            if (event.data.previewConfig) {
                let configObj = event.data.previewConfig;
                if (_.isEqual(startupOptsCheck, configObj.startupOptions)
                    && configObj.startupScreen === state.settings.startupScreen) {
                    // Update settings only
                    if (configObj.theme !== state.setting('theme')) {
                        kiwi.themes.setTheme(configObj.theme);
                    }
                    if (configObj.buffers.messageLayout) {
                        state.setting('buffers.messageLayout', configObj.buffers.messageLayout);
                    }
                    applyConfig(configObj);
                    kiwi.state.getActiveBuffer()
                        .messagesObj
                        .messages.forEach((m) => { m.html = null; });
                } else if (vueInstance) {
                    // Destroy & recreate the root component to reload the app with new config
                    startupOptsCheck = { ...configObj.startupOptions };

                    applyConfig(configObj);
                    vueInstance = document.querySelector('body>div.kiwi-wrap').__vue__;
                    vueInstance.$destroy();
                    document.body.innerHTML = '<div id="app"></div>';
                    let i18 = vueInstance.$i18n;
                    vueInstance = new Vue({
                        el: '#app',
                        render: h => h(App),
                        i18n: i18,
                    });
                }
            } else if (event.data.showStartup != null) {
                document.querySelector('body>div.kiwi-wrap').__vue__.hasStarted = !event.data.showStartup;
            }
        });
    }
});
