import { drawFilters } from "./filters.js";
import { FILTERS } from "./app_constants.js";

const $INPUT_CONTAINER = document.querySelector(".todo-input-block");
const $MAIN_INPUT = document.querySelector(".todo-input-block__input");
const $ADD_BUTTON = document.querySelector(".todo-input-block__button");
const $TODO_LIST = document.querySelector(".list-container");

const todos = [];
let currentFilter = FILTERS.all.value;

const getFilteredTodos = () => {
  switch (currentFilter) {
    case FILTERS.completed.value:
      return todos.filter((todoItem) => todoItem.isComplete);
    case FILTERS.uncompleted.value:
      return todos.filter((todoItem) => !todoItem.isComplete);
    default:
      return todos;
  }
};

const changeFilter = (filterType) => {
  currentFilter = filterType;
  renderTodoList();
};

const $FILTER_BLOCK = drawFilters(FILTERS, changeFilter);
$INPUT_CONTAINER.append($FILTER_BLOCK);

const addTodo = () => {
  const text = $MAIN_INPUT.value.trim();
  if (text === "") {
    return;
  }

  const newTodoObj = {
    text,
    id: crypto.randomUUID(),
    isComplete: false,
  };
  todos.push(newTodoObj);
  $MAIN_INPUT.value = "";
  renderTodoList();
};
const handleTodoInputKeyDown = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  addTodo();
  $MAIN_INPUT.focus();
};
const createTodoNodeElement = (todoItem) => {
  const $todoItem = document.createElement("li");
  $todoItem.classList.add("list-container__item");

  const $todoCheckbox = document.createElement("input");
  $todoCheckbox.type = "checkbox";
  $todoCheckbox.checked = todoItem.isComplete;
  $todoCheckbox.addEventListener("click", () => {
    checkTodo(todoItem.id);
  })

  const $todoContent = document.createElement("span");
  $todoContent.innerText = todoItem.text;

  const $todoRemoveButton = document.createElement("button");

  $todoRemoveButton.innerText = "Delete";
  $todoRemoveButton.addEventListener("click", () => {
    removeTodo(todoItem.id);
  });

  $todoItem.append($todoCheckbox, $todoContent, $todoRemoveButton);
  return $todoItem;
};

const renderTodoList = () => {
  const todoList = getFilteredTodos();
  $TODO_LIST.innerHTML = "";
  todoList.forEach((todoItem) => {
    const $todoItem = createTodoNodeElement(todoItem);
    $TODO_LIST.append($todoItem);
  });
};

const removeTodo = (id) => {
  const index = todos.findIndex((todoItem) => todoItem.id === id);
  if (index === -1) {
    return;
  }
  todos.splice(index, 1);
  renderTodoList();
};

const checkTodo = (id) => {
  const index = todos.findIndex((todoItem) => todoItem.id === id);
  if (index === -1) {
    return;
  }
  todos[index].isComplete = !todos[index].isComplete;
  renderTodoList();
}

$ADD_BUTTON.addEventListener("click", addTodo);
$MAIN_INPUT.addEventListener("keyup", handleTodoInputKeyDown);
