const drawFilters = (filters, callBack) => {
  const $FILTER_BLOCK = document.createElement('div');
  for (const filter of Object.values(filters)) {
    const $BUTTON = document.createElement('button');
    $BUTTON.innerText = filter.name;
    $BUTTON.addEventListener('click', () => callBack(filter.type));
    $FILTER_BLOCK.append($BUTTON);
  }
  return $FILTER_BLOCK;
}

export {
  drawFilters,
}

