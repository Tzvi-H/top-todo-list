import TodoList from './todo_list';

const listsContainer = document.querySelector('.lists')
let lists

export const initLists = () => {
  lists = TodoList.load()
  lists.forEach(list => {
    while (listsContainer.firstChild) listsContainer.removeChild(listsContainer.firstChild);
    const ul = createListElement(list)
    list.todos.forEach(todo => {
      const todoElement = createTodoElement(todo)
      todoElement.dataset.listName = list.name
      ul.appendChild(todoElement)
    })
    listsContainer.appendChild(ul)
  })
}

const createListElement = list => {
  const element = createElement('ul', list.name)
  const form = createTodoForm()
  form.dataset.listName = list.name
  form.addEventListener('submit', addTodo)
  element.appendChild(form)
  return element
}

const createTodoElement = todo => {
  const element = document.createElement('li')
  const doneStatus = todo.isComplete ? 'is done' : 'is undone'
  element.textContent = `${todo.title} - ${todo.description} - ${doneStatus}`
  element.dataset.title = todo.title
  element.addEventListener('click', toggleComplete)
  return element
}

const toggleComplete = event => {
  const list = lists.find(l => l.name === event.target.dataset.listName)
  const todo = list.findByTitle(event.target.dataset.title)
  todo.toggleComplete()
  TodoList.save(lists)
  initLists()
}

const createElement = (type, text) => {
  const element = document.createElement(type)
  element.textContent =  text
  return element
}

const createTodoForm = () => {
  const form = document.createElement('form')
  form.innerHTML = `
    title<input name="title"></input>
    description<input name="description"></input>
    <button>add todo</button>
  `;
  return form;
}

const addTodo = event => {
  event.preventDefault()
  const form = event.target
  const attributes = {
    title: form.title.value,
    description: form.description.value
  }
  const list = lists.find(l => l.name === form.dataset.listName)
  list.addTodo(attributes)
  TodoList.save(lists)
  initLists()
}

const resetLists = () => {
  TodoList.resetLists()
  initLists()
}

document
  .querySelector('#resetLists')
  .addEventListener('click', resetLists)