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
    /*
    if (task.complete) {
      task.complete = false
    } else {
      task.complete = true
    }
    */
    console.log(task)
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
    //make sure task.complete is modified
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQSxzQkFBc0IsdURBQU87QUFDN0I7O0FBRUE7QUFDQSxxQkFBcUIsdURBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ25DYTs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixvREFBSTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUN0QytCOztBQUU5QztBQUNBLFlBQVksNkRBQWE7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLE1BQU07QUFDbkY7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsY0FBYztBQUM3QixxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDM1JmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7OztVQ1hmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDTTtBQUNZO0FBQ007O0FBRTVELHdFQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCJcblxuY29uc3QgYXBwQ29udHJvbGxlciA9ICgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW11cbiAgbGV0IGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0KCdEZWZhdWx0JylcbiAgcHJvamVjdHMucHVzaChhY3RpdmVQcm9qZWN0KVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdChuYW1lKVxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3aXRjaEFjdGl2ZVByb2plY3QobmV3QWN0aXZlUHJvamVjdCkge1xuICAgIGFjdGl2ZVByb2plY3QgPSBuZXdBY3RpdmVQcm9qZWN0XG4gIH1cblxuICBmdW5jdGlvbiBkZWxQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKHByb2plY3RzW2luZGV4XSA9PT0gYWN0aXZlUHJvamVjdCkgcmV0dXJuXG5cbiAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpXG4gIH1cblxuICBjb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKCkgPT4gYWN0aXZlUHJvamVjdFxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHNcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgc3dpdGNoQWN0aXZlUHJvamVjdCxcbiAgICBkZWxQcm9qZWN0LFxuICAgIGdldEFjdGl2ZVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHNcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBDb250cm9sbGVyIiwiaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJ1xuXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgbGV0IHRhc2tzID0gW11cblxuICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICBsZXQgbmV3VGFzayA9IHRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSlcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spXG4gIH1cblxuICBmdW5jdGlvbiBkZWxUYXNrKGluZGV4KSB7XG4gICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlVGFza0NvbXBsZXRpb24oaW5kZXgpIHtcbiAgICBsZXQgdGFzayA9IHRhc2tzW2luZGV4XVxuICAgIHRhc2suY29tcGxldGUgPSB0YXNrLmNvbXBsZXRlID09PSBmYWxzZSA/IHRydWUgOiBmYWxzZVxuICAgIC8qXG4gICAgaWYgKHRhc2suY29tcGxldGUpIHtcbiAgICAgIHRhc2suY29tcGxldGUgPSBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrLmNvbXBsZXRlID0gdHJ1ZVxuICAgIH1cbiAgICAqL1xuICAgIGNvbnNvbGUubG9nKHRhc2spXG4gIH1cblxuICBjb25zdCBnZXRUYXNrcyA9ICgpID0+IHRhc2tzXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGFkZFRhc2ssXG4gICAgZGVsVGFzayxcbiAgICB0b2dnbGVUYXNrQ29tcGxldGlvbixcbiAgICBnZXRUYXNrc1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3QiLCJpbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tIFwiLi9hcHBDb250cm9sbGVyLmpzXCJcblxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9ICgpID0+IHtcbiAgbGV0IGFwcCA9IGFwcENvbnRyb2xsZXIoKVxuXG4gIC8vY2FjaGUgRE9NXG4gIGxldCBwcm9qZWN0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbiAgbGV0IGFkZFByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1pbnB1dCcpXG4gIGxldCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ0bicpXG4gIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ0bicpXG4gIGxldCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpXG4gIGxldCBjbG9zZU1vZGFsQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZS1tb2RhbCcpXG4gIGxldCB0YXNrTmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbmFtZScpXG4gIGxldCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpXG4gIGxldCB0YXNrUHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpXG4gIGxldCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJylcblxuICAvL2JpbmQgZXZlbnRzXG4gIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfYWRkUHJvamVjdClcbiAgYWRkUHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgX3N1Ym1pdFByb2plY3RJbnB1dClcbiAgXG4gIC8vbW9kYWwgZXZlbnRzXG4gIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbG9hZEFkZFRhc2tNb2RhbClcbiAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIGNsb3NlTW9kYWxCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZU1vZGFsKVxuICB9KVxuXG4gIC8vcHJvamVjdHMgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9sb2FkUHJvamVjdExpc3QoKSB7XG4gICAgX3Jlc2V0UHJvamVjdExpc3QoKVxuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCB0YWJsZVJvdyA9IHByb2plY3RzVGFibGUuaW5zZXJ0Um93KGluZGV4KVxuXG4gICAgICBsZXQgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgcHJvamVjdEl0ZW0ub25jbGljayA9IF9tYWtlQWN0aXZlUHJvamVjdFxuICAgICAgcHJvamVjdEl0ZW0uaW5uZXJUZXh0ID0gcHJvamVjdC5uYW1lXG4gICAgICBwcm9qZWN0SXRlbS5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcblxuICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IF9kZWxldGVQcm9qZWN0XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gJ3gnXG5cbiAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKVxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgIH0pXG4gICAgX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGxldCBhY3RpdmVET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXgtbnVtYmVyPVwiJHtpbmRleH1cIl1gKVxuICAgICAgICBhY3RpdmVET01FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFByb2plY3RMaXN0KCkge1xuICAgIGxldCByb3dDb3VudCA9IHByb2plY3RzVGFibGUucm93cy5sZW5ndGhcbiAgICBmb3IgKGxldCBpID0gcm93Q291bnQgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgcHJvamVjdHNUYWJsZS5kZWxldGVSb3coaSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfbWFrZUFjdGl2ZVByb2plY3QoKSB7XG4gICAgYXBwLnN3aXRjaEFjdGl2ZVByb2plY3QoYXBwLmdldFByb2plY3RzKClbdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hZGRQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGFkZFByb2plY3RJbnB1dC52YWx1ZS50cmltKClcbiAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09ICcnIHx8IF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbYWRkUHJvamVjdElucHV0XSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIGxldCBkdXBsaWNhdGVSZXN1bHQgPSBmYWxzZVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gcHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGR1cGxpY2F0ZVJlc3VsdCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBkdXBsaWNhdGVSZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVQcm9qZWN0KCkge1xuICAgIGFwcC5kZWxQcm9qZWN0KHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5kYXRhc2V0LmluZGV4TnVtYmVyKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX3N1Ym1pdFByb2plY3RJbnB1dChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgX2FkZFByb2plY3QoKVxuICAgIH1cbiAgfVxuXG4gIC8vdGFza3MgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9sb2FkVGFza3MoKSB7XG4gICAgbGV0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0LWhlYWRlcicpXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgcHJvamVjdE5hbWVIZWFkZXIuaW5uZXJUZXh0ID0gYWN0aXZlUHJvamVjdC5uYW1lXG4gICAgXG4gICAgX3Jlc2V0VGFza3MoKVxuICAgIF9jcmVhdGVUYXNrc0RPTSgpXG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXRUYXNrcygpIHtcbiAgICBsZXQgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuICAgIHRhc2tzLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlVGFza3NET00oKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHRhc2tzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcblxuICAgIGFjdGl2ZVByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgIGxldCB0YXNrTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrTWFpbi5jbGFzc0xpc3QuYWRkKCd0YXNrLW1haW4nKVxuICAgICAgbGV0IGNvbXBsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGNvbXBsZXRlQnV0dG9uLm9uY2xpY2sgPSBfdG9nZ2xlQ29tcGxldGVUYXNrXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpXG4gICAgICBpZiAodGFzay5jb21wbGV0ZSkgY29tcGxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKVxuICAgICAgY29tcGxldGVCdXR0b24uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG4gICAgICB0YXNrTmFtZS5kYXRhc2V0Lm1vZGFsID0gJ2VkaXQnXG4gICAgICB0YXNrTmFtZS5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIHRhc2tOYW1lLm9uY2xpY2sgPSBfbG9hZEVkaXRUYXNrTW9kYWxcbiAgICAgIGxldCBkZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGRlbFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsLXRhc2stYnRuJylcbiAgICAgIGRlbFRhc2tCdXR0b24uaW5uZXJUZXh0ID0gJ3gnXG4gICAgICBkZWxUYXNrQnV0dG9uLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgICAgZGVsVGFza0J1dHRvbi5vbmNsaWNrID0gX2RlbGV0ZVRhc2tcbiAgICAgIGxldCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrSW5mby5jbGFzc0xpc3QuYWRkKCd0YXNrLWluZm8nKVxuICAgICAgbGV0IHRhc2tNaXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tNaXNjLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbWlzYycpXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICB0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID0gdGFzay5wcmlvcml0eVxuICAgICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmR1ZURhdGVcblxuICAgICAgdGFza01pc2MuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxuICAgICAgdGFza01pc2MuYXBwZW5kQ2hpbGQodGFza0RhdGUpXG5cbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tOYW1lKVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza01pc2MpXG5cbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKHRhc2tJbmZvKVxuICAgICAgdGFza01haW4uYXBwZW5kQ2hpbGQoZGVsVGFza0J1dHRvbilcblxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjb21wbGV0ZUJ1dHRvbilcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza01haW4pXG5cbiAgICAgIHRhc2tzRGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKSB7XG4gICAgbGV0IHRhc2tOYW1lVmFsdWUgPSB0YXNrTmFtZUlucHV0LnZhbHVlXG4gICAgbGV0IGRhdGVWYWx1ZSA9IGRhdGVJbnB1dC52YWx1ZVxuICAgIGxldCB0YXNrUHJpb3JpdHlWYWx1ZSA9IHRhc2tQcmlvcml0eUlucHV0LnZhbHVlXG4gICAgbGV0IGRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlXG5cbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbdGFza05hbWVJbnB1dCwgZGF0ZUlucHV0LCB0YXNrUHJpb3JpdHlJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6YCR7dGFza05hbWVWYWx1ZX1gLFxuICAgICAgZGVzY3JpcHRpb246YCR7ZGVzY3JpcHRpb25WYWx1ZX1gLFxuICAgICAgZHVlRGF0ZTpkYXRlVmFsdWUsXG4gICAgICBwcmlvcml0eTpgJHt0YXNrUHJpb3JpdHlWYWx1ZX1gXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3N1Ym1pdEFkZFRhc2tJbnB1dHMoKSB7XG4gICAgbGV0IGlucHV0VmFsdWVzID0gX3JldHJpZXZlQWRkVGFza0lucHV0cygpXG4gICAgYXBwLmdldEFjdGl2ZVByb2plY3QoKS5hZGRUYXNrKGlucHV0VmFsdWVzLnRpdGxlLCBpbnB1dFZhbHVlcy5kZXNjcmlwdGlvbiwgaW5wdXRWYWx1ZXMuZHVlRGF0ZSwgaW5wdXRWYWx1ZXMucHJpb3JpdHkpXG4gICAgX2xvYWRUYXNrcygpXG4gICAgX2Nsb3NlTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVRhc2soKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgYWN0aXZlUHJvamVjdC5kZWxUYXNrKHRoaXMuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF90b2dnbGVDb21wbGV0ZVRhc2soKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXG4gICAgXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wbGV0ZScpKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpXG4gICAgfVxuXG4gICAgYXBwLmdldEFjdGl2ZVByb2plY3QoKS50b2dnbGVUYXNrQ29tcGxldGlvbihpbmRleClcbiAgICAvL21ha2Ugc3VyZSB0YXNrLmNvbXBsZXRlIGlzIG1vZGlmaWVkXG4gIH1cblxuICAvL2dlbmVyYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9yZXNldElucHV0RmllbGRzKGlucHV0cykge1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgIH0pXG4gIH1cblxuICAvL21vZGFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfb3Blbk1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfY2xvc2VNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29uJylcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRBZGRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKVxuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gJ0FkZCBUYXNrJ1xuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0JylcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0FkZCdcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZWRpdFRhc2spXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3N1Ym1pdEFkZFRhc2tJbnB1dHMpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW3Rhc2tOYW1lSW5wdXQsIGRhdGVJbnB1dCwgdGFza1ByaW9yaXR5SW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdKVxuICAgIF9vcGVuTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRFZGl0VGFza01vZGFsKCkge1xuICAgIGxldCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJylcbiAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJcbiAgICBtb2RhbFRpdGxlLmlubmVyVGV4dCA9ICdFZGl0IFRhc2snXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKVxuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQ29uZmlybSBDaGFuZ2VzJ1xuICAgIHN1Ym1pdEJ1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZWRpdFRhc2spXG4gICAgX29wZW5Nb2RhbCgpXG4gICAgX2xvYWRFZGl0VGFza0lucHV0VmFsdWVzKGluZGV4KVxuICB9XG5cbiAgZnVuY3Rpb24gX2VkaXRUYXNrKCkge1xuICAgIGxldCB0YXNrID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKS5nZXRUYXNrcygpWyt0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJdXG5cbiAgICB0YXNrLnRpdGxlID0gdGFza05hbWVJbnB1dC52YWx1ZVxuICAgIHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlXG4gICAgdGFzay5kdWVEYXRlID0gZGF0ZUlucHV0LnZhbHVlXG4gICAgdGFzay5wcmlvcml0eSA9IHRhc2tQcmlvcml0eUlucHV0LnZhbHVlXG5cbiAgICBfbG9hZFRhc2tzKClcbiAgICBfY2xvc2VNb2RhbCgpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEVkaXRUYXNrSW5wdXRWYWx1ZXMoaW5kZXgpIHtcbiAgICBsZXQgdGFzayA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkuZ2V0VGFza3MoKVtpbmRleF1cblxuICAgIHRhc2tOYW1lSW5wdXQudmFsdWUgPSB0YXNrLnRpdGxlXG4gICAgZGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlXG4gICAgdGFza1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0YXNrLnByaW9yaXR5XG4gICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb25cbiAgfVxuXG4gIF9sb2FkUHJvamVjdExpc3QoKVxuICBfbG9hZFRhc2tzKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlciIsImNvbnN0IHRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGU9ZmFsc2UpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgY29tcGxldGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0YXNrIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdGFzayBmcm9tICcuL21vZHVsZXMvdGFzay5qcydcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJ1xuaW1wb3J0IGFwcENvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMnXG5pbXBvcnQgc2NyZWVuQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcydcblxuc2NyZWVuQ29udHJvbGxlcigpXG5cbi8qXG4gIGZ1bmN0aW9uIF9hZGRQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGFkZHByamVjdGluXG4gICAgaWYgKGFkZFByb2plY3RJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnIHx8IF9jaGVja0R1cGxpY2F0ZVByb2plY3QoKSkgcmV0dXJuXG4gICAgYXBwLmNyZWF0ZVByb2plY3QoYWRkUHJvamVjdElucHV0LnZhbHVlKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9yZXNldElucHV0RmllbGQoYWRkUHJvamVjdElucHV0KVxuICB9XG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==