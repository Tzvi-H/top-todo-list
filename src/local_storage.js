export function save(key, value) {
  value = JSON.stringify(value)
  window.localStorage.setItem(key, value)
}

export function get(key) {
  const value = window.localStorage.getItem(key)
  return JSON.parse(value)
}

export function remove(key) {
  window.localStorage.removeItem(key)
}

export default {
  save, get, remove
}