class Controller {
    #$container;

    constructor($container) {
        this.#$container = $container;

        this.todoCollection = new Collection();
        this.todoListView = new TodoListView({
            onToggle: (id) => this.onToggleItem(id),
            onDelete: (id) => this.onDeleteItem(id),
        });

        this.todoFormView = new TodoFormView({
            onAddTask: (item) => this.onAddItem(item)               
        });

        this.todoListView.appendTo(this.#$container);
        this.todoFormView.appendTo(this.#$container);

        this.getList()
    }

    getList() {
        this.todoCollection
            .fetch()
            .then(list => this.renderList());
    }

    onToggleItem(id) {
        this.todoCollection
            .toggle(id)
            .then(() => this.renderElement(id))
    }

    onDeleteItem(id) {
        this.todoCollection
            .delete(id)
            .then(() => this.deleteElement(id))
    }

    onAddItem(item) {
        this.todoCollection
            .addTask(item)
            .then(() => this.getList())
            .then(() => this.todoFormView.clearInput())
    }

    renderList() {
        this.todoListView.renderList(this.todoCollection.getList());
    }

    renderElement(id) {
        this.todoListView.renderElement(this.todoCollection.getItem(id));
    }

    deleteElement(id) {
        this.todoListView.deleteElement(id);
    }
}
