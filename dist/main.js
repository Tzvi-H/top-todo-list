/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_actions.js":
/*!****************************!*\
  !*** ./src/dom_actions.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initLists": () => (/* binding */ initLists)
/* harmony export */ });
/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo_list */ "./src/todo_list.js");


const listsContainer = document.querySelector('.lists')
let lists

const initLists = () => {
  while (listsContainer.firstChild) listsContainer.removeChild(listsContainer.firstChild);
  lists = _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].load()
  lists.forEach(list => {
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
  _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].save(lists)
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
  _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].save(lists)
  initLists()
}

const resetLists = () => {
  _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].resetLists()
  initLists()
}

const addList = event => {
  const input = document.querySelector('#addListName')
  lists.push(new _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"]({name: input.value}))
  input.value = ''
  _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].save(lists)
  initLists()
}

document
  .querySelector('#resetLists')
  .addEventListener('click', resetLists)

document
  .querySelector('#addList')
  .addEventListener('click', addList)


/***/ }),

/***/ "./src/local_storage.js":
/*!******************************!*\
  !*** ./src/local_storage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getLists": () => (/* binding */ getLists),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "save": () => (/* binding */ save)
/* harmony export */ });
function save(key, value) {
  value = JSON.stringify(value)
  window.localStorage.setItem(key, value)
}

function get(key) {
  const value = window.localStorage.getItem(key)
  return JSON.parse(value)
}

function remove(key) {
  window.localStorage.removeItem(key)
}

function getLists() {
  const lists = window.localStorage.getItem('lists')
  return JSON.parse(lists) || []
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  save, get, remove, getLists
});

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
  constructor(attributes = {}) {
    this.title = attributes.title
    this.description = attributes.description
    this.dueDate = attributes.dueDate
    this.priority = attributes.priority
    this.isComplete = attributes.isComplete || false
  }

  toggleComplete() {
    this.isComplete = !this.isComplete
  }
}


/***/ }),

/***/ "./src/todo_list.js":
/*!**************************!*\
  !*** ./src/todo_list.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local_storage */ "./src/local_storage.js");



class TodoList {
  constructor(attributes = {}) {
    this.name = attributes.name || 'default list'
    this.todos = attributes.todos || []
  }

  addTodo(attributes) {
    this.todos.push(new _todo__WEBPACK_IMPORTED_MODULE_0__["default"](attributes))
  }

  findByTitle(title) {
    return this.todos.find(t => t.title === title)
  }

  static resetLists() {
    _local_storage__WEBPACK_IMPORTED_MODULE_1__["default"].save('lists', [new TodoList()])
  }

  static load() {
    let lists = _local_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getLists()
  
    if (lists.length === 0) {
      return [ new TodoList() ]
    } else {
      return lists.map(list => {
        list = new TodoList(list)
        list.todos = list.todos.map(todo => new _todo__WEBPACK_IMPORTED_MODULE_0__["default"](todo))
        return list
      })
    }
  }

  static save(lists) {
    _local_storage__WEBPACK_IMPORTED_MODULE_1__["default"].save('lists', lists)
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_actions */ "./src/dom_actions.js");


(0,_dom_actions__WEBPACK_IMPORTED_MODULE_0__.initLists)()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0E7O0FBRU87QUFDUDtBQUNBLFVBQVUsdURBQWE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFlBQVksSUFBSSxrQkFBa0IsSUFBSSxXQUFXO0FBQzVFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBYTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBYTtBQUNmO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUFtQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQVEsRUFBRSxrQkFBa0I7QUFDN0M7QUFDQSxFQUFFLHVEQUFhO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0ZPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckJlO0FBQ2YsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaMEI7QUFDVzs7QUFFdEI7QUFDZiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksMkRBQVk7QUFDaEI7O0FBRUE7QUFDQSxnQkFBZ0IsK0RBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsZ0RBQWdELDZDQUFJO0FBQ3BEO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFZO0FBQ2hCO0FBQ0E7Ozs7OztVQ3RDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6Qyx1REFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvZG9tX2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9sb2NhbF9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL3RvZG9fbGlzdC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi90b2RvX2xpc3QnO1xuXG5jb25zdCBsaXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0cycpXG5sZXQgbGlzdHNcblxuZXhwb3J0IGNvbnN0IGluaXRMaXN0cyA9ICgpID0+IHtcbiAgd2hpbGUgKGxpc3RzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIGxpc3RzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGxpc3RzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICBsaXN0cyA9IFRvZG9MaXN0LmxvYWQoKVxuICBsaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgIGNvbnN0IHVsID0gY3JlYXRlTGlzdEVsZW1lbnQobGlzdClcbiAgICBsaXN0LnRvZG9zLmZvckVhY2godG9kbyA9PiB7XG4gICAgICBjb25zdCB0b2RvRWxlbWVudCA9IGNyZWF0ZVRvZG9FbGVtZW50KHRvZG8pXG4gICAgICB0b2RvRWxlbWVudC5kYXRhc2V0Lmxpc3ROYW1lID0gbGlzdC5uYW1lXG4gICAgICB1bC5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudClcbiAgICB9KVxuICAgIGxpc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHVsKVxuICB9KVxufVxuXG5jb25zdCBjcmVhdGVMaXN0RWxlbWVudCA9IGxpc3QgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgndWwnLCBsaXN0Lm5hbWUpXG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVUb2RvRm9ybSgpXG4gIGZvcm0uZGF0YXNldC5saXN0TmFtZSA9IGxpc3QubmFtZVxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFRvZG8pXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgcmV0dXJuIGVsZW1lbnRcbn1cblxuY29uc3QgY3JlYXRlVG9kb0VsZW1lbnQgPSB0b2RvID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgY29uc3QgZG9uZVN0YXR1cyA9IHRvZG8uaXNDb21wbGV0ZSA/ICdpcyBkb25lJyA6ICdpcyB1bmRvbmUnXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0b2RvLnRpdGxlfSAtICR7dG9kby5kZXNjcmlwdGlvbn0gLSAke2RvbmVTdGF0dXN9YFxuICBlbGVtZW50LmRhdGFzZXQudGl0bGUgPSB0b2RvLnRpdGxlXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb21wbGV0ZSlcbiAgcmV0dXJuIGVsZW1lbnRcbn1cblxuY29uc3QgdG9nZ2xlQ29tcGxldGUgPSBldmVudCA9PiB7XG4gIGNvbnN0IGxpc3QgPSBsaXN0cy5maW5kKGwgPT4gbC5uYW1lID09PSBldmVudC50YXJnZXQuZGF0YXNldC5saXN0TmFtZSlcbiAgY29uc3QgdG9kbyA9IGxpc3QuZmluZEJ5VGl0bGUoZXZlbnQudGFyZ2V0LmRhdGFzZXQudGl0bGUpXG4gIHRvZG8udG9nZ2xlQ29tcGxldGUoKVxuICBUb2RvTGlzdC5zYXZlKGxpc3RzKVxuICBpbml0TGlzdHMoKVxufVxuXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIHRleHQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9ICB0ZXh0XG4gIHJldHVybiBlbGVtZW50XG59XG5cbmNvbnN0IGNyZWF0ZVRvZG9Gb3JtID0gKCkgPT4ge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gIGZvcm0uaW5uZXJIVE1MID0gYFxuICAgIHRpdGxlPGlucHV0IG5hbWU9XCJ0aXRsZVwiPjwvaW5wdXQ+XG4gICAgZGVzY3JpcHRpb248aW5wdXQgbmFtZT1cImRlc2NyaXB0aW9uXCI+PC9pbnB1dD5cbiAgICA8YnV0dG9uPmFkZCB0b2RvPC9idXR0b24+XG4gIGA7XG4gIHJldHVybiBmb3JtO1xufVxuXG5jb25zdCBhZGRUb2RvID0gZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXRcbiAgY29uc3QgYXR0cmlidXRlcyA9IHtcbiAgICB0aXRsZTogZm9ybS50aXRsZS52YWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogZm9ybS5kZXNjcmlwdGlvbi52YWx1ZVxuICB9XG4gIGNvbnN0IGxpc3QgPSBsaXN0cy5maW5kKGwgPT4gbC5uYW1lID09PSBmb3JtLmRhdGFzZXQubGlzdE5hbWUpXG4gIGxpc3QuYWRkVG9kbyhhdHRyaWJ1dGVzKVxuICBUb2RvTGlzdC5zYXZlKGxpc3RzKVxuICBpbml0TGlzdHMoKVxufVxuXG5jb25zdCByZXNldExpc3RzID0gKCkgPT4ge1xuICBUb2RvTGlzdC5yZXNldExpc3RzKClcbiAgaW5pdExpc3RzKClcbn1cblxuY29uc3QgYWRkTGlzdCA9IGV2ZW50ID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkTGlzdE5hbWUnKVxuICBsaXN0cy5wdXNoKG5ldyBUb2RvTGlzdCh7bmFtZTogaW5wdXQudmFsdWV9KSlcbiAgaW5wdXQudmFsdWUgPSAnJ1xuICBUb2RvTGlzdC5zYXZlKGxpc3RzKVxuICBpbml0TGlzdHMoKVxufVxuXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcignI3Jlc2V0TGlzdHMnKVxuICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldExpc3RzKVxuXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcignI2FkZExpc3QnKVxuICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRMaXN0KVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNhdmUoa2V5LCB2YWx1ZSkge1xuICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgY29uc3QgdmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxuICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpc3RzKCkge1xuICBjb25zdCBsaXN0cyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKVxuICByZXR1cm4gSlNPTi5wYXJzZShsaXN0cykgfHwgW11cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzYXZlLCBnZXQsIHJlbW92ZSwgZ2V0TGlzdHNcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcyA9IHt9KSB7XG4gICAgdGhpcy50aXRsZSA9IGF0dHJpYnV0ZXMudGl0bGVcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYXR0cmlidXRlcy5kZXNjcmlwdGlvblxuICAgIHRoaXMuZHVlRGF0ZSA9IGF0dHJpYnV0ZXMuZHVlRGF0ZVxuICAgIHRoaXMucHJpb3JpdHkgPSBhdHRyaWJ1dGVzLnByaW9yaXR5XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gYXR0cmlidXRlcy5pc0NvbXBsZXRlIHx8IGZhbHNlXG4gIH1cblxuICB0b2dnbGVDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSAhdGhpcy5pc0NvbXBsZXRlXG4gIH1cbn1cbiIsImltcG9ydCBUb2RvIGZyb20gJy4vdG9kbyc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL2xvY2FsX3N0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcyA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gYXR0cmlidXRlcy5uYW1lIHx8ICdkZWZhdWx0IGxpc3QnXG4gICAgdGhpcy50b2RvcyA9IGF0dHJpYnV0ZXMudG9kb3MgfHwgW11cbiAgfVxuXG4gIGFkZFRvZG8oYXR0cmlidXRlcykge1xuICAgIHRoaXMudG9kb3MucHVzaChuZXcgVG9kbyhhdHRyaWJ1dGVzKSlcbiAgfVxuXG4gIGZpbmRCeVRpdGxlKHRpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmluZCh0ID0+IHQudGl0bGUgPT09IHRpdGxlKVxuICB9XG5cbiAgc3RhdGljIHJlc2V0TGlzdHMoKSB7XG4gICAgc3RvcmFnZS5zYXZlKCdsaXN0cycsIFtuZXcgVG9kb0xpc3QoKV0pXG4gIH1cblxuICBzdGF0aWMgbG9hZCgpIHtcbiAgICBsZXQgbGlzdHMgPSBzdG9yYWdlLmdldExpc3RzKClcbiAgXG4gICAgaWYgKGxpc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFsgbmV3IFRvZG9MaXN0KCkgXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbGlzdHMubWFwKGxpc3QgPT4ge1xuICAgICAgICBsaXN0ID0gbmV3IFRvZG9MaXN0KGxpc3QpXG4gICAgICAgIGxpc3QudG9kb3MgPSBsaXN0LnRvZG9zLm1hcCh0b2RvID0+IG5ldyBUb2RvKHRvZG8pKVxuICAgICAgICByZXR1cm4gbGlzdFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2F2ZShsaXN0cykge1xuICAgIHN0b3JhZ2Uuc2F2ZSgnbGlzdHMnLCBsaXN0cylcbiAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdExpc3RzIH0gZnJvbSAnLi9kb21fYWN0aW9ucydcblxuaW5pdExpc3RzKClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==