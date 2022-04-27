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
  lists = _todo_list__WEBPACK_IMPORTED_MODULE_0__["default"].load()
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

document
  .querySelector('#resetLists')
  .addEventListener('click', resetLists)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0E7O0FBRU87QUFDUCxVQUFVLHVEQUFhO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFlBQVksSUFBSSxrQkFBa0IsSUFBSSxXQUFXO0FBQzVFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBYTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBYTtBQUNmO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUFtQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckJlO0FBQ2YsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaMEI7QUFDVzs7QUFFdEI7QUFDZiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksMkRBQVk7QUFDaEI7O0FBRUE7QUFDQSxnQkFBZ0IsK0RBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsZ0RBQWdELDZDQUFJO0FBQ3BEO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFZO0FBQ2hCO0FBQ0E7Ozs7OztVQ3RDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6Qyx1REFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvZG9tX2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9sb2NhbF9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vc3JjL3RvZG9fbGlzdC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi90b2RvX2xpc3QnO1xuXG5jb25zdCBsaXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0cycpXG5sZXQgbGlzdHNcblxuZXhwb3J0IGNvbnN0IGluaXRMaXN0cyA9ICgpID0+IHtcbiAgbGlzdHMgPSBUb2RvTGlzdC5sb2FkKClcbiAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICB3aGlsZSAobGlzdHNDb250YWluZXIuZmlyc3RDaGlsZCkgbGlzdHNDb250YWluZXIucmVtb3ZlQ2hpbGQobGlzdHNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgY29uc3QgdWwgPSBjcmVhdGVMaXN0RWxlbWVudChsaXN0KVxuICAgIGxpc3QudG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gY3JlYXRlVG9kb0VsZW1lbnQodG9kbylcbiAgICAgIHRvZG9FbGVtZW50LmRhdGFzZXQubGlzdE5hbWUgPSBsaXN0Lm5hbWVcbiAgICAgIHVsLmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KVxuICAgIH0pXG4gICAgbGlzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQodWwpXG4gIH0pXG59XG5cbmNvbnN0IGNyZWF0ZUxpc3RFbGVtZW50ID0gbGlzdCA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCd1bCcsIGxpc3QubmFtZSlcbiAgY29uc3QgZm9ybSA9IGNyZWF0ZVRvZG9Gb3JtKClcbiAgZm9ybS5kYXRhc2V0Lmxpc3ROYW1lID0gbGlzdC5uYW1lXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkVG9kbylcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChmb3JtKVxuICByZXR1cm4gZWxlbWVudFxufVxuXG5jb25zdCBjcmVhdGVUb2RvRWxlbWVudCA9IHRvZG8gPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICBjb25zdCBkb25lU3RhdHVzID0gdG9kby5pc0NvbXBsZXRlID8gJ2lzIGRvbmUnIDogJ2lzIHVuZG9uZSdcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9IC0gJHt0b2RvLmRlc2NyaXB0aW9ufSAtICR7ZG9uZVN0YXR1c31gXG4gIGVsZW1lbnQuZGF0YXNldC50aXRsZSA9IHRvZG8udGl0bGVcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbXBsZXRlKVxuICByZXR1cm4gZWxlbWVudFxufVxuXG5jb25zdCB0b2dnbGVDb21wbGV0ZSA9IGV2ZW50ID0+IHtcbiAgY29uc3QgbGlzdCA9IGxpc3RzLmZpbmQobCA9PiBsLm5hbWUgPT09IGV2ZW50LnRhcmdldC5kYXRhc2V0Lmxpc3ROYW1lKVxuICBjb25zdCB0b2RvID0gbGlzdC5maW5kQnlUaXRsZShldmVudC50YXJnZXQuZGF0YXNldC50aXRsZSlcbiAgdG9kby50b2dnbGVDb21wbGV0ZSgpXG4gIFRvZG9MaXN0LnNhdmUobGlzdHMpXG4gIGluaXRMaXN0cygpXG59XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgdGV4dCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuICBlbGVtZW50LnRleHRDb250ZW50ID0gIHRleHRcbiAgcmV0dXJuIGVsZW1lbnRcbn1cblxuY29uc3QgY3JlYXRlVG9kb0Zvcm0gPSAoKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgZm9ybS5pbm5lckhUTUwgPSBgXG4gICAgdGl0bGU8aW5wdXQgbmFtZT1cInRpdGxlXCI+PC9pbnB1dD5cbiAgICBkZXNjcmlwdGlvbjxpbnB1dCBuYW1lPVwiZGVzY3JpcHRpb25cIj48L2lucHV0PlxuICAgIDxidXR0b24+YWRkIHRvZG88L2J1dHRvbj5cbiAgYDtcbiAgcmV0dXJuIGZvcm07XG59XG5cbmNvbnN0IGFkZFRvZG8gPSBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgY29uc3QgZm9ybSA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBhdHRyaWJ1dGVzID0ge1xuICAgIHRpdGxlOiBmb3JtLnRpdGxlLnZhbHVlLFxuICAgIGRlc2NyaXB0aW9uOiBmb3JtLmRlc2NyaXB0aW9uLnZhbHVlXG4gIH1cbiAgY29uc3QgbGlzdCA9IGxpc3RzLmZpbmQobCA9PiBsLm5hbWUgPT09IGZvcm0uZGF0YXNldC5saXN0TmFtZSlcbiAgbGlzdC5hZGRUb2RvKGF0dHJpYnV0ZXMpXG4gIFRvZG9MaXN0LnNhdmUobGlzdHMpXG4gIGluaXRMaXN0cygpXG59XG5cbmNvbnN0IHJlc2V0TGlzdHMgPSAoKSA9PiB7XG4gIFRvZG9MaXN0LnJlc2V0TGlzdHMoKVxuICBpbml0TGlzdHMoKVxufVxuXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcignI3Jlc2V0TGlzdHMnKVxuICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldExpc3RzKSIsImV4cG9ydCBmdW5jdGlvbiBzYXZlKGtleSwgdmFsdWUpIHtcbiAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gIGNvbnN0IHZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSlcbiAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoa2V5KSB7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaXN0cygpIHtcbiAgY29uc3QgbGlzdHMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJylcbiAgcmV0dXJuIEpTT04ucGFyc2UobGlzdHMpIHx8IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2F2ZSwgZ2V0LCByZW1vdmUsIGdldExpc3RzXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIHRoaXMudGl0bGUgPSBhdHRyaWJ1dGVzLnRpdGxlXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGF0dHJpYnV0ZXMuZGVzY3JpcHRpb25cbiAgICB0aGlzLmR1ZURhdGUgPSBhdHRyaWJ1dGVzLmR1ZURhdGVcbiAgICB0aGlzLnByaW9yaXR5ID0gYXR0cmlidXRlcy5wcmlvcml0eVxuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGF0dHJpYnV0ZXMuaXNDb21wbGV0ZSB8fCBmYWxzZVxuICB9XG5cbiAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gIXRoaXMuaXNDb21wbGV0ZVxuICB9XG59XG4iLCJpbXBvcnQgVG9kbyBmcm9tICcuL3RvZG8nO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9sb2NhbF9zdG9yYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIHRoaXMubmFtZSA9IGF0dHJpYnV0ZXMubmFtZSB8fCAnZGVmYXVsdCBsaXN0J1xuICAgIHRoaXMudG9kb3MgPSBhdHRyaWJ1dGVzLnRvZG9zIHx8IFtdXG4gIH1cblxuICBhZGRUb2RvKGF0dHJpYnV0ZXMpIHtcbiAgICB0aGlzLnRvZG9zLnB1c2gobmV3IFRvZG8oYXR0cmlidXRlcykpXG4gIH1cblxuICBmaW5kQnlUaXRsZSh0aXRsZSkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbmQodCA9PiB0LnRpdGxlID09PSB0aXRsZSlcbiAgfVxuXG4gIHN0YXRpYyByZXNldExpc3RzKCkge1xuICAgIHN0b3JhZ2Uuc2F2ZSgnbGlzdHMnLCBbbmV3IFRvZG9MaXN0KCldKVxuICB9XG5cbiAgc3RhdGljIGxvYWQoKSB7XG4gICAgbGV0IGxpc3RzID0gc3RvcmFnZS5nZXRMaXN0cygpXG4gIFxuICAgIGlmIChsaXN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbIG5ldyBUb2RvTGlzdCgpIF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGxpc3RzLm1hcChsaXN0ID0+IHtcbiAgICAgICAgbGlzdCA9IG5ldyBUb2RvTGlzdChsaXN0KVxuICAgICAgICBsaXN0LnRvZG9zID0gbGlzdC50b2Rvcy5tYXAodG9kbyA9PiBuZXcgVG9kbyh0b2RvKSlcbiAgICAgICAgcmV0dXJuIGxpc3RcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNhdmUobGlzdHMpIHtcbiAgICBzdG9yYWdlLnNhdmUoJ2xpc3RzJywgbGlzdHMpXG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRMaXN0cyB9IGZyb20gJy4vZG9tX2FjdGlvbnMnXG5cbmluaXRMaXN0cygpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=