export default class Todo {
  constructor(attributes) {
    this.title = attributes.title
    this.description = attributes.description
    this.dueDate = attributes.dueDate
    this.priority = attributes.priority
  }
}
