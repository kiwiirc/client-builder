import KiwiMockTransport from './KiwiMockTransport';

export default class KiwiController {
    constructor(kiwiWindow) {
        if (kiwiWindow) {
            this.setKiwiWindow(kiwiWindow);
        }
    }

    setKiwiWindow(kiwiWindow) {
        this.window = kiwiWindow;
        this.kiwi = this.window.kiwi;
        this.Vue = this.kiwi.Vue;
    }

    reloadKiwiUi() {
        if (!this.kiwi) return;

        let kiwiApp = this.window.document.querySelector('.kiwi-wrap').__vue__;
        kiwiApp.$destroy();
        this.window.document.body.innerHTML = '<div id="app"></div>';
        let i18n = kiwiApp.$i18n;
        kiwiApp = new this.Vue({
            el: '#app',
            render: h => h(this.kiwi.require('components/App')),
            i18n: i18n,
        });
        kiwiApp.$nextTick(() => this.fakeConnect());
    }

    fakeConnect() {
        if (!this.kiwi) return;

        let state = this.kiwi.state;

        // Remove all networks then add an example
        state.networks.forEach(n => state.removeNetwork(n.id));

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
            transport: KiwiMockTransport,
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
    }

    uncacheMessages() {
        // Remove the cached .html of messages so they get regenerated on render
        this.kiwi.state.getActiveBuffer()
            .messagesObj
            .messages.forEach((m) => {
                m.html = '';
                m.hasRendered = false;
            });
    }

    showStartup(startup) {
        if (!this.kiwi) return;
        const kiwiWrap = this.window.document.querySelector('.kiwi-wrap');
        if (kiwiWrap) {
            kiwiWrap.__vue__.hasStarted = !startup;
        }
    }
}
