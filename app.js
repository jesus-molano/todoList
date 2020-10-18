// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//FUNCTIONS
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class= "fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class= "fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPED TO LIST
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check -- Hey Do I already have thing in there
    let todos = checkTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos = checkTodos();
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class= "fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //CHECK TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class= "fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPED TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = checkTodos();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodos() {
    if (localStorage.getItem("todos") === null) {
        return (todos = []);
    } else {
        return (todos = JSON.parse(localStorage.getItem("todos")));
    }
}
