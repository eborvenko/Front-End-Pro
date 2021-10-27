class Collection {
    static COMPLETED = 'completed';
    static PENDING = 'pending';

    #list = [];

    fetch() {
        return TodoAPI.getList().then((list) => {
            this.setList(list);

            return this.getList();
        });
    }

    toggle(id) {
        const todo = this.getItem(id);

        todo.status =
            todo.status === Collection.COMPLETED
                ? Collection.PENDING
                : Collection.COMPLETED;

        TodoAPI.update(id, todo);

        return Promise.resolve();
    }

    delete(id) {
        this.#list = this.#list.filter((item) => item.id !== +id);

        TodoAPI.delete(id);

        return Promise.resolve();
    }

    getItem(id) {
        return this.#list.find((item) => item.id === +id);
    }

    setList(list) {
        this.#list = list;
    }

    getList() {
        return this.#list;
    }

    addTask(item) {
        TodoAPI.create(item);

        return Promise.resolve();
    }
}
