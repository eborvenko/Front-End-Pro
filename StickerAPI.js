'use strict';

class StickerAPI {
    static URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

    static request(uri, method, data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }


    static getList() {
        return this.request('', 'GET')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error('Can not fetch list from API');
            })
            .then((data) => data);
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
            .then((res) => {
                if (!res.ok) {

                    throw new Error('Can not execute delete request on API');
                }
            });
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', { ...data, user_id: this.USER_ID })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return res.json().then((data) => {
                throw new Error(
                    'Can not completed list from API' +
                        JSON.stringify(data.data, null, 4)
                );
            });
        });
    }

    static create(data) {
        return this.request('', 'POST', {...data, user_id: this.USER_ID,})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(
                        'Can not create item on API:' +
                            JSON.stringify(data.data, null, 4))
                })
            });
    }
}
