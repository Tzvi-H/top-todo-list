import Todo from './todo';
import storage from './local_storage'

export default class TodoList {
  constructor(attributes = {}) {
    this.name = attributes.name || 'default'
    this.todos = attributes.todos || []
  }

  add(attributes) {
    this.todos.push(new Todo(attributes))
  }

  // save() {
  //   storage.save(this.name, this)
  // }

  static load() {
    let lists = storage.getLists()
  
    if (lists.length === 0) {
      return [ new TodoList() ]
    } else {
      return lists.map(list => {
        list = new TodoList(list)
        list.todos = list.todos.map(todo => new Todo(todo))
        return list
      })
    }
  }

  static save(lists) {
    storage.save('lists', lists)
  }
}