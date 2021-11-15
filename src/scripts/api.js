import { STUDENT_URL } from './const';

class API {
    // static STUDENT_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students';

    static request(uri, method, data) {
        return fetch(`${STUDENT_URL}${uri}`, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static async getList() {
        const res = await this.request('', 'GET');
        return await res.json();
    }

    static async delete(id) {
        const res = await this.request(`/${id}`, 'DELETE');
        return await res.json();
    }

    static async create(data) {
        const res = await this.request('', 'POST', { ...data });
        return await res.json();
    }

    static async update(id, data) {
        const res = await this.request(`/${id}`, 'PUT', { ...data });
        return await res.json();
    }
}

export default API;
