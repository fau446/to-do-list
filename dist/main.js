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

  function toggleTaskCompletion(index) {
    let task = tasks[index]
    task.complete = task.complete === false ? true : false
  }

  const getTasks = () => tasks

  return {
    name,
    addTask,
    delTask,
    toggleTaskCompletion,
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
      deleteButton.innerText = 'x'

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
      let completeButton = document.createElement('button')
      completeButton.onclick = _toggleCompleteTask
      completeButton.classList.add('complete-task-btn')
      if (task.complete) completeButton.classList.add('complete')
      completeButton.dataset.indexNumber = index
      let taskName = document.createElement('h3')
      taskName.innerText = task.title
      taskName.dataset.modal = 'edit'
      taskName.dataset.indexNumber = index
      taskName.onclick = _loadEditTaskModal
      let delTaskButton = document.createElement('button')
      delTaskButton.classList.add('del-task-btn')
      delTaskButton.innerText = 'x'
      delTaskButton.dataset.indexNumber = index
      delTaskButton.onclick = _deleteTask
      let taskInfo = document.createElement('div')
      taskInfo.classList.add('task-info')
      let taskMisc = document.createElement('div')
      taskMisc.classList.add('task-misc')
      let taskPriority = document.createElement('p')
      taskPriority.innerText = task.priority
      let taskDate = document.createElement('p')
      taskDate.innerText = task.dueDate

      taskMisc.appendChild(taskPriority)
      taskMisc.appendChild(taskDate)

      taskInfo.appendChild(taskName)
      taskInfo.appendChild(taskMisc)

      taskMain.appendChild(taskInfo)
      taskMain.appendChild(delTaskButton)

      taskDiv.appendChild(completeButton)
      taskDiv.appendChild(taskMain)

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

  function _toggleCompleteTask() {
    let index = this.dataset.indexNumber
    
    if (this.classList.contains('complete')) {
      this.classList.remove('complete')
    } else {
      this.classList.add('complete')
    }

    app.getActiveProject().toggleTaskCompletion(index)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQSxzQkFBc0IsdURBQU87QUFDN0I7O0FBRUE7QUFDQSxxQkFBcUIsdURBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ25DYTs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixvREFBSTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUM5QitCOztBQUU5QztBQUNBLFlBQVksNkRBQWE7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLE1BQU07QUFDbkY7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsY0FBYztBQUM3QixxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQzFSZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUNYZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ007QUFDWTtBQUNNOztBQUU1RCx3RUFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiXG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdXG4gIGxldCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdCgnRGVmYXVsdCcpXG4gIHByb2plY3RzLnB1c2goYWN0aXZlUHJvamVjdClcblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QobmFtZSlcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBY3RpdmVQcm9qZWN0KG5ld0FjdGl2ZVByb2plY3QpIHtcbiAgICBhY3RpdmVQcm9qZWN0ID0gbmV3QWN0aXZlUHJvamVjdFxuICB9XG5cbiAgZnVuY3Rpb24gZGVsUHJvamVjdChpbmRleCkge1xuICAgIGlmIChwcm9qZWN0c1tpbmRleF0gPT09IGFjdGl2ZVByb2plY3QpIHJldHVyblxuXG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGFjdGl2ZVByb2plY3RcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIHN3aXRjaEFjdGl2ZVByb2plY3QsXG4gICAgZGVsUHJvamVjdCxcbiAgICBnZXRBY3RpdmVQcm9qZWN0LFxuICAgIGdldFByb2plY3RzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29udHJvbGxlciIsImltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcydcblxuY29uc3QgcHJvamVjdCA9IChuYW1lKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpXG4gICAgdGFza3MucHVzaChuZXdUYXNrKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVsVGFzayhpbmRleCkge1xuICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKGluZGV4KSB7XG4gICAgbGV0IHRhc2sgPSB0YXNrc1tpbmRleF1cbiAgICB0YXNrLmNvbXBsZXRlID0gdGFzay5jb21wbGV0ZSA9PT0gZmFsc2UgPyB0cnVlIDogZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3NcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYWRkVGFzayxcbiAgICBkZWxUYXNrLFxuICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uLFxuICAgIGdldFRhc2tzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdCIsImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gXCIuL2FwcENvbnRyb2xsZXIuanNcIlxuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgYXBwID0gYXBwQ29udHJvbGxlcigpXG5cbiAgLy9jYWNoZSBET01cbiAgbGV0IHByb2plY3RzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuICBsZXQgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0JylcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJylcbiAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJylcbiAgbGV0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JylcbiAgbGV0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLW1vZGFsJylcbiAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lJylcbiAgbGV0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgbGV0IHRhc2tQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgbGV0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuXG4gIC8vYmluZCBldmVudHNcbiAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9hZGRQcm9qZWN0KVxuICBhZGRQcm9qZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBfc3VibWl0UHJvamVjdElucHV0KVxuICBcbiAgLy9tb2RhbCBldmVudHNcbiAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sb2FkQWRkVGFza01vZGFsKVxuICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgY2xvc2VNb2RhbEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIH0pXG5cbiAgLy9wcm9qZWN0cyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRQcm9qZWN0TGlzdCgpIHtcbiAgICBfcmVzZXRQcm9qZWN0TGlzdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhYmxlUm93ID0gcHJvamVjdHNUYWJsZS5pbnNlcnRSb3coaW5kZXgpXG5cbiAgICAgIGxldCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBwcm9qZWN0SXRlbS5vbmNsaWNrID0gX21ha2VBY3RpdmVQcm9qZWN0XG4gICAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0Lm5hbWVcbiAgICAgIHByb2plY3RJdGVtLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuXG4gICAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gX2RlbGV0ZVByb2plY3RcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSAneCdcblxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgfSlcbiAgICBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgbGV0IGFjdGl2ZURPTUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleC1udW1iZXI9XCIke2luZGV4fVwiXWApXG4gICAgICAgIGFjdGl2ZURPTUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0UHJvamVjdExpc3QoKSB7XG4gICAgbGV0IHJvd0NvdW50ID0gcHJvamVjdHNUYWJsZS5yb3dzLmxlbmd0aFxuICAgIGZvciAobGV0IGkgPSByb3dDb3VudCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwcm9qZWN0c1RhYmxlLmRlbGV0ZVJvdyhpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9tYWtlQWN0aXZlUHJvamVjdCgpIHtcbiAgICBhcHAuc3dpdGNoQWN0aXZlUHJvamVjdChhcHAuZ2V0UHJvamVjdHMoKVt0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJdKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9sb2FkVGFza3MoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKVxuICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9yZXNldElucHV0RmllbGRzKFthZGRQcm9qZWN0SW5wdXRdKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkge1xuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgbGV0IGR1cGxpY2F0ZVJlc3VsdCA9IGZhbHNlXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSBwcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgZHVwbGljYXRlUmVzdWx0ID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGR1cGxpY2F0ZVJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVByb2plY3QoKSB7XG4gICAgYXBwLmRlbFByb2plY3QodGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0UHJvamVjdElucHV0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBfYWRkUHJvamVjdCgpXG4gICAgfVxuICB9XG5cbiAgLy90YXNrcyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRUYXNrcygpIHtcbiAgICBsZXQgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3QtaGVhZGVyJylcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBwcm9qZWN0TmFtZUhlYWRlci5pbm5lclRleHQgPSBhY3RpdmVQcm9qZWN0Lm5hbWVcbiAgICBcbiAgICBfcmVzZXRUYXNrcygpXG4gICAgX2NyZWF0ZVRhc2tzRE9NKClcbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFRhc2tzKCkge1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG4gICAgdGFza3MuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVUYXNrc0RPTSgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgdGFza3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuXG4gICAgYWN0aXZlUHJvamVjdC5nZXRUYXNrcygpLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxuICAgICAgbGV0IHRhc2tNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tNYWluLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbWFpbicpXG4gICAgICBsZXQgY29tcGxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgY29tcGxldGVCdXR0b24ub25jbGljayA9IF90b2dnbGVDb21wbGV0ZVRhc2tcbiAgICAgIGNvbXBsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJylcbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlKSBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcbiAgICAgIHRhc2tOYW1lLmRhdGFzZXQubW9kYWwgPSAnZWRpdCdcbiAgICAgIHRhc2tOYW1lLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgICAgdGFza05hbWUub25jbGljayA9IF9sb2FkRWRpdFRhc2tNb2RhbFxuICAgICAgbGV0IGRlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkZWwtdGFzay1idG4nKVxuICAgICAgZGVsVGFza0J1dHRvbi5pbm5lclRleHQgPSAneCdcbiAgICAgIGRlbFRhc2tCdXR0b24uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICBkZWxUYXNrQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlVGFza1xuICAgICAgbGV0IHRhc2tJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ3Rhc2staW5mbycpXG4gICAgICBsZXQgdGFza01pc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza01pc2MuY2xhc3NMaXN0LmFkZCgndGFzay1taXNjJylcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZVxuXG4gICAgICB0YXNrTWlzYy5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpXG4gICAgICB0YXNrTWlzYy5hcHBlbmRDaGlsZCh0YXNrRGF0ZSlcblxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza05hbWUpXG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrTWlzYylcblxuICAgICAgdGFza01haW4uYXBwZW5kQ2hpbGQodGFza0luZm8pXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkZWxUYXNrQnV0dG9uKVxuXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlQnV0dG9uKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTWFpbilcblxuICAgICAgdGFza3NEaXYuYXBwZW5kQ2hpbGQodGFza0RpdilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3JldHJpZXZlQWRkVGFza0lucHV0cygpIHtcbiAgICBsZXQgdGFza05hbWVWYWx1ZSA9IHRhc2tOYW1lSW5wdXQudmFsdWVcbiAgICBsZXQgZGF0ZVZhbHVlID0gZGF0ZUlucHV0LnZhbHVlXG4gICAgbGV0IHRhc2tQcmlvcml0eVZhbHVlID0gdGFza1ByaW9yaXR5SW5wdXQudmFsdWVcbiAgICBsZXQgZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWVcblxuICAgIF9yZXNldElucHV0RmllbGRzKFt0YXNrTmFtZUlucHV0LCBkYXRlSW5wdXQsIHRhc2tQcmlvcml0eUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSlcblxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTpgJHt0YXNrTmFtZVZhbHVlfWAsXG4gICAgICBkZXNjcmlwdGlvbjpgJHtkZXNjcmlwdGlvblZhbHVlfWAsXG4gICAgICBkdWVEYXRlOmRhdGVWYWx1ZSxcbiAgICAgIHByaW9yaXR5OmAke3Rhc2tQcmlvcml0eVZhbHVlfWBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0QWRkVGFza0lucHV0cygpIHtcbiAgICBsZXQgaW5wdXRWYWx1ZXMgPSBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKClcbiAgICBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmFkZFRhc2soaW5wdXRWYWx1ZXMudGl0bGUsIGlucHV0VmFsdWVzLmRlc2NyaXB0aW9uLCBpbnB1dFZhbHVlcy5kdWVEYXRlLCBpbnB1dFZhbHVlcy5wcmlvcml0eSlcbiAgICBfbG9hZFRhc2tzKClcbiAgICBfY2xvc2VNb2RhbCgpXG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlVGFzaygpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBhY3RpdmVQcm9qZWN0LmRlbFRhc2sodGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyKVxuICAgIF9sb2FkVGFza3MoKVxuICB9XG5cbiAgZnVuY3Rpb24gX3RvZ2dsZUNvbXBsZXRlVGFzaygpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJcbiAgICBcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsZXRlJykpIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJylcbiAgICB9XG5cbiAgICBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLnRvZ2dsZVRhc2tDb21wbGV0aW9uKGluZGV4KVxuICB9XG5cbiAgLy9nZW5lcmFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfcmVzZXRJbnB1dEZpZWxkcyhpbnB1dHMpIHtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0LnZhbHVlID0gJydcbiAgICB9KVxuICB9XG5cbiAgLy9tb2RhbCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX29wZW5Nb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb24nKVxuICB9XG5cbiAgZnVuY3Rpb24gX2Nsb3NlTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJylcbiAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkQWRkVGFza01vZGFsKCkge1xuICAgIGxldCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJylcbiAgICBtb2RhbFRpdGxlLmlubmVyVGV4dCA9ICdBZGQgVGFzaydcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpXG4gICAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdBZGQnXG4gICAgc3VibWl0QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2VkaXRUYXNrKVxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9zdWJtaXRBZGRUYXNrSW5wdXRzKVxuICAgIF9yZXNldElucHV0RmllbGRzKFt0YXNrTmFtZUlucHV0LCBkYXRlSW5wdXQsIHRhc2tQcmlvcml0eUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSlcbiAgICBfb3Blbk1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkRWRpdFRhc2tNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpXG4gICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXG4gICAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSAnRWRpdCBUYXNrJ1xuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0JylcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0NvbmZpcm0gQ2hhbmdlcydcbiAgICBzdWJtaXRCdXR0b24uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgc3VibWl0QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3N1Ym1pdEFkZFRhc2tJbnB1dHMpXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2VkaXRUYXNrKVxuICAgIF9vcGVuTW9kYWwoKVxuICAgIF9sb2FkRWRpdFRhc2tJbnB1dFZhbHVlcyhpbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9lZGl0VGFzaygpIHtcbiAgICBsZXQgdGFzayA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkuZ2V0VGFza3MoKVsrdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXVxuXG4gICAgdGFzay50aXRsZSA9IHRhc2tOYW1lSW5wdXQudmFsdWVcbiAgICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZVxuICAgIHRhc2suZHVlRGF0ZSA9IGRhdGVJbnB1dC52YWx1ZVxuICAgIHRhc2sucHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZVxuXG4gICAgX2xvYWRUYXNrcygpXG4gICAgX2Nsb3NlTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRFZGl0VGFza0lucHV0VmFsdWVzKGluZGV4KSB7XG4gICAgbGV0IHRhc2sgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmdldFRhc2tzKClbaW5kZXhdXG5cbiAgICB0YXNrTmFtZUlucHV0LnZhbHVlID0gdGFzay50aXRsZVxuICAgIGRhdGVJbnB1dC52YWx1ZSA9IHRhc2suZHVlRGF0ZVxuICAgIHRhc2tQcmlvcml0eUlucHV0LnZhbHVlID0gdGFzay5wcmlvcml0eVxuICAgIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uXG4gIH1cblxuICBfbG9hZFByb2plY3RMaXN0KClcbiAgX2xvYWRUYXNrcygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXIiLCJjb25zdCB0YXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlPWZhbHNlKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIGNvbXBsZXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzayIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHRhc2sgZnJvbSAnLi9tb2R1bGVzL3Rhc2suanMnXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL21vZHVsZXMvcHJvamVjdC5qcydcbmltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9hcHBDb250cm9sbGVyLmpzJ1xuaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMnXG5cbnNjcmVlbkNvbnRyb2xsZXIoKVxuXG4vKlxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRwcmplY3RpblxuICAgIGlmIChhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KCkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KGFkZFByb2plY3RJbnB1dC52YWx1ZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkKGFkZFByb2plY3RJbnB1dClcbiAgfVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=