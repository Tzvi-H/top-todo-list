import Todo from './todo';
import storage from './local_storage'

export default class TodoList {
  constructor(attributes = {}) {
    this.name = attributes.name || 'default'
    this.todos = []
  }

  add(attributes) {
    this.todos.push(new Todo(attributes))
  }

  save() {
    storage.save(this.name, this)
  }

  loadTodos() {
    const todos = storage.get(this.name)
    if (todos) {
      todos.todos.forEach(this.add.bind(this))
    }
  }
}