const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(e) {
    e.preventDefault();

    const todoDiv = document.createElement('div');
    const newTodo = document.createElement('li');
    const completedButton = document.createElement('button');
    const trashButton = document.createElement('button');

    todoDiv.classList.add('todo');
    newTodo.classList.add('todo-item');
    completedButton.classList.add('complete-btn');
    trashButton.classList.add('trash-btn');
    
    newTodo.innerText = todoInput.value;

    if (!todoInput.value){
        return alert('fill in the field');
    }   

    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);    

    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.remove();
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}