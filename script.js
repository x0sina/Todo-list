//Selectors 

const todoInput = document.querySelector(".newtodo");
const todoButton = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo");
const todoFilter = document.querySelector(".selected");

//Event Listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDeleted);
todoFilter.addEventListener("click", filterTasks);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//Functions

function addTodo(e) {
    e.preventDefault();
    //Create li Element
    const todoLi = document.createElement("li");
    todoLi.innerHTML = `
    <div class="itemClick">
        <div></div>
        <h2>
            ${todoInput.value}
        </h2>
    </div>
    <span>
        <img class="editico" src="./ico/edit.svg" alt="">
        <img class="delico" src="./ico/del.svg" alt="">
    </span>`;
    //Add to DOM
    todoList.appendChild(todoLi);
    //Reset todoInput
    saveLocalTodos(todoInput.value);
    updateStatus();
    todoInput.value = '';
}

function checkDeleted(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    if (classList[0] === "delico") {
        removeLocalTodos(item.parentElement.parentElement);
        item.parentElement.parentElement.remove();
    }
    else if (classList[0] === "itemClick") {
        item.classList.toggle("done");
        updateStatus();
    }
    else if (item.parentElement.classList[0] === "itemClick") {
        item.parentElement.classList.toggle("done");
        updateStatus();
    }
}

function filterTasks(e) {
    const todos = [...todoList.children];
    console.log(e.target.value);
    todos.forEach((item) => {
        console.log(item.firstElementChild);
        switch (e.target.value) {
            case 'All':
                item.style.display = "flex";
                break;
            case 'Completed':
                if (item.firstElementChild.classList.contains("done")) item.style.display = "flex"
                else item.style.display = "none";
                break;
            case 'UnCompleted':
                if (!item.firstElementChild.classList.contains("done")) item.style.display = "flex"
                else item.style.display = "none";
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    const newTodo = { name: todo, status: "pending" }
    savedTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    updateStatus();
}

function getLocalTodos() {
    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    savedTodos.forEach((todo) => {
        const todoLi = document.createElement("li");
        if (todo.status === "pending") {
            todoLi.innerHTML = `
    <div class="itemClick">
        <div></div>
        <h2>
            ${todo.name}
        </h2>
    </div>
    <span>
        <img class="editico" src="./ico/edit.svg" alt="">
        <img class="delico" src="./ico/del.svg" alt="">
    </span>`;
        }
        else {
            todoLi.innerHTML = `
    <div class="itemClick done">
        <div></div>
        <h2>
            ${todo.name}
        </h2>
    </div>
    <span>
        <img class="editico" src="./ico/edit.svg" alt="">
        <img class="delico" src="./ico/del.svg" alt="">
    </span>`;
        }
        //Add to DOM
        todoList.appendChild(todoLi);
    })
}

function removeLocalTodos(todo) {
    const toDeleteTodo = todo.children[0].children[1].innerText;
    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    const filtredTodos = savedTodos.filter((item) => {
        return item.name != toDeleteTodo;
    })
    localStorage.setItem("todos", JSON.stringify(filtredTodos));
}

function updateStatus() {
    let savedTodos = [];
    const list = [...todoList.children];
    // console.log ([...list.children]);
    list.forEach((item) => {
        const classList = [...item.children[0].classList];
        if (classList.includes("done")) {
            console.log([...item.children[0].classList]);
            savedTodos.push({ name: item.children[0].children[1].innerText, status: "done" });
        } else {
            savedTodos.push({ name: item.children[0].children[1].innerText, status: "pending" });
        }
    })
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}
