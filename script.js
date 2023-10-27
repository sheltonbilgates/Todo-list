const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric"
});

document.getElementById("todaydate").textContent = today;

function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  const todoList = JSON.parse(localStorage.getItem("todos")) || [];

  todoList.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item p-3";

    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input me-1";
    checkbox.id = `todo-${index}`;
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        label.innerHTML = `<strike>${todo.text}</strike>`;
      } else {
        label.innerHTML = todo.text;
      }
      saveTodos();
    });

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = `todo-${index}`;
    if (todo.completed) {
      label.innerHTML = `<strike>${todo.text}</strike>`;
    } else {
      label.textContent = todo.text;
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    todoListElement.appendChild(listItem);
  });
}

function saveTodos() {
  const todoList = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  ).map((checkbox, index) => ({
    text: checkbox.nextSibling.textContent,
    completed: checkbox.checked
  }));

  localStorage.setItem("todos", JSON.stringify(todoList));
}

renderTodos();

const todoForm = document.getElementById("form");
const todoInput = document.getElementById("input");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  const todoListElement = document.getElementById("todo-list");

  const listItem = document.createElement("li");
  listItem.className = "list-group-item p-3";

  const checkbox = document.createElement("input");
  checkbox.className = "form-check-input me-1";
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.textContent = todoText;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      label.classList.add("completed");
    } else {
      label.classList.remove("completed");
    }
    saveTodos();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(label);

  todoListElement.appendChild(listItem);

  todoInput.value = "";
  todoInput.focus();

  saveTodos();
});

const clearAllButton = document.getElementById("clear-all");
clearAllButton.addEventListener("click", () => {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  localStorage.removeItem("todos");
});
