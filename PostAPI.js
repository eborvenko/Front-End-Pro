'use strict';

class PublicAPI {
    static TOKEN =
        '0ff22eed2f054667c237f86184297f6685c08d981cc8776ec64798fa22fceb33';
    static URL = 'https://gorest.co.in/public/v1/posts';
    static USER_ID = 431;

    static request(uri = '', method = 'GET', data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${this.TOKEN}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static getList() {
        return this.request(`?user_id=${this.USER_ID}`)
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static create(data) {
        return this.request('', 'POST', { ...data, user_id: this.USER_ID })
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', data)
            .then((res) => res.json())
            .then((data) => data.data);
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE');
    }
}
