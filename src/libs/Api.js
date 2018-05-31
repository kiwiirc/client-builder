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
        let headers = Object.assign({
            'x-auth-token': this.token,
        }, headers);

        let url = this.endpoint;
        if (path[0] !== '/') {
            url += '/';
        }
        url += path;

        let body = undefined;
        if (_method === 'post' && _data) {
            body = new FormData();
            for (let prop in _data) {
                body.append(prop, _data[prop]);
            }
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

class ApiContext {
    constructor(rootApi) {
        this._api = rootApi;
        this._method = 'get';
        this._headers = {};
        this._url = '';
        this._data = {};
    }

    json() {
        return this._api.fetch(this._url, this._headers, this._method, this._data).then(response => response.json());
    }

    fetch() {
        return this._api.fetch(this._url, this._headers, this._method, this._data);
    }

    url(url) {
        this._url = url;
        return this;
    }

    method(method) {
        this._method = method;
        return this;
    }

    post(data) {
        this._method = 'post';
        if (data) {
            this._data = data;
        }
        return this;
    }

    headers(headers) {
        this._headers = headers;
        return this;
    }

    header(header, val) {
        this._headers[header] = val;
        return this;
    }

    data(data) {
        this._data = data;
        return this;
    }
}
