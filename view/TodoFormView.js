class TodoFormView {
    static BTN_ADD = '.todo-button';
    static ITEM_INPUT = '.todo-input';

    #formEl;
    #param;

    constructor(param) {
        this.#formEl = this.init();
        this.#param = param;
    }

    init() {
        return $(
            `<form class="todo-form">
                <input type="text" class="todo-input"/>
                <button class="todo-button">Add Task</button>
            </form>`
        ).on('click', TodoFormView.BTN_ADD, (e) => this.onAddButtonClick(e));
    }

    appendTo($el) {
        $el.append(this.#formEl);
    }

    onAddButtonClick(e) {
        e.preventDefault();

        const item = {
            title: $(TodoFormView.ITEM_INPUT).val(),
            status: 'pending',
        };
        
        this.#param.onAddTask(item);
    }

    clearInput() {
        $(TodoFormView.ITEM_INPUT).val('');
    }
}
