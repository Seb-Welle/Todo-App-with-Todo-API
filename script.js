const addTodoBtn = document.querySelector("#new-todo-btn");
const newTodoInput = document.querySelector("#new-todo");
const todoList = document.querySelector("#list");
let todos = [];

function loadTodos() {
  fetch("http://localhost:4730/todos")
    .then((response) => response.json())
    .then((todosFromApi) => {
      console.log(todosFromApi);
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

    todoList.appendChild(newLi);
  });
}

addTodoBtn.addEventListener("click", () => {
  const newTodoText = newTodoInput.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then(response.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

loadTodos();
