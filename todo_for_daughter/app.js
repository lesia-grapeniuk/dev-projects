import {
  todoInput,
  addTodoButton,
  todosContainer,
  LOCAL_TODOS,
} from "./src/modules/global-variables.js";

import { setLocalStorage } from "./src/modules/local-storage-api.js";

let todos = JSON.parse(localStorage.getItem(LOCAL_TODOS)) ?? [];

generateLocalTodos();

function generateLocalTodos() {
  todos.forEach((item) => {
    const newTodo = createTodo(item);
    addStyles(newTodo);
    todosContainer.append(newTodo);
  });

  // todosContainer.append(...todosText)
}

// console.log(todosText);

addTodoButton.addEventListener("click", addTodo);

function createTodo(todo) {
  const todoContainer = document.createElement("div");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");
  const btnDelete = document.createElement("button");
  const btnEditText = document.createElement("button");

  btnDelete.classList.add("btn-delete");
  btnEditText.classList.add("btn-edit-text");

  text.textContent += todo.text;

  checkbox.setAttribute("type", "checkbox");

  todos.forEach((el) => {
    if (el.id === todo.id) {
      checkbox.checked = el.isDone;
    }
  });

  checkbox.addEventListener("click", (event) => {
    text.style.textDecoration = event.target.checked ? "line-through" : "none";

    text.style.textDecorationColor = event.target.checked ? "#ca256f" : "none";

    todo.isDone = event.target.checked;

    setLocalStorage(todos, LOCAL_TODOS);
  });

  btnDelete.addEventListener("click",removeTodo.bind(this, todoContainer, todo.id));
  btnEditText.addEventListener("click", (event) => {
    const btnConfirm = document.createElement("button");
    const editInput = document.createElement("input");
    const currentText = document.createElement("span");

    currentText.textContent = text.textContent;

    checkbox.style.visibility = "hidden";
    btnDelete.style.visibility = "hidden";

    todoContainer.replaceChild(btnConfirm, btnEditText);
    todoContainer.replaceChild(editInput, text);

    editInput.value = text.textContent;

    editInput.classList.add("editInput");
    btnConfirm.classList.add("btn-confirm");

    const paramsForEdit = {
      text,
      todoContainer,
      checkbox,
      btnDelete,
      btnConfirm,
      editInput,
      btnEditText,
      todo,
    };

    btnConfirm.addEventListener("click",confirmEditText.bind(this, paramsForEdit));
    editInput.addEventListener("keydown",addTouchEditedInput.bind(this, paramsForEdit));
  });

  text.style.textDecoration = todo.isDone ? "line-through" : "none";
  text.style.textDecorationColor = todo.isDone ? "#ca256f" : "none";

  todoContainer.append(checkbox);
  todoContainer.append(text);
  todoContainer.append(btnEditText);
  todoContainer.append(btnDelete);

  return todoContainer;
}

function removeTodo(todoBlock, idToDelete) {
  todoBlock.remove();
  console.log(todos, "before");
  todos = todos.filter((element) => !(element.id === idToDelete));
  console.log(todos, "after");

  // const todosUpdatedStringify = JSON.stringify(todos);
  // localStorage.setItem(LOCAL_TODOS, todosUpdatedStringify);
  setLocalStorage(todos, LOCAL_TODOS);
}

function addStyles(todo, span, checkbox) {
  todo.classList.add("todos-container__block");
  // span.classList.add()
}

function addTodo() {
  if (todoInput.value === "" || todos.length >= 8) {
    return;
  }

  let uniqId = null;
  if (todos.length) {
    uniqId = todos[0].id + 1;
  } else {
    uniqId = 0;
  }

  //const uniqId = todos[0].id ? todos[0].id + 1 : 0;
  const todoData = {
    text: todoInput.value,
    isDone: false,
    id: uniqId,
  };

  const newTodo = createTodo(todoData);
  addStyles(newTodo);

  todosContainer.prepend(newTodo);

  todos.unshift(todoData);

  // const todosStringifyed = JSON.stringify(todos);
  // localStorage.setItem(LOCAL_TODOS, todosStringifyed);
  setLocalStorage(todos, LOCAL_TODOS);

  clearInput();
}

function clearInput() {
  todoInput.value = "";
}

// add touch input

todoInput.addEventListener("keydown", addTouchInput);

function addTouchInput(event) {
  event.key === "Enter" && addTodo();
}

function addTouchEditedInput(param, event) {
  event.key === "Enter" && confirmEditText(param);
}

function confirmEditText(param) {
  const {
    text,
    todoContainer,
    checkbox,
    btnConfirm,
    editInput,
    btnDelete,
    btnEditText,
    todo,
  } = param;

  text.textContent = editInput.value;

  todoContainer.replaceChild(text, editInput);
  todoContainer.replaceChild(btnEditText, btnConfirm);

  checkbox.style.visibility = "visible";
  btnDelete.style.visibility = "visible";
  btnConfirm.style.display = "none";
  btnEditText.style.display = "block";

  const currentTodo = todos.find((item) => todo.id === item.id);
  currentTodo.text = text.textContent;
  setLocalStorage(todos, LOCAL_TODOS);
}