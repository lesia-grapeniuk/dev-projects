export function setLocalStorage (item, key) {
  const stringifyedItem = JSON.stringify(item)
  localStorage.setItem(key, stringifyedItem);
}