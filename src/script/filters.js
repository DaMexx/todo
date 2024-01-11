const drawFilters = (filters, callBack) => {
  const $filterBlock = document.createElement('div');
  for (const filter of Object.values(filters)) {
    const $button = document.createElement('button');
    $button.innerText = filter.name;
    $button.classList.add('todo-input-block__filters-item');
    $button.addEventListener('click', () => callBack(filter.value));
    $filterBlock.classList.add('todo-input-block__filters');
    $filterBlock.append($button);
  }
  return $filterBlock;
}

export {
  drawFilters,
}
