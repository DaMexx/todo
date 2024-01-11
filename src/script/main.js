import { drawFilters } from "./filters.js";
import { FILTERS } from "./appConstants.js";

const $inputContainer = document.querySelector(".todo-input-block");
const $mainInput = document.querySelector(".todo-input-block__input");
const $addButton = document.querySelector(".todo-input-block__button");
const $todoList = document.querySelector(".list-container");

const todos = [];

const currentFilter = {
  value: FILTERS.all.value,
  getCurrentFilter() {
    const filterValue = this.value;
    return filterValue;
  },
  setFilterType(filterType) {
    this.value = filterType;
  },
};

const getFilteredTodos = () => {
  const filter = currentFilter.getCurrentFilter();
  return todos.filter((todoItem) => {
    if (filter === FILTERS.completed.value) {
      return todoItem.isComplete;
    }
    if (filter === FILTERS.uncompleted.value) {
      return !todoItem.isComplete;
    }
    return true;
  });
};

const changeFilter = (filterType) => {
  currentFilter.setFilterType(filterType);
  renderTodoList();
};

const $FILTER_BLOCK = drawFilters(FILTERS, changeFilter);
$inputContainer.append($FILTER_BLOCK);

const addTodo = () => {
  const text = $mainInput.value.trim();
  if (text === "") {
    return;
  }

  const newTodoObj = {
    text,
    id: crypto.randomUUID(),
    isComplete: false,
  };
  todos.push(newTodoObj);
  $mainInput.value = "";
  renderTodoList();
};

const handleTodoInputKeyDown = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  addTodo();
  $mainInput.focus();
};

const createTodoNodeElement = (todoItem) => {
  const $todoItem = document.createElement("li");
  $todoItem.classList.add("list-container__item");
  $todoItem.classList.add("item");

  if (todoItem.isComplete) {
    $todoItem.classList.add("item--checked");
  }

  const $todoCheckbox = document.createElement("input");
  $todoCheckbox.type = "checkbox";
  $todoCheckbox.checked = todoItem.isComplete;
  $todoCheckbox.addEventListener("click", () => {
    checkTodo(todoItem.id);
  });

  const $todoContent = document.createElement("span");
  $todoContent.classList.add("item__text");
  $todoContent.innerText = todoItem.text;

  const $todoRemoveButton = document.createElement("button");
  $todoRemoveButton.innerHTML = "&#10060";
  $todoRemoveButton.classList.add("item__remove-button");

  $todoRemoveButton.addEventListener("click", () => {
    removeTodo(todoItem.id);
  });

  $todoItem.append($todoCheckbox, $todoContent, $todoRemoveButton);
  return $todoItem;
};

const renderTodoList = () => {
  const todoList = getFilteredTodos();
  $todoList.innerHTML = "";
  todoList.forEach((todoItem) => {
    const $todoItem = createTodoNodeElement(todoItem);
    $todoList.append($todoItem);
  });
};

const removeTodo = (id) => {
  const { index } = findTodoInList(id);

  todos.splice(index, 1);
  renderTodoList();
};

const checkTodo = (id) => {
  const { todoItem } = findTodoInList(id);
  todoItem.isComplete = !todoItem.isComplete;
  renderTodoList();
};

const findTodoInList = (id) => {
  const index = todos.findIndex((todoItem) => todoItem.id === id);
  if (index === -1) {
    return;
  }

  const todoItem = todos[index];
  return { index, todoItem };
};

$addButton.addEventListener("click", addTodo);
$mainInput.addEventListener("keyup", handleTodoInputKeyDown);
