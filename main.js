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
  //editTaskSubmitButton.addEventListener('click', )
  
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
    console.log(projects)
    projects.forEach((project, index) => {
      let tableRow = projectsTable.insertRow(index + 1)

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
    for (let i = rowCount - 1; i > 0; i--) {
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
    submitButton.removeEventListener('click', test)
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
    submitButton.removeEventListener('click', _submitAddTaskInputs)
    submitButton.addEventListener('click', test)
    _openModal()
    _loadEditTaskInputValues(index)
  }

  function test() {
    console.log("Hooray!")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQSxzQkFBc0IsdURBQU87QUFDN0I7O0FBRUE7QUFDQSxxQkFBcUIsdURBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ25DYTs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixvREFBSTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDeEIrQjs7QUFFOUM7QUFDQSxZQUFZLDZEQUFhOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkUsTUFBTTtBQUNuRjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsY0FBYztBQUM3QixxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ2xRZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUNYZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ007QUFDWTtBQUNNOztBQUU1RCx3RUFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiXG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdXG4gIGxldCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdCgnRGVmYXVsdCcpXG4gIHByb2plY3RzLnB1c2goYWN0aXZlUHJvamVjdClcblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QobmFtZSlcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBY3RpdmVQcm9qZWN0KG5ld0FjdGl2ZVByb2plY3QpIHtcbiAgICBhY3RpdmVQcm9qZWN0ID0gbmV3QWN0aXZlUHJvamVjdFxuICB9XG5cbiAgZnVuY3Rpb24gZGVsUHJvamVjdChpbmRleCkge1xuICAgIGlmIChwcm9qZWN0c1tpbmRleF0gPT09IGFjdGl2ZVByb2plY3QpIHJldHVyblxuXG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGFjdGl2ZVByb2plY3RcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIHN3aXRjaEFjdGl2ZVByb2plY3QsXG4gICAgZGVsUHJvamVjdCxcbiAgICBnZXRBY3RpdmVQcm9qZWN0LFxuICAgIGdldFByb2plY3RzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29udHJvbGxlciIsImltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcydcblxuY29uc3QgcHJvamVjdCA9IChuYW1lKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpXG4gICAgdGFza3MucHVzaChuZXdUYXNrKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVsVGFzayhpbmRleCkge1xuICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3NcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYWRkVGFzayxcbiAgICBkZWxUYXNrLFxuICAgIGdldFRhc2tzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdCIsImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gXCIuL2FwcENvbnRyb2xsZXIuanNcIlxuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgYXBwID0gYXBwQ29udHJvbGxlcigpXG5cbiAgLy9jYWNoZSBET01cbiAgbGV0IHByb2plY3RzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuICBsZXQgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0JylcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJylcbiAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJylcbiAgbGV0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JylcbiAgbGV0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLW1vZGFsJylcbiAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lJylcbiAgbGV0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgbGV0IHRhc2tQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgbGV0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuXG4gIC8vYmluZCBldmVudHNcbiAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9hZGRQcm9qZWN0KVxuICBhZGRQcm9qZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBfc3VibWl0UHJvamVjdElucHV0KVxuICAvL2VkaXRUYXNrU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKVxuICBcbiAgLy9tb2RhbCBldmVudHNcbiAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sb2FkQWRkVGFza01vZGFsKVxuICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgY2xvc2VNb2RhbEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIH0pXG5cbiAgLy9wcm9qZWN0cyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRQcm9qZWN0TGlzdCgpIHtcbiAgICBfcmVzZXRQcm9qZWN0TGlzdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cylcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhYmxlUm93ID0gcHJvamVjdHNUYWJsZS5pbnNlcnRSb3coaW5kZXggKyAxKVxuXG4gICAgICBsZXQgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgcHJvamVjdEl0ZW0ub25jbGljayA9IF9tYWtlQWN0aXZlUHJvamVjdFxuICAgICAgcHJvamVjdEl0ZW0uaW5uZXJUZXh0ID0gcHJvamVjdC5uYW1lXG4gICAgICBwcm9qZWN0SXRlbS5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcblxuICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IF9kZWxldGVQcm9qZWN0XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gJ0RlbGV0ZSdcblxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgfSlcbiAgICBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgbGV0IGFjdGl2ZURPTUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleC1udW1iZXI9XCIke2luZGV4fVwiXWApXG4gICAgICAgIGFjdGl2ZURPTUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0UHJvamVjdExpc3QoKSB7XG4gICAgbGV0IHJvd0NvdW50ID0gcHJvamVjdHNUYWJsZS5yb3dzLmxlbmd0aFxuICAgIGZvciAobGV0IGkgPSByb3dDb3VudCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHByb2plY3RzVGFibGUuZGVsZXRlUm93KGkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX21ha2VBY3RpdmVQcm9qZWN0KCkge1xuICAgIGFwcC5zd2l0Y2hBY3RpdmVQcm9qZWN0KGFwcC5nZXRQcm9qZWN0cygpW3RoaXMuZGF0YXNldC5pbmRleE51bWJlcl0pXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpXG4gICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSkgcmV0dXJuXG4gICAgYXBwLmNyZWF0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW2FkZFByb2plY3RJbnB1dF0pXG4gIH1cblxuICBmdW5jdGlvbiBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSB7XG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBsZXQgZHVwbGljYXRlUmVzdWx0ID0gZmFsc2VcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09IHByb2plY3QubmFtZSkge1xuICAgICAgICBkdXBsaWNhdGVSZXN1bHQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZHVwbGljYXRlUmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlUHJvamVjdCgpIHtcbiAgICBhcHAuZGVsUHJvamVjdCh0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRQcm9qZWN0SW5wdXQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIF9hZGRQcm9qZWN0KClcbiAgICB9XG4gIH1cblxuICAvL3Rhc2tzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFRhc2tzKCkge1xuICAgIGxldCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUtcHJvamVjdC1oZWFkZXInKVxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIHByb2plY3ROYW1lSGVhZGVyLmlubmVyVGV4dCA9IGFjdGl2ZVByb2plY3QubmFtZVxuICAgIFxuICAgIF9yZXNldFRhc2tzKClcbiAgICBfY3JlYXRlVGFza3NET00oKVxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0VGFza3MoKSB7XG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcbiAgICB0YXNrcy5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVRhc2tzRE9NKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGxldCB0YXNrc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG5cbiAgICBhY3RpdmVQcm9qZWN0LmdldFRhc2tzKCkuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGxldCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICBsZXQgdGFza01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza01haW4uY2xhc3NMaXN0LmFkZCgndGFzay1tYWluJylcbiAgICAgIGxldCBsZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGxlZnQuY2xhc3NMaXN0LmFkZCgnbGVmdCcpXG4gICAgICBsZXQgY29tcGxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgY29tcGxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKVxuICAgICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZVxuICAgICAgdGFza05hbWUuZGF0YXNldC5tb2RhbCA9ICdlZGl0J1xuICAgICAgdGFza05hbWUuZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICAvL1xuICAgICAgdGFza05hbWUub25jbGljayA9IF9sb2FkRWRpdFRhc2tNb2RhbFxuICAgICAgbGV0IGRlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkZWwtdGFzay1idG4nKVxuICAgICAgZGVsVGFza0J1dHRvbi5pbm5lclRleHQgPSAneCdcbiAgICAgIGRlbFRhc2tCdXR0b24uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICBkZWxUYXNrQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlVGFza1xuICAgICAgbGV0IHRhc2tJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ3Rhc2staW5mbycpXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICB0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID0gdGFzay5wcmlvcml0eVxuICAgICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmR1ZURhdGVcblxuICAgICAgbGVmdC5hcHBlbmRDaGlsZChjb21wbGV0ZUJ1dHRvbilcbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQodGFza05hbWUpXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChsZWZ0KVxuICAgICAgdGFza01haW4uYXBwZW5kQ2hpbGQoZGVsVGFza0J1dHRvbilcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSlcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tEYXRlKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTWFpbilcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pXG4gICAgICB0YXNrc0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKCkge1xuICAgIGxldCB0YXNrTmFtZVZhbHVlID0gdGFza05hbWVJbnB1dC52YWx1ZVxuICAgIGxldCBkYXRlVmFsdWUgPSBkYXRlSW5wdXQudmFsdWVcbiAgICBsZXQgdGFza1ByaW9yaXR5VmFsdWUgPSB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZVxuICAgIGxldCBkZXNjcmlwdGlvblZhbHVlID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZVxuXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW3Rhc2tOYW1lSW5wdXQsIGRhdGVJbnB1dCwgdGFza1ByaW9yaXR5SW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOmAke3Rhc2tOYW1lVmFsdWV9YCxcbiAgICAgIGRlc2NyaXB0aW9uOmAke2Rlc2NyaXB0aW9uVmFsdWV9YCxcbiAgICAgIGR1ZURhdGU6ZGF0ZVZhbHVlLFxuICAgICAgcHJpb3JpdHk6YCR7dGFza1ByaW9yaXR5VmFsdWV9YFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRBZGRUYXNrSW5wdXRzKCkge1xuICAgIGxldCBpbnB1dFZhbHVlcyA9IF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKVxuICAgIGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkuYWRkVGFzayhpbnB1dFZhbHVlcy50aXRsZSwgaW5wdXRWYWx1ZXMuZGVzY3JpcHRpb24sIGlucHV0VmFsdWVzLmR1ZURhdGUsIGlucHV0VmFsdWVzLnByaW9yaXR5KVxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVUYXNrKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGFjdGl2ZVByb2plY3QuZGVsVGFzayh0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICAvL2dlbmVyYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9yZXNldElucHV0RmllbGRzKGlucHV0cykge1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgIH0pXG4gIH1cblxuICAvL21vZGFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfb3Blbk1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfY2xvc2VNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29uJylcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRBZGRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKVxuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gJ0FkZCBUYXNrJ1xuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0JylcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0FkZCdcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0ZXN0KVxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9zdWJtaXRBZGRUYXNrSW5wdXRzKVxuICAgIF9yZXNldElucHV0RmllbGRzKFt0YXNrTmFtZUlucHV0LCBkYXRlSW5wdXQsIHRhc2tQcmlvcml0eUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSlcbiAgICBfb3Blbk1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkRWRpdFRhc2tNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpXG4gICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXG4gICAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSAnRWRpdCBUYXNrJ1xuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0JylcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0NvbmZpcm0gQ2hhbmdlcydcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0ZXN0KVxuICAgIF9vcGVuTW9kYWwoKVxuICAgIF9sb2FkRWRpdFRhc2tJbnB1dFZhbHVlcyhpbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgY29uc29sZS5sb2coXCJIb29yYXkhXCIpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEVkaXRUYXNrSW5wdXRWYWx1ZXMoaW5kZXgpIHtcblxuICAgIGxldCB0YXNrID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKS5nZXRUYXNrcygpW2luZGV4XVxuXG4gICAgdGFza05hbWVJbnB1dC52YWx1ZSA9IHRhc2sudGl0bGVcbiAgICBkYXRlSW5wdXQudmFsdWUgPSB0YXNrLmR1ZURhdGVcbiAgICB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2sucHJpb3JpdHlcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdGFzay5kZXNjcmlwdGlvblxuICB9XG5cbiAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIF9sb2FkVGFza3MoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5Db250cm9sbGVyIiwiY29uc3QgdGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZT1mYWxzZSkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBjb21wbGV0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2siLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0YXNrIGZyb20gJy4vbW9kdWxlcy90YXNrLmpzJ1xuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcydcbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzJ1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuLypcbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkcHJqZWN0aW5cbiAgICBpZiAoYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdCgpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChhZGRQcm9qZWN0SW5wdXQudmFsdWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZChhZGRQcm9qZWN0SW5wdXQpXG4gIH1cbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9