import ApiContext from './ApiContext';

let existingInstance = null;

export default class Api {
    static instance() {
        existingInstance = existingInstance || new Api();
        return existingInstance;
    }

    constructor() {
        this.username = window.kiwiuser.username;
        this.endpoint = window.kiwiuser.api_endpoint;
        // this.endpoint = 'http://kiwiirc.vm';
        this.token = window.kiwiuser.token;
    }

    fetch(path, _headers, _method, _data) {
        let headers = { 'x-auth-token': this.token, ..._headers };

        let url = this.endpoint;
        if (path[0] !== '/') {
            url += '/';
        }
        url += path;

        let body;
        if (_method === 'post' && _data) {
            body = new FormData();
            // this was for ... in
            Object.keys(_data).forEach((key) => {
                body.append(key, _data[key]);
            });
        }

        return fetch(url, {
            method: _method || 'get',
            mode: 'cors',
            headers,
            body,
        });
    }

    call(url) {
        let ctx = new ApiContext(this);
        if (url) {
            ctx.url(url);
        }

        return ctx;
    }
}
