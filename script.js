const addTodoBtn = document.querySelector("#new-todo-btn");
const removeDoneBtn = document.querySelector("#remove-done-btn");
const newTodoInput = document.querySelector("#new-todo");
const todoList = document.querySelector("#list");
let todos = [];

function loadTodos() {
  fetch("http://localhost:3000/todos/")
    .then((response) => response.json())
    .then((todosFromApi) => {
      //console.log(todosFromApi);
      todos = todosFromApi;
      renderTodos();
    });
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todos) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(todos.description);
    newLi.appendChild(text);

    newLi.setAttribute("data-id", todos.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todos.done;
    newLi.appendChild(checkbox);

    todoList.appendChild(newLi);
  });
}

todoList.addEventListener("change", (e) => {
  //String zu Number konvertieren!
  const todoId = Number(e.target.parentElement.dataset.id);
  const todoDescription = todos.find((todo) => todo.id === todoId).description;
  console.log(todoDescription);
  const todoCheckboxChecked = e.target.checked;

  const updatedTodo = {
    description: todoDescription,
    done: todoCheckboxChecked,
  };

  fetch("http://localhost:3000/todos/" + todoId, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedTodo),
  }).then(() => loadTodos());
});

addTodoBtn.addEventListener("click", () => {
  const newTodoText = newTodoInput.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };
  fetch("http://localhost:3000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

removeDoneBtn.addEventListener("click", () => {
  todos.forEach((todos) => {
    if (todos.done) {
      fetch("http://localhost:3000/todos/" + todos.id, {
        method: "DELETE",
      });
    }
  });
  loadTodos();
});

loadTodos();
