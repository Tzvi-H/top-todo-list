import TodoList from './todo_list';

const listsContainer = document.querySelector('.lists')
const lists = TodoList.load()

export const initLists = () => {
  lists.forEach(list => {
    const ul = createListElement(list)
    list.todos.forEach(todo => ul.appendChild(createTodoElement(todo)))
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
  element.textContent = todo.title
  return element
}

const createElement = (type, text) => {
  const element = document.createElement(type)
  element.textContent = text
  return element
}

const createTodoForm = () => {
  const form = document.createElement('form')
  form.innerHTML = `
    title<input name="title"></input>
    description<input name="description"></input>
    <button>submit</button>
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
  list.add(attributes)
  TodoList.save(lists)
  form.reset()
}