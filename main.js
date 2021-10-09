const SELECTOR = Object.freeze({
    INPUT:          '.todo-input',
    ADD_BUTTON:     '.todo-button',
    LIST:           '.todo-list',
    ITEM_BOX:       '.todo-box',
    LIST_TEMPLATE:  '#listTemplate',
    LOADING:        '#loading',
    ERROR:          '#error',
});

const CLASS = Object.freeze({
    BTN_TRASH:      'trash-btn',
    BTN_COMPLETE:   'complete-btn',
    COMPLETED:      'completed',
    HIDE:           'hide',
});

const todoInput =   document.querySelector(SELECTOR.INPUT);
const todoButton =  document.querySelector(SELECTOR.ADD_BUTTON);
const todoList =    document.querySelector(SELECTOR.LIST);
const loading =     document.querySelector(SELECTOR.LOADING);
const error =       document.querySelector(SELECTOR.ERROR);
const todoHTML =    document.querySelector(SELECTOR.LIST_TEMPLATE).innerHTML;

todoButton.addEventListener('click', onAddTodoButtonClick);
todoList.addEventListener('click', onTodoListClick);

init();

function init() {
    toggleLoading();

    TodoAPI
        .getList()
        .then(addTodoList)
        .catch(handleError)
        .finally(toggleLoading);
}

function onAddTodoButtonClick(e) {
    e.preventDefault();

    const todoItem = getTodo();

    if (!isTodoValid(todoItem)) {
        alert('fill in the field');

        return;
    }

    addTodo(todoItem);
    resetTodoInput();
}

function onTodoListClick(e) {
    const todoEl = getTodoElement(e.target);
    const classList = e.target.classList;

    if (e.target.classList.contains(CLASS.BTN_TRASH)) {
        return removeTodo(todoEl);
    }

    if (classList.contains(CLASS.BTN_COMPLETE)) {
        return completeTodo(todoEl);
    }
}

function getTodoElement(target) {
    return target.closest(SELECTOR.ITEM_BOX);
}

function getTodo() {
    return {
        title: todoInput.value,
        status: 'pending',
    };
}

function isTodoValid(todoItem) {
    return todoItem && todoItem.title && todoItem.title.length >= 3;
}

function addTodoList(list) {
    const html = list.map((todoItem) => getTodoHTML(todoItem)).join('');

    todoList.innerHTML = html;
}

function addTodo(todoInput) {
    TodoAPI
        .create(todoInput)
        .then((data) => data.id) //
        .then(() => TodoAPI.getList())
        .then(addTodoList)
        .catch(handleError)
}

function getTodoHTML(todoItem) {
    return todoHTML
        .replace(
            '{{completedClass}}',
            todoItem.status === 'completed' ? CLASS.COMPLETED : ''
        )
        .replace('{{text}}', todoItem.title)
        .replace('{{todoId}}', todoItem.id)
        .replace('{{status}}', todoItem.status);
}

function removeTodo(item) {
    item.remove();

    TodoAPI
        .delete(+item.dataset.id)
        .catch(handleError);
}

function completeTodo(item) {
    status = item.dataset.status === 'completed' ? 'pending' : 'completed';

    item.classList.toggle(CLASS.COMPLETED);

    TodoAPI
        .update(+item.dataset.id, { status })
        .catch(handleError)
}

function resetTodoInput() {
    todoInput.value = '';
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}

function handleError(err) {
    error.textContent = err.message;
    setTimeout(() => (err.textContent = ''), 5000);
}
