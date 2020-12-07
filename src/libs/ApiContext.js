export default class ApiContext {
    constructor(rootApi) {
        this._api = rootApi;
        this._method = 'get';
        this._headers = {};
        this._url = '';
        this._data = {};
    }

    json() {
        return this._api.fetch(this._url, this._headers, this._method, this._data)
            .then(response => response.json());
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
