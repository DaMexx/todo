const drawFilters = (filters, callBack) => {
  const $filterBlock = document.createElement('div');
  for (const filter of Object.values(filters)) {
    const $button = document.createElement('button');
    const { name, count } = filter;

    $button.innerText = name;
    if (count) {
      $button.innerText = `${name} (${filter.count})`;
    }

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
