const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const template = document.querySelector('#listTemplate').innerHTML;

todoButton.addEventListener('click', onTodoButtonClick);
todoList.addEventListener('click', onTodoListClick);

function onTodoButtonClick(e) {
    e.preventDefault();

    if (!todoInput.value){
        alert('fill in the field');
        return false;
    } 

    addTodo(todoInput);
    resetTodoInput();    
}

function addTodo(todoInput) {
    const todoHTML = template.replace('{{text}}', todoInput.value);

    todoList.insertAdjacentHTML('beforeend', todoHTML);
}

function  resetTodoInput() {
    todoInput.value = '';
}

function onTodoListClick(e) {
    const item = e.target;

    if (item.classList.contains('trash-btn')) {
        item.closest('.todo').remove();
    }

    if (item.classList.contains('complete-btn')){
        const todo = item.parentElement;
        
        todo.classList.toggle('completed');
    }
}