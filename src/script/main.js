const $MAIN_INPUT = document.querySelector(".todo-input-block__input");
const $ADD_BUTTON = document.querySelector(".todo-input-block__button");
const $TODO_LIST = document.querySelector(".list-container");

const toDos = [];
const addTodo = () => {
  if ($MAIN_INPUT.value === "") {
    return;
  }
  const text = $MAIN_INPUT.value;

  const newTodoObj = {
    text,
    id: crypto.randomUUID(),
    isComplete: true,
  };
  toDos.push(newTodoObj);
  $MAIN_INPUT.value = "";
  render();
};
const handleInputAddTodo = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  addTodo();
  $MAIN_INPUT.focus();
};
const createTodoNodeElement = (todoItem) => {
  const $LI = document.createElement("li");
  $LI.classList.add("list-container__item");

  const $CHECKBOX = document.createElement("input");
  $CHECKBOX.type = "checkbox";
  $CHECKBOX.checked = todoItem.isComplete;
  const $SPAN = document.createElement("span");
  $SPAN.innerText = todoItem.text;

  const $DELETE_BUTTON = document.createElement("button");

  $DELETE_BUTTON.innerText = "Delete";
  $DELETE_BUTTON.addEventListener("click", removeTodo.bind(null, todoItem.id));
  
  $LI.append($CHECKBOX, $SPAN, $DELETE_BUTTON);
  return $LI;
};

const render = () => {
  $TODO_LIST.innerHTML = "";
  toDos.map((todoItem) => {
    const $LI = createTodoNodeElement(todoItem);
    $TODO_LIST.append($LI);
  });
  console.log(toDos);
};

const removeTodo = (id) => {
  const index = toDos.findIndex((todoItem) => todoItem.id === id);
  toDos.splice(index, 1);
  render();
}

$ADD_BUTTON.addEventListener("click", addTodo);
$MAIN_INPUT.addEventListener("keyup", handleInputAddTodo);
