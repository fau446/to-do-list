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

  //only if there is no save file. Otherwise, activeProject = first project in array
  let activeProject = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Default')
  projects.push(activeProject)
  //

  //test

  function saveProjects() {
    localStorage.setItem('savedProjects', 
      JSON.stringify({ 'projects': projects })
    )
  }

  function getProjectsArr() {
    let projectsArr = JSON.parse(localStorage.getItem('savedProjects'))
    console.log(projectsArr)

    projectsArr['projects'].forEach((obj, index) => {
      console.log(obj['name'])
      obj['tasks'].forEach((task, index) => {
        console.log(task['title'])
        console.log(task['description'])
        console.log(task['dueDate'])
        console.log(task['priority'])
        console.log(task['complete'])
      })

    })
  }
  //

  function createProject(name) {
    let newProject = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name)
    projects.push(newProject)
    //save
    saveProjects()
  }

  function switchActiveProject(newActiveProject) {
    activeProject = newActiveProject
  }

  function delProject(index) {
    if (projects[index] === activeProject) return

    projects.splice(index, 1)
    //save
    saveProjects()
  }

  const getActiveProject = () => activeProject

  const getProjects = () => projects

  return {
    createProject,
    switchActiveProject,
    delProject,
    getActiveProject,
    getProjects,
    saveProjects,
    getProjectsArr
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

  function addTask(title, description, dueDate, priority, complete=false) {
    let newTask = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority, complete)
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
    tasks,
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

    app.saveProjects()
    _loadTasks()
    _closeModal()
  }

  function _deleteTask() {
    let activeProject = app.getActiveProject()
    activeProject.delTask(this.dataset.indexNumber)

    app.saveProjects()
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
    app.saveProjects()
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

    app.saveProjects()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsdURBQU87QUFDN0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQix1REFBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdEVhOztBQUU1QjtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLG9EQUFJO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDL0IrQjs7QUFFOUM7QUFDQSxZQUFZLDZEQUFhOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxNQUFNO0FBQ25GO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxlQUFlLGNBQWM7QUFDN0IscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDaFNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7OztVQ1hmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDTTtBQUNZO0FBQ007O0FBRTVELHdFQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCJcblxuY29uc3QgYXBwQ29udHJvbGxlciA9ICgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW11cblxuICAvL29ubHkgaWYgdGhlcmUgaXMgbm8gc2F2ZSBmaWxlLiBPdGhlcndpc2UsIGFjdGl2ZVByb2plY3QgPSBmaXJzdCBwcm9qZWN0IGluIGFycmF5XG4gIGxldCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdCgnRGVmYXVsdCcpXG4gIHByb2plY3RzLnB1c2goYWN0aXZlUHJvamVjdClcbiAgLy9cblxuICAvL3Rlc3RcblxuICBmdW5jdGlvbiBzYXZlUHJvamVjdHMoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NhdmVkUHJvamVjdHMnLCBcbiAgICAgIEpTT04uc3RyaW5naWZ5KHsgJ3Byb2plY3RzJzogcHJvamVjdHMgfSlcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcm9qZWN0c0FycigpIHtcbiAgICBsZXQgcHJvamVjdHNBcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZFByb2plY3RzJykpXG4gICAgY29uc29sZS5sb2cocHJvamVjdHNBcnIpXG5cbiAgICBwcm9qZWN0c0FyclsncHJvamVjdHMnXS5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhvYmpbJ25hbWUnXSlcbiAgICAgIG9ialsndGFza3MnXS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrWyd0aXRsZSddKVxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrWydkZXNjcmlwdGlvbiddKVxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrWydkdWVEYXRlJ10pXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tbJ3ByaW9yaXR5J10pXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tbJ2NvbXBsZXRlJ10pXG4gICAgICB9KVxuXG4gICAgfSlcbiAgfVxuICAvL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdChuYW1lKVxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICAvL3NhdmVcbiAgICBzYXZlUHJvamVjdHMoKVxuICB9XG5cbiAgZnVuY3Rpb24gc3dpdGNoQWN0aXZlUHJvamVjdChuZXdBY3RpdmVQcm9qZWN0KSB7XG4gICAgYWN0aXZlUHJvamVjdCA9IG5ld0FjdGl2ZVByb2plY3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbFByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHNbaW5kZXhdID09PSBhY3RpdmVQcm9qZWN0KSByZXR1cm5cblxuICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICAvL3NhdmVcbiAgICBzYXZlUHJvamVjdHMoKVxuICB9XG5cbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGFjdGl2ZVByb2plY3RcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIHN3aXRjaEFjdGl2ZVByb2plY3QsXG4gICAgZGVsUHJvamVjdCxcbiAgICBnZXRBY3RpdmVQcm9qZWN0LFxuICAgIGdldFByb2plY3RzLFxuICAgIHNhdmVQcm9qZWN0cyxcbiAgICBnZXRQcm9qZWN0c0FyclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcENvbnRyb2xsZXIiLCJpbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnXG5cbmNvbnN0IHByb2plY3QgPSAobmFtZSkgPT4ge1xuICBsZXQgdGFza3MgPSBbXVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGU9ZmFsc2UpIHtcbiAgICBsZXQgbmV3VGFzayA9IHRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGUpXG4gICAgdGFza3MucHVzaChuZXdUYXNrKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVsVGFzayhpbmRleCkge1xuICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKGluZGV4KSB7XG4gICAgbGV0IHRhc2sgPSB0YXNrc1tpbmRleF1cbiAgICB0YXNrLmNvbXBsZXRlID0gdGFzay5jb21wbGV0ZSA9PT0gZmFsc2UgPyB0cnVlIDogZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3NcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdGFza3MsXG4gICAgYWRkVGFzayxcbiAgICBkZWxUYXNrLFxuICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uLFxuICAgIGdldFRhc2tzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdCIsImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gXCIuL2FwcENvbnRyb2xsZXIuanNcIlxuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgYXBwID0gYXBwQ29udHJvbGxlcigpXG5cbiAgLy9jYWNoZSBET01cbiAgbGV0IHByb2plY3RzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuICBsZXQgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0JylcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJylcbiAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJylcbiAgbGV0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JylcbiAgbGV0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLW1vZGFsJylcbiAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lJylcbiAgbGV0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgbGV0IHRhc2tQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgbGV0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuXG4gIC8vYmluZCBldmVudHNcbiAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9hZGRQcm9qZWN0KVxuICBhZGRQcm9qZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBfc3VibWl0UHJvamVjdElucHV0KVxuICBcbiAgLy9tb2RhbCBldmVudHNcbiAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sb2FkQWRkVGFza01vZGFsKVxuICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgY2xvc2VNb2RhbEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIH0pXG5cbiAgLy9wcm9qZWN0cyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRQcm9qZWN0TGlzdCgpIHtcbiAgICBfcmVzZXRQcm9qZWN0TGlzdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhYmxlUm93ID0gcHJvamVjdHNUYWJsZS5pbnNlcnRSb3coaW5kZXgpXG5cbiAgICAgIGxldCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBwcm9qZWN0SXRlbS5vbmNsaWNrID0gX21ha2VBY3RpdmVQcm9qZWN0XG4gICAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0Lm5hbWVcbiAgICAgIHByb2plY3RJdGVtLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuXG4gICAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gX2RlbGV0ZVByb2plY3RcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSAneCdcblxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgfSlcbiAgICBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgbGV0IGFjdGl2ZURPTUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleC1udW1iZXI9XCIke2luZGV4fVwiXWApXG4gICAgICAgIGFjdGl2ZURPTUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0UHJvamVjdExpc3QoKSB7XG4gICAgbGV0IHJvd0NvdW50ID0gcHJvamVjdHNUYWJsZS5yb3dzLmxlbmd0aFxuICAgIGZvciAobGV0IGkgPSByb3dDb3VudCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwcm9qZWN0c1RhYmxlLmRlbGV0ZVJvdyhpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9tYWtlQWN0aXZlUHJvamVjdCgpIHtcbiAgICBhcHAuc3dpdGNoQWN0aXZlUHJvamVjdChhcHAuZ2V0UHJvamVjdHMoKVt0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJdKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9sb2FkVGFza3MoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKVxuICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9yZXNldElucHV0RmllbGRzKFthZGRQcm9qZWN0SW5wdXRdKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkge1xuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgbGV0IGR1cGxpY2F0ZVJlc3VsdCA9IGZhbHNlXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSBwcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgZHVwbGljYXRlUmVzdWx0ID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGR1cGxpY2F0ZVJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVByb2plY3QoKSB7XG4gICAgYXBwLmRlbFByb2plY3QodGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0UHJvamVjdElucHV0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBfYWRkUHJvamVjdCgpXG4gICAgfVxuICB9XG5cbiAgLy90YXNrcyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRUYXNrcygpIHtcbiAgICBsZXQgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3QtaGVhZGVyJylcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBwcm9qZWN0TmFtZUhlYWRlci5pbm5lclRleHQgPSBhY3RpdmVQcm9qZWN0Lm5hbWVcbiAgICBcbiAgICBfcmVzZXRUYXNrcygpXG4gICAgX2NyZWF0ZVRhc2tzRE9NKClcbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFRhc2tzKCkge1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG4gICAgdGFza3MuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVUYXNrc0RPTSgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgdGFza3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuXG4gICAgYWN0aXZlUHJvamVjdC5nZXRUYXNrcygpLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxuICAgICAgbGV0IHRhc2tNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tNYWluLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbWFpbicpXG4gICAgICBsZXQgY29tcGxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgY29tcGxldGVCdXR0b24ub25jbGljayA9IF90b2dnbGVDb21wbGV0ZVRhc2tcbiAgICAgIGNvbXBsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJylcbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlKSBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcbiAgICAgIHRhc2tOYW1lLmRhdGFzZXQubW9kYWwgPSAnZWRpdCdcbiAgICAgIHRhc2tOYW1lLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgICAgdGFza05hbWUub25jbGljayA9IF9sb2FkRWRpdFRhc2tNb2RhbFxuICAgICAgbGV0IGRlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkZWwtdGFzay1idG4nKVxuICAgICAgZGVsVGFza0J1dHRvbi5pbm5lclRleHQgPSAneCdcbiAgICAgIGRlbFRhc2tCdXR0b24uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICBkZWxUYXNrQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlVGFza1xuICAgICAgbGV0IHRhc2tJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ3Rhc2staW5mbycpXG4gICAgICBsZXQgdGFza01pc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza01pc2MuY2xhc3NMaXN0LmFkZCgndGFzay1taXNjJylcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZVxuXG4gICAgICB0YXNrTWlzYy5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpXG4gICAgICB0YXNrTWlzYy5hcHBlbmRDaGlsZCh0YXNrRGF0ZSlcblxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza05hbWUpXG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrTWlzYylcblxuICAgICAgdGFza01haW4uYXBwZW5kQ2hpbGQodGFza0luZm8pXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkZWxUYXNrQnV0dG9uKVxuXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlQnV0dG9uKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTWFpbilcblxuICAgICAgdGFza3NEaXYuYXBwZW5kQ2hpbGQodGFza0RpdilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3JldHJpZXZlQWRkVGFza0lucHV0cygpIHtcbiAgICBsZXQgdGFza05hbWVWYWx1ZSA9IHRhc2tOYW1lSW5wdXQudmFsdWVcbiAgICBsZXQgZGF0ZVZhbHVlID0gZGF0ZUlucHV0LnZhbHVlXG4gICAgbGV0IHRhc2tQcmlvcml0eVZhbHVlID0gdGFza1ByaW9yaXR5SW5wdXQudmFsdWVcbiAgICBsZXQgZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWVcblxuICAgIF9yZXNldElucHV0RmllbGRzKFt0YXNrTmFtZUlucHV0LCBkYXRlSW5wdXQsIHRhc2tQcmlvcml0eUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSlcblxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTpgJHt0YXNrTmFtZVZhbHVlfWAsXG4gICAgICBkZXNjcmlwdGlvbjpgJHtkZXNjcmlwdGlvblZhbHVlfWAsXG4gICAgICBkdWVEYXRlOmRhdGVWYWx1ZSxcbiAgICAgIHByaW9yaXR5OmAke3Rhc2tQcmlvcml0eVZhbHVlfWBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0QWRkVGFza0lucHV0cygpIHtcbiAgICBsZXQgaW5wdXRWYWx1ZXMgPSBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKClcbiAgICBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmFkZFRhc2soaW5wdXRWYWx1ZXMudGl0bGUsIGlucHV0VmFsdWVzLmRlc2NyaXB0aW9uLCBpbnB1dFZhbHVlcy5kdWVEYXRlLCBpbnB1dFZhbHVlcy5wcmlvcml0eSlcblxuICAgIGFwcC5zYXZlUHJvamVjdHMoKVxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVUYXNrKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGFjdGl2ZVByb2plY3QuZGVsVGFzayh0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG5cbiAgICBhcHAuc2F2ZVByb2plY3RzKClcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF90b2dnbGVDb21wbGV0ZVRhc2soKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXG4gICAgXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wbGV0ZScpKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpXG4gICAgfVxuXG4gICAgYXBwLmdldEFjdGl2ZVByb2plY3QoKS50b2dnbGVUYXNrQ29tcGxldGlvbihpbmRleClcbiAgICBhcHAuc2F2ZVByb2plY3RzKClcbiAgfVxuXG4gIC8vZ2VuZXJhbCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX3Jlc2V0SW5wdXRGaWVsZHMoaW5wdXRzKSB7XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnXG4gICAgfSlcbiAgfVxuXG4gIC8vbW9kYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9vcGVuTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJylcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbG9zZU1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEFkZFRhc2tNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpXG4gICAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSAnQWRkIFRhc2snXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKVxuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkJ1xuICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9lZGl0VGFzaylcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbdGFza05hbWVJbnB1dCwgZGF0ZUlucHV0LCB0YXNrUHJpb3JpdHlJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0pXG4gICAgX29wZW5Nb2RhbCgpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEVkaXRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKVxuICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YXNldC5pbmRleE51bWJlclxuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gJ0VkaXQgVGFzaydcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpXG4gICAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdDb25maXJtIENoYW5nZXMnXG4gICAgc3VibWl0QnV0dG9uLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9zdWJtaXRBZGRUYXNrSW5wdXRzKVxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9lZGl0VGFzaylcbiAgICBfb3Blbk1vZGFsKClcbiAgICBfbG9hZEVkaXRUYXNrSW5wdXRWYWx1ZXMoaW5kZXgpXG4gIH1cblxuICBmdW5jdGlvbiBfZWRpdFRhc2soKSB7XG4gICAgbGV0IHRhc2sgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmdldFRhc2tzKClbK3RoaXMuZGF0YXNldC5pbmRleE51bWJlcl1cblxuICAgIHRhc2sudGl0bGUgPSB0YXNrTmFtZUlucHV0LnZhbHVlXG4gICAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWVcbiAgICB0YXNrLmR1ZURhdGUgPSBkYXRlSW5wdXQudmFsdWVcbiAgICB0YXNrLnByaW9yaXR5ID0gdGFza1ByaW9yaXR5SW5wdXQudmFsdWVcblxuICAgIGFwcC5zYXZlUHJvamVjdHMoKVxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkRWRpdFRhc2tJbnB1dFZhbHVlcyhpbmRleCkge1xuICAgIGxldCB0YXNrID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKS5nZXRUYXNrcygpW2luZGV4XVxuXG4gICAgdGFza05hbWVJbnB1dC52YWx1ZSA9IHRhc2sudGl0bGVcbiAgICBkYXRlSW5wdXQudmFsdWUgPSB0YXNrLmR1ZURhdGVcbiAgICB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2sucHJpb3JpdHlcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdGFzay5kZXNjcmlwdGlvblxuICB9XG5cbiAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIF9sb2FkVGFza3MoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5Db250cm9sbGVyIiwiY29uc3QgdGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZT1mYWxzZSkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBjb21wbGV0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2siLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0YXNrIGZyb20gJy4vbW9kdWxlcy90YXNrLmpzJ1xuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcydcbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzJ1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuLypcbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkcHJqZWN0aW5cbiAgICBpZiAoYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdCgpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChhZGRQcm9qZWN0SW5wdXQudmFsdWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZChhZGRQcm9qZWN0SW5wdXQpXG4gIH1cbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9