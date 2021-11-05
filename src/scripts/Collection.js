import API from "./api"

class Collection {
    constructor() {
        this._list = [];
    }

    fetch() {
        return API.getList().then((data) => this.setData(data));
    }

    setData(data) {
        this._list = data;
    }

    getList() {
        return this._list;
    }

    delete(id) {
        this._list = this._list.filter((item) => item.id !== id);

        API.delete(id);

        return Promise.resolve();
    }

    update(id, data) {
        const item = this.get(id);
        item.marks = data;

        return API.update(id, item).then((item) => {
            this._list = this._list.map((el) => (el.id != item.id ? el : item));

            return item;
        });
    }

    get(id) {
        return this._list.find((item) => item.id === id);
    }

    save(el) {
        return API.create(el).then((res) => {
            this._list.push(res);

            return res;
        });
    }
}

export default Collection;