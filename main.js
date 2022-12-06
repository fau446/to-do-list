/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/appController.js":
/*!**************************************!*\
  !*** ./src/modules/appController.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");


const appController = () => {
  let projects = []
  let activeProject = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Default')
  projects.push(activeProject)

  function createProject(name) {
    let newProject = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name)
    projects.push(newProject)
  }

  function switchActiveProject(newActiveProject) {
    activeProject = newActiveProject
  }

  function delProject(index) {
    if (projects[index] === activeProject) return

    projects.splice(index, 1)
  }

  const getActiveProject = () => activeProject

  const getProjects = () => projects

  return {
    createProject,
    switchActiveProject,
    delProject,
    getActiveProject,
    getProjects
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appController);

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/modules/task.js");


const project = (name) => {
  let tasks = []

  function addTask(title, description, dueDate, priority) {
    let newTask = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority)
    tasks.push(newTask)
  }

  function delTask(index) {
    tasks.splice(index, 1)
  }

  const getTasks = () => tasks

  return {
    name,
    addTask,
    delTask,
    getTasks
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);

/***/ }),

/***/ "./src/modules/screenController.js":
/*!*****************************************!*\
  !*** ./src/modules/screenController.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _appController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appController.js */ "./src/modules/appController.js");


const screenController = () => {
  let app = (0,_appController_js__WEBPACK_IMPORTED_MODULE_0__["default"])()

  //cache DOM
  let projectsTable = document.querySelector('.projects')
  let addProjectInput = document.querySelector('.add-project-input')
  let addProjectButton = document.querySelector('.add-project-btn')
  let addTaskButton = document.querySelector('.add-task-btn')
  let modalOverlay = document.querySelector('.overlay')
  let closeModalButtons = document.querySelectorAll('.close-modal')
  let taskNameInput = document.querySelector('#task-name')
  let dateInput = document.querySelector('#date')
  let taskPriorityInput = document.querySelector('#priority')
  let descriptionInput = document.querySelector('#description')

  //bind events
  addProjectButton.addEventListener('click', _addProject)
  addProjectInput.addEventListener('keyup', _submitProjectInput)
  
  //modal events
  addTaskButton.addEventListener('click', _loadAddTaskModal)
  modalOverlay.addEventListener('click', _closeModal)
  closeModalButtons.forEach((button) => {
    button.addEventListener('click', _closeModal)
  })

  //projects functions
  function _loadProjectList() {
    _resetProjectList()
    let projects = app.getProjects()
    projects.forEach((project, index) => {
      let tableRow = projectsTable.insertRow(index)

      let projectItem = document.createElement('button')
      projectItem.onclick = _makeActiveProject
      projectItem.innerText = project.name
      projectItem.dataset.indexNumber = index

      let deleteButton = document.createElement('button')
      deleteButton.onclick = _deleteProject
      deleteButton.innerText = 'Delete'

      tableRow.appendChild(projectItem)
      tableRow.appendChild(deleteButton)
    })
    _highlightActiveProject()
  }

  function _highlightActiveProject() {
    let activeProject = app.getActiveProject()
    let projects = app.getProjects()
    projects.forEach((project, index) => {
      if (project.name === activeProject.name) {
        let activeDOMElement = document.querySelector(`[data-index-number="${index}"]`)
        activeDOMElement.classList.add('active')
      }
    })
  }

  function _resetProjectList() {
    let rowCount = projectsTable.rows.length
    for (let i = rowCount - 1; i >= 0; i--) {
      projectsTable.deleteRow(i)
    }
  }

  function _makeActiveProject() {
    app.switchActiveProject(app.getProjects()[this.dataset.indexNumber])
    _loadProjectList()
    _loadTasks()
  }

  function _addProject() {
    let newProjectName = addProjectInput.value.trim()
    if (newProjectName === '' || _checkDuplicateProject(newProjectName)) return
    app.createProject(newProjectName)
    _loadProjectList()
    _resetInputFields([addProjectInput])
  }

  function _checkDuplicateProject(newProjectName) {
    let projects = app.getProjects()
    let duplicateResult = false
    projects.forEach((project) => {
      if (newProjectName === project.name) {
        duplicateResult = true
        return
      }
    })

    return duplicateResult
  }

  function _deleteProject() {
    app.delProject(this.previousElementSibling.dataset.indexNumber)
    _loadProjectList()
  }

  function _submitProjectInput(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      _addProject()
    }
  }

  //tasks functions
  function _loadTasks() {
    let projectNameHeader = document.querySelector('.active-project-header')
    let activeProject = app.getActiveProject()
    projectNameHeader.innerText = activeProject.name
    
    _resetTasks()
    _createTasksDOM()
    
  }

  function _resetTasks() {
    let tasks = document.querySelector('.tasks')
    tasks.innerHTML = ''
  }

  function _createTasksDOM() {
    let activeProject = app.getActiveProject()
    let tasksDiv = document.querySelector('.tasks')

    activeProject.getTasks().forEach((task, index) => {
      let taskDiv = document.createElement('div')
      taskDiv.classList.add('task')
      let taskMain = document.createElement('div')
      taskMain.classList.add('task-main')
      let left = document.createElement('div')
      left.classList.add('left')
      let completeButton = document.createElement('button')
      completeButton.classList.add('complete-task-btn')
      let taskName = document.createElement('h3')
      taskName.innerText = task.title
      taskName.dataset.modal = 'edit'
      taskName.dataset.indexNumber = index
      //
      taskName.onclick = _loadEditTaskModal
      let delTaskButton = document.createElement('button')
      delTaskButton.classList.add('del-task-btn')
      delTaskButton.innerText = 'x'
      delTaskButton.dataset.indexNumber = index
      delTaskButton.onclick = _deleteTask
      let taskInfo = document.createElement('div')
      taskInfo.classList.add('task-info')
      let taskPriority = document.createElement('p')
      taskPriority.innerText = task.priority
      let taskDate = document.createElement('p')
      taskDate.innerText = task.dueDate

      left.appendChild(completeButton)
      left.appendChild(taskName)
      taskMain.appendChild(left)
      taskMain.appendChild(delTaskButton)
      taskInfo.appendChild(taskPriority)
      taskInfo.appendChild(taskDate)
      taskDiv.appendChild(taskMain)
      taskDiv.appendChild(taskInfo)
      tasksDiv.appendChild(taskDiv)
    })
  }

  function _retrieveAddTaskInputs() {
    let taskNameValue = taskNameInput.value
    let dateValue = dateInput.value
    let taskPriorityValue = taskPriorityInput.value
    let descriptionValue = descriptionInput.value

    _resetInputFields([taskNameInput, dateInput, taskPriorityInput, descriptionInput])

    return {
      title:`${taskNameValue}`,
      description:`${descriptionValue}`,
      dueDate:dateValue,
      priority:`${taskPriorityValue}`
    }
  }

  function _submitAddTaskInputs() {
    let inputValues = _retrieveAddTaskInputs()
    app.getActiveProject().addTask(inputValues.title, inputValues.description, inputValues.dueDate, inputValues.priority)
    _loadTasks()
    _closeModal()
  }

  function _deleteTask() {
    let activeProject = app.getActiveProject()
    activeProject.delTask(this.dataset.indexNumber)
    _loadTasks()
  }

  //general functions
  function _resetInputFields(inputs) {
    inputs.forEach((input) => {
      input.value = ''
    })
  }

  //modal functions
  function _openModal() {
    let modal = document.querySelector('.modal')
    modal.classList.add('on')
    modalOverlay.classList.add('on')
  }

  function _closeModal() {
    let modal = document.querySelector('.modal')
    modal.classList.remove('on')
    modalOverlay.classList.remove('on')
  }

  function _loadAddTaskModal() {
    let modalTitle = document.querySelector('.modal-title')
    modalTitle.innerText = 'Add Task'
    let submitButton = document.querySelector('.submit')
    submitButton.innerText = 'Add'
    submitButton.removeEventListener('click', _editTask)
    submitButton.addEventListener('click', _submitAddTaskInputs)
    _resetInputFields([taskNameInput, dateInput, taskPriorityInput, descriptionInput])
    _openModal()
  }

  function _loadEditTaskModal() {
    let modalTitle = document.querySelector('.modal-title')
    let index = this.dataset.indexNumber
    modalTitle.innerText = 'Edit Task'
    let submitButton = document.querySelector('.submit')
    submitButton.innerText = 'Confirm Changes'
    submitButton.dataset.indexNumber = index
    submitButton.removeEventListener('click', _submitAddTaskInputs)
    submitButton.addEventListener('click', _editTask)
    _openModal()
    _loadEditTaskInputValues(index)
  }

  function _editTask() {
    let task = app.getActiveProject().getTasks()[+this.dataset.indexNumber]

    task.title = taskNameInput.value
    task.description = descriptionInput.value
    task.dueDate = dateInput.value
    task.priority = taskPriorityInput.value

    _loadTasks()
    _closeModal()
  }

  function _loadEditTaskInputValues(index) {
    let task = app.getActiveProject().getTasks()[index]

    taskNameInput.value = task.title
    dateInput.value = task.dueDate
    taskPriorityInput.value = task.priority
    descriptionInput.value = task.description
  }

  _loadProjectList()
  _loadTasks()
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (screenController);

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const task = (title, description, dueDate, priority, complete=false) => {

  return {
    title,
    description,
    dueDate,
    priority,
    complete
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (task);

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
/* harmony import */ var _modules_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/task.js */ "./src/modules/task.js");
/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/project.js */ "./src/modules/project.js");
/* harmony import */ var _modules_appController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/appController.js */ "./src/modules/appController.js");
/* harmony import */ var _modules_screenController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/screenController.js */ "./src/modules/screenController.js");





(0,_modules_screenController_js__WEBPACK_IMPORTED_MODULE_3__["default"])()

/*
  function _addProject() {
    let newProjectName = addprjectin
    if (addProjectInput.value.trim() === '' || _checkDuplicateProject()) return
    app.createProject(addProjectInput.value)
    _loadProjectList()
    _resetInputField(addProjectInput)
  }
*/
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQSxzQkFBc0IsdURBQU87QUFDN0I7O0FBRUE7QUFDQSxxQkFBcUIsdURBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ25DYTs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixvREFBSTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDeEIrQjs7QUFFOUM7QUFDQSxZQUFZLDZEQUFhOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxNQUFNO0FBQ25GO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDeFFmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7OztVQ1hmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDTTtBQUNZO0FBQ007O0FBRTVELHdFQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCJcblxuY29uc3QgYXBwQ29udHJvbGxlciA9ICgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW11cbiAgbGV0IGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0KCdEZWZhdWx0JylcbiAgcHJvamVjdHMucHVzaChhY3RpdmVQcm9qZWN0KVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdChuYW1lKVxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3aXRjaEFjdGl2ZVByb2plY3QobmV3QWN0aXZlUHJvamVjdCkge1xuICAgIGFjdGl2ZVByb2plY3QgPSBuZXdBY3RpdmVQcm9qZWN0XG4gIH1cblxuICBmdW5jdGlvbiBkZWxQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKHByb2plY3RzW2luZGV4XSA9PT0gYWN0aXZlUHJvamVjdCkgcmV0dXJuXG5cbiAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpXG4gIH1cblxuICBjb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKCkgPT4gYWN0aXZlUHJvamVjdFxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHNcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgc3dpdGNoQWN0aXZlUHJvamVjdCxcbiAgICBkZWxQcm9qZWN0LFxuICAgIGdldEFjdGl2ZVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHNcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBDb250cm9sbGVyIiwiaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJ1xuXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgbGV0IHRhc2tzID0gW11cblxuICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICBsZXQgbmV3VGFzayA9IHRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSlcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spXG4gIH1cblxuICBmdW5jdGlvbiBkZWxUYXNrKGluZGV4KSB7XG4gICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgY29uc3QgZ2V0VGFza3MgPSAoKSA9PiB0YXNrc1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBhZGRUYXNrLFxuICAgIGRlbFRhc2ssXG4gICAgZ2V0VGFza3NcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0IiwiaW1wb3J0IGFwcENvbnRyb2xsZXIgZnJvbSBcIi4vYXBwQ29udHJvbGxlci5qc1wiXG5cbmNvbnN0IHNjcmVlbkNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBhcHAgPSBhcHBDb250cm9sbGVyKClcblxuICAvL2NhY2hlIERPTVxuICBsZXQgcHJvamVjdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpXG4gIGxldCBhZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtaW5wdXQnKVxuICBsZXQgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idG4nKVxuICBsZXQgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idG4nKVxuICBsZXQgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKVxuICBsZXQgY2xvc2VNb2RhbEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtbW9kYWwnKVxuICBsZXQgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLW5hbWUnKVxuICBsZXQgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICBsZXQgdGFza1ByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICBsZXQgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpXG5cbiAgLy9iaW5kIGV2ZW50c1xuICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2FkZFByb2plY3QpXG4gIGFkZFByb2plY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIF9zdWJtaXRQcm9qZWN0SW5wdXQpXG4gIFxuICAvL21vZGFsIGV2ZW50c1xuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xvYWRBZGRUYXNrTW9kYWwpXG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZU1vZGFsKVxuICBjbG9zZU1vZGFsQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgfSlcblxuICAvL3Byb2plY3RzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFByb2plY3RMaXN0KCkge1xuICAgIF9yZXNldFByb2plY3RMaXN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFibGVSb3cgPSBwcm9qZWN0c1RhYmxlLmluc2VydFJvdyhpbmRleClcblxuICAgICAgbGV0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIHByb2plY3RJdGVtLm9uY2xpY2sgPSBfbWFrZUFjdGl2ZVByb2plY3RcbiAgICAgIHByb2plY3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3QubmFtZVxuICAgICAgcHJvamVjdEl0ZW0uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG5cbiAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlUHJvamVjdFxuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9ICdEZWxldGUnXG5cbiAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKVxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgIH0pXG4gICAgX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGxldCBhY3RpdmVET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXgtbnVtYmVyPVwiJHtpbmRleH1cIl1gKVxuICAgICAgICBhY3RpdmVET01FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFByb2plY3RMaXN0KCkge1xuICAgIGxldCByb3dDb3VudCA9IHByb2plY3RzVGFibGUucm93cy5sZW5ndGhcbiAgICBmb3IgKGxldCBpID0gcm93Q291bnQgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgcHJvamVjdHNUYWJsZS5kZWxldGVSb3coaSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfbWFrZUFjdGl2ZVByb2plY3QoKSB7XG4gICAgYXBwLnN3aXRjaEFjdGl2ZVByb2plY3QoYXBwLmdldFByb2plY3RzKClbdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hZGRQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGFkZFByb2plY3RJbnB1dC52YWx1ZS50cmltKClcbiAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09ICcnIHx8IF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbYWRkUHJvamVjdElucHV0XSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIGxldCBkdXBsaWNhdGVSZXN1bHQgPSBmYWxzZVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gcHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGR1cGxpY2F0ZVJlc3VsdCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBkdXBsaWNhdGVSZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVQcm9qZWN0KCkge1xuICAgIGFwcC5kZWxQcm9qZWN0KHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5kYXRhc2V0LmluZGV4TnVtYmVyKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX3N1Ym1pdFByb2plY3RJbnB1dChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgX2FkZFByb2plY3QoKVxuICAgIH1cbiAgfVxuXG4gIC8vdGFza3MgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9sb2FkVGFza3MoKSB7XG4gICAgbGV0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0LWhlYWRlcicpXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgcHJvamVjdE5hbWVIZWFkZXIuaW5uZXJUZXh0ID0gYWN0aXZlUHJvamVjdC5uYW1lXG4gICAgXG4gICAgX3Jlc2V0VGFza3MoKVxuICAgIF9jcmVhdGVUYXNrc0RPTSgpXG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXRUYXNrcygpIHtcbiAgICBsZXQgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuICAgIHRhc2tzLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlVGFza3NET00oKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHRhc2tzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcblxuICAgIGFjdGl2ZVByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgIGxldCB0YXNrTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrTWFpbi5jbGFzc0xpc3QuYWRkKCd0YXNrLW1haW4nKVxuICAgICAgbGV0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgbGVmdC5jbGFzc0xpc3QuYWRkKCdsZWZ0JylcbiAgICAgIGxldCBjb21wbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG4gICAgICB0YXNrTmFtZS5kYXRhc2V0Lm1vZGFsID0gJ2VkaXQnXG4gICAgICB0YXNrTmFtZS5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIC8vXG4gICAgICB0YXNrTmFtZS5vbmNsaWNrID0gX2xvYWRFZGl0VGFza01vZGFsXG4gICAgICBsZXQgZGVsVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbC10YXNrLWJ0bicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmlubmVyVGV4dCA9ICd4J1xuICAgICAgZGVsVGFza0J1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIGRlbFRhc2tCdXR0b24ub25jbGljayA9IF9kZWxldGVUYXNrXG4gICAgICBsZXQgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgndGFzay1pbmZvJylcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZVxuXG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGNvbXBsZXRlQnV0dG9uKVxuICAgICAgbGVmdC5hcHBlbmRDaGlsZCh0YXNrTmFtZSlcbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkZWxUYXNrQnV0dG9uKVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0RhdGUpXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tNYWluKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSW5mbylcbiAgICAgIHRhc2tzRGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKSB7XG4gICAgbGV0IHRhc2tOYW1lVmFsdWUgPSB0YXNrTmFtZUlucHV0LnZhbHVlXG4gICAgbGV0IGRhdGVWYWx1ZSA9IGRhdGVJbnB1dC52YWx1ZVxuICAgIGxldCB0YXNrUHJpb3JpdHlWYWx1ZSA9IHRhc2tQcmlvcml0eUlucHV0LnZhbHVlXG4gICAgbGV0IGRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlXG5cbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbdGFza05hbWVJbnB1dCwgZGF0ZUlucHV0LCB0YXNrUHJpb3JpdHlJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6YCR7dGFza05hbWVWYWx1ZX1gLFxuICAgICAgZGVzY3JpcHRpb246YCR7ZGVzY3JpcHRpb25WYWx1ZX1gLFxuICAgICAgZHVlRGF0ZTpkYXRlVmFsdWUsXG4gICAgICBwcmlvcml0eTpgJHt0YXNrUHJpb3JpdHlWYWx1ZX1gXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3N1Ym1pdEFkZFRhc2tJbnB1dHMoKSB7XG4gICAgbGV0IGlucHV0VmFsdWVzID0gX3JldHJpZXZlQWRkVGFza0lucHV0cygpXG4gICAgYXBwLmdldEFjdGl2ZVByb2plY3QoKS5hZGRUYXNrKGlucHV0VmFsdWVzLnRpdGxlLCBpbnB1dFZhbHVlcy5kZXNjcmlwdGlvbiwgaW5wdXRWYWx1ZXMuZHVlRGF0ZSwgaW5wdXRWYWx1ZXMucHJpb3JpdHkpXG4gICAgX2xvYWRUYXNrcygpXG4gICAgX2Nsb3NlTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVRhc2soKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgYWN0aXZlUHJvamVjdC5kZWxUYXNrKHRoaXMuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIC8vZ2VuZXJhbCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX3Jlc2V0SW5wdXRGaWVsZHMoaW5wdXRzKSB7XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnXG4gICAgfSlcbiAgfVxuXG4gIC8vbW9kYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9vcGVuTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJylcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbG9zZU1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEFkZFRhc2tNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpXG4gICAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSAnQWRkIFRhc2snXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKVxuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkJ1xuICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9lZGl0VGFzaylcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbdGFza05hbWVJbnB1dCwgZGF0ZUlucHV0LCB0YXNrUHJpb3JpdHlJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0pXG4gICAgX29wZW5Nb2RhbCgpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEVkaXRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKVxuICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YXNldC5pbmRleE51bWJlclxuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gJ0VkaXQgVGFzaydcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpXG4gICAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdDb25maXJtIENoYW5nZXMnXG4gICAgc3VibWl0QnV0dG9uLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9zdWJtaXRBZGRUYXNrSW5wdXRzKVxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9lZGl0VGFzaylcbiAgICBfb3Blbk1vZGFsKClcbiAgICBfbG9hZEVkaXRUYXNrSW5wdXRWYWx1ZXMoaW5kZXgpXG4gIH1cblxuICBmdW5jdGlvbiBfZWRpdFRhc2soKSB7XG4gICAgbGV0IHRhc2sgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmdldFRhc2tzKClbK3RoaXMuZGF0YXNldC5pbmRleE51bWJlcl1cblxuICAgIHRhc2sudGl0bGUgPSB0YXNrTmFtZUlucHV0LnZhbHVlXG4gICAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWVcbiAgICB0YXNrLmR1ZURhdGUgPSBkYXRlSW5wdXQudmFsdWVcbiAgICB0YXNrLnByaW9yaXR5ID0gdGFza1ByaW9yaXR5SW5wdXQudmFsdWVcblxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkRWRpdFRhc2tJbnB1dFZhbHVlcyhpbmRleCkge1xuICAgIGxldCB0YXNrID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKS5nZXRUYXNrcygpW2luZGV4XVxuXG4gICAgdGFza05hbWVJbnB1dC52YWx1ZSA9IHRhc2sudGl0bGVcbiAgICBkYXRlSW5wdXQudmFsdWUgPSB0YXNrLmR1ZURhdGVcbiAgICB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2sucHJpb3JpdHlcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdGFzay5kZXNjcmlwdGlvblxuICB9XG5cbiAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIF9sb2FkVGFza3MoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5Db250cm9sbGVyIiwiY29uc3QgdGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZT1mYWxzZSkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBjb21wbGV0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2siLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0YXNrIGZyb20gJy4vbW9kdWxlcy90YXNrLmpzJ1xuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcydcbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzJ1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuLypcbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkcHJqZWN0aW5cbiAgICBpZiAoYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdCgpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChhZGRQcm9qZWN0SW5wdXQudmFsdWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZChhZGRQcm9qZWN0SW5wdXQpXG4gIH1cbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9