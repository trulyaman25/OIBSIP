document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    loadTodos();

    addBtn.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            const todoItem = createTodoElement(todoText);

            todoList.appendChild(todoItem);

            saveTodos();

            todoInput.value = "";
            todoInput.focus();
        }
    }

    function createTodoElement(todoText) {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");

        const todoTextSpan = document.createElement("span");
        todoTextSpan.classList.add("todo-text");
        todoTextSpan.textContent = todoText;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = '<lord-icon src="https://cdn.lordicon.com/ylvuooxd.json" trigger="hover" state="hover-line" style="width:40px; height:40px;"></lord-icon>';
        editBtn.addEventListener("click", () => {
            const newTodoText = prompt("Edit your task:", todoText);
            if (newTodoText !== null && newTodoText.trim() !== "") {
                todoTextSpan.textContent = newTodoText.trim();
                saveTodos();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style="width:35px;height:35px" colors="primary:#ee6d66"></lord-icon>';
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(todoItem);
            saveTodos();
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(buttonContainer);

        return todoItem;
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo-item .todo-text").forEach((todoTextSpan) => {
            todos.push(todoTextSpan.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach((todoText) => {
            const todoItem = createTodoElement(todoText);
            todoList.appendChild(todoItem);
        });
    }
});
