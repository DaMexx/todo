const drawFilters = (filters, callBack) => {
  const $filterBlock = document.createElement('div');
  for (const filter of Object.values(filters)) {
    const $button = document.createElement('button');
    $button.innerText = filter.name;
    $button.addEventListener('click', () => callBack(filter.value));
    $filterBlock.append($button);
  }
  return $filterBlock;
}

export {
  drawFilters,
}
