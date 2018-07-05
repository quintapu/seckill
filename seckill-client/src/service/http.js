import axios from 'axios';

export class Http {
    _httpClient = null;

    constructor() {
        this._httpClient = axios.create({
            headers: {
                'Content-Type': 'application/json; charset = UTF-8'
            },
            timeout: 30000,
            withCredentials: true,
            responseType: 'json',
            validateStatus: status => status >= 200 && status < 300
        });
    }

    async get(url) {
        const result = await this._httpClient.get(url);
        return result.data;
    }

    async post(url, data){
        const result = await this._httpClient.post(url, data);
        return result.data;
    }

}