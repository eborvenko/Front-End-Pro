class TodoListView {
    static TODO_ITEM_SELECTOR = '.todo-item';
    static DELETE_BTN_SELECTOR = '.delete-btn';
    static EDIT_BTN_SELECTOR = '.edit-btn';


    #listEl;
    #options;

    constructor(options) {
        this.#listEl = this.init();
        this.#options = options;
    }

    init() {
        return $(`<ul class="todo-list"></ul>`)
            .on('click', TodoListView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e))
            .on('click', TodoListView.EDIT_BTN_SELECTOR, (e) => this.onTodoListClick(e))
    }

    onTodoListClick(e) {
        const id = this.getTodoItemId(e.target);

        this.#options.onToggle(id);
    }

    onDeleteBtnClick(e) {
        const id = this.getTodoItemId(e.target);

        this.#options.onDelete(id);
    }

    getTodoItemId(el) {
        return el.closest(TodoListView.TODO_ITEM_SELECTOR)?.dataset.id;
    }

    appendTo($el) {
        $el.append(this.#listEl);
    }

    renderList(list) {
        const html = list.map((todo) => this.generateTodoHTML(todo)).join('');

        this.#listEl.html(html);
    }

    generateTodoHTML(todo) {
        const statusClass = todo.status === 'completed' ? 'done' : '';

        return `
        <li class="todo-item ${statusClass}" data-id='${todo.id}'>
            ${todo.title}
            <span class="edit-btn">✔</span>
            <span class="delete-btn">✘</span>
        </li>
        `;
    }

    deleteElement(id) {
        this.#listEl.find(`[data-id="${id}"]`).remove();
    }

    renderElement(todo) {
        const html = this.generateTodoHTML(todo);

        this.#listEl.find(`[data-id="${todo.id}"]`).replaceWith(html);
    }
}
