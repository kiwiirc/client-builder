'use strict';

/**
 * Fake transport
 */

const EventEmitter = require('eventemitter3');

export default class Connection extends EventEmitter {
    constructor(options) {
        super();
    }

    isConnected() {
        return this.connected;
    }

    writeLine(line, cb) {
    }

    debugOut(out) {
        this.emit('debug', out);
    }

    connect() {
        this.onSocketFullyConnected();
    }

    // Called when the socket is connected and ready to start sending/receiving data.
    onSocketFullyConnected() {
        this.connected = true;
        this.emit('open');
        let lines = [
            ':irc.example.com 001 demo :Welcome to the Example IRC Network demo!demo@example.com',
            ':irc.example.com 332 demo #example :This is a fake IRC channel to showcase different options',
            ':demo JOIN #example',
            ':testuser JOIN #example',
            ':testuser!test@example.com PRIVMSG #example :beep ✔ :)',
            ':testuser!test@example.com PRIVMSG #example :Markdown example. *bold* or **italic** or _underline_  ✔ :)',
        ];
        lines.forEach((line) => {
            this.emit('line', line);
        });
    }

    onSocketClose() {
    }

    onSocketMessage(data) {
    }

    disposeSocket() {
    }

    close() {
    }

    setEncoding(encoding) {
    }
};
