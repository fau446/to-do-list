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
  let addTaskSubmitButton = document.querySelector('.submit-add-task')
  let modalOverlay = document.querySelector('.overlay')
  let closeModalButtons = document.querySelectorAll('.close-modal')

  //bind events
  addProjectButton.addEventListener('click', _addProject)
  addProjectInput.addEventListener('keyup', _submitProjectInput)
  
  //modal events
  addTaskButton.addEventListener('click', _openModal)
  addTaskSubmitButton.addEventListener('click', _submitAddTaskInputs)
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
      taskName.dataset.modal = 'detail'
      taskName.onclick = _openModal
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
    //cache DOM
    let taskName = document.querySelector('#task-name')
    let date = document.querySelector('#date')
    let taskPriority = document.querySelector('#priority')
    let description = document.querySelector('#description')

    let taskNameValue = taskName.value
    let dateValue = date.value
    let taskPriorityValue = taskPriority.value
    let descriptionValue = description.value

    _resetInputFields([taskName, date, taskPriority, description])

    return {
      title:`${taskNameValue}`,
      description:`${descriptionValue}`,
      dueDate:dateValue,
      priority:`${taskPriorityValue}`
    }
  }

  function _submitAddTaskInputs() {
    let inputs = _retrieveAddTaskInputs()
    app.getActiveProject().addTask(inputs.title, inputs.description, inputs.dueDate, inputs.priority)
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
    let modal = document.querySelector(`.${this.dataset.modal}-task-modal`)
    //console.log(this.dataset.modal)
    modal.classList.add('on')
    modalOverlay.classList.add('on')
  }

  function _openAddTaskModal() {
    let modal = document.querySelector('.add-task-modal')
    console.log(this.dataset.modal)
    modal.classList.add('on')
    modalOverlay.classList.add('on')
  }

  function _openTaskDetailsModal() {
    let modal = document.querySelector('.detail-task-modal')
    console.log(this.dataset.modal)
    modal.classList.add('on')
    modalOverlay.classList.add('on')
  }

  function _closeModal() {
    let modal = document.querySelector('.modal.on')
    modal.classList.remove('on')
    modalOverlay.classList.remove('on')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ007QUFDWTtBQUNNOztBQUU1RCx3RUFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiXG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdXG4gIGxldCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdCgnRGVmYXVsdCcpXG4gIHByb2plY3RzLnB1c2goYWN0aXZlUHJvamVjdClcblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QobmFtZSlcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBY3RpdmVQcm9qZWN0KG5ld0FjdGl2ZVByb2plY3QpIHtcbiAgICBhY3RpdmVQcm9qZWN0ID0gbmV3QWN0aXZlUHJvamVjdFxuICB9XG5cbiAgZnVuY3Rpb24gZGVsUHJvamVjdChpbmRleCkge1xuICAgIGlmIChwcm9qZWN0c1tpbmRleF0gPT09IGFjdGl2ZVByb2plY3QpIHJldHVyblxuXG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGFjdGl2ZVByb2plY3RcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIHN3aXRjaEFjdGl2ZVByb2plY3QsXG4gICAgZGVsUHJvamVjdCxcbiAgICBnZXRBY3RpdmVQcm9qZWN0LFxuICAgIGdldFByb2plY3RzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29udHJvbGxlciIsImltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcydcblxuY29uc3QgcHJvamVjdCA9IChuYW1lKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpXG4gICAgdGFza3MucHVzaChuZXdUYXNrKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVsVGFzayhpbmRleCkge1xuICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3NcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYWRkVGFzayxcbiAgICBkZWxUYXNrLFxuICAgIGdldFRhc2tzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdCIsImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gXCIuL2FwcENvbnRyb2xsZXIuanNcIlxuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgYXBwID0gYXBwQ29udHJvbGxlcigpXG5cbiAgLy9jYWNoZSBET01cbiAgbGV0IHByb2plY3RzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuICBsZXQgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0JylcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJylcbiAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJylcbiAgbGV0IGFkZFRhc2tTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWFkZC10YXNrJylcbiAgbGV0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JylcbiAgbGV0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLW1vZGFsJylcblxuICAvL2JpbmQgZXZlbnRzXG4gIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfYWRkUHJvamVjdClcbiAgYWRkUHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgX3N1Ym1pdFByb2plY3RJbnB1dClcbiAgXG4gIC8vbW9kYWwgZXZlbnRzXG4gIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb3Blbk1vZGFsKVxuICBhZGRUYXNrU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3N1Ym1pdEFkZFRhc2tJbnB1dHMpXG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZU1vZGFsKVxuICBjbG9zZU1vZGFsQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgfSlcblxuICAvL3Byb2plY3RzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFByb2plY3RMaXN0KCkge1xuICAgIF9yZXNldFByb2plY3RMaXN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFibGVSb3cgPSBwcm9qZWN0c1RhYmxlLmluc2VydFJvdyhpbmRleCArIDEpXG5cbiAgICAgIGxldCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBwcm9qZWN0SXRlbS5vbmNsaWNrID0gX21ha2VBY3RpdmVQcm9qZWN0XG4gICAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0Lm5hbWVcbiAgICAgIHByb2plY3RJdGVtLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuXG4gICAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gX2RlbGV0ZVByb2plY3RcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSAnRGVsZXRlJ1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSlcbiAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbilcbiAgICB9KVxuICAgIF9oaWdobGlnaHRBY3RpdmVQcm9qZWN0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9oaWdobGlnaHRBY3RpdmVQcm9qZWN0KCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QubmFtZSkge1xuICAgICAgICBsZXQgYWN0aXZlRE9NRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4LW51bWJlcj1cIiR7aW5kZXh9XCJdYClcbiAgICAgICAgYWN0aXZlRE9NRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXRQcm9qZWN0TGlzdCgpIHtcbiAgICBsZXQgcm93Q291bnQgPSBwcm9qZWN0c1RhYmxlLnJvd3MubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IHJvd0NvdW50IC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgcHJvamVjdHNUYWJsZS5kZWxldGVSb3coaSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfbWFrZUFjdGl2ZVByb2plY3QoKSB7XG4gICAgYXBwLnN3aXRjaEFjdGl2ZVByb2plY3QoYXBwLmdldFByb2plY3RzKClbdGhpcy5kYXRhc2V0LmluZGV4TnVtYmVyXSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hZGRQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGFkZFByb2plY3RJbnB1dC52YWx1ZS50cmltKClcbiAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09ICcnIHx8IF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkcyhbYWRkUHJvamVjdElucHV0XSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jaGVja0R1cGxpY2F0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIGxldCBkdXBsaWNhdGVSZXN1bHQgPSBmYWxzZVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gcHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGR1cGxpY2F0ZVJlc3VsdCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBkdXBsaWNhdGVSZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVQcm9qZWN0KCkge1xuICAgIGFwcC5kZWxQcm9qZWN0KHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5kYXRhc2V0LmluZGV4TnVtYmVyKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX3N1Ym1pdFByb2plY3RJbnB1dChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgX2FkZFByb2plY3QoKVxuICAgIH1cbiAgfVxuXG4gIC8vdGFza3MgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9sb2FkVGFza3MoKSB7XG4gICAgbGV0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0LWhlYWRlcicpXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgcHJvamVjdE5hbWVIZWFkZXIuaW5uZXJUZXh0ID0gYWN0aXZlUHJvamVjdC5uYW1lXG4gICAgXG4gICAgX3Jlc2V0VGFza3MoKVxuICAgIF9jcmVhdGVUYXNrc0RPTSgpXG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXRUYXNrcygpIHtcbiAgICBsZXQgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuICAgIHRhc2tzLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlVGFza3NET00oKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHRhc2tzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcblxuICAgIGFjdGl2ZVByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgIGxldCB0YXNrTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrTWFpbi5jbGFzc0xpc3QuYWRkKCd0YXNrLW1haW4nKVxuICAgICAgbGV0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgbGVmdC5jbGFzc0xpc3QuYWRkKCdsZWZ0JylcbiAgICAgIGxldCBjb21wbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG4gICAgICB0YXNrTmFtZS5kYXRhc2V0Lm1vZGFsID0gJ2RldGFpbCdcbiAgICAgIHRhc2tOYW1lLm9uY2xpY2sgPSBfb3Blbk1vZGFsXG4gICAgICBsZXQgZGVsVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbC10YXNrLWJ0bicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmlubmVyVGV4dCA9ICd4J1xuICAgICAgZGVsVGFza0J1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIGRlbFRhc2tCdXR0b24ub25jbGljayA9IF9kZWxldGVUYXNrXG4gICAgICBsZXQgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgndGFzay1pbmZvJylcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZVxuXG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGNvbXBsZXRlQnV0dG9uKVxuICAgICAgbGVmdC5hcHBlbmRDaGlsZCh0YXNrTmFtZSlcbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkZWxUYXNrQnV0dG9uKVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0RhdGUpXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tNYWluKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSW5mbylcbiAgICAgIHRhc2tzRGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKSB7XG4gICAgLy9jYWNoZSBET01cbiAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lJylcbiAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuXG4gICAgbGV0IHRhc2tOYW1lVmFsdWUgPSB0YXNrTmFtZS52YWx1ZVxuICAgIGxldCBkYXRlVmFsdWUgPSBkYXRlLnZhbHVlXG4gICAgbGV0IHRhc2tQcmlvcml0eVZhbHVlID0gdGFza1ByaW9yaXR5LnZhbHVlXG4gICAgbGV0IGRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbi52YWx1ZVxuXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW3Rhc2tOYW1lLCBkYXRlLCB0YXNrUHJpb3JpdHksIGRlc2NyaXB0aW9uXSlcblxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTpgJHt0YXNrTmFtZVZhbHVlfWAsXG4gICAgICBkZXNjcmlwdGlvbjpgJHtkZXNjcmlwdGlvblZhbHVlfWAsXG4gICAgICBkdWVEYXRlOmRhdGVWYWx1ZSxcbiAgICAgIHByaW9yaXR5OmAke3Rhc2tQcmlvcml0eVZhbHVlfWBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0QWRkVGFza0lucHV0cygpIHtcbiAgICBsZXQgaW5wdXRzID0gX3JldHJpZXZlQWRkVGFza0lucHV0cygpXG4gICAgYXBwLmdldEFjdGl2ZVByb2plY3QoKS5hZGRUYXNrKGlucHV0cy50aXRsZSwgaW5wdXRzLmRlc2NyaXB0aW9uLCBpbnB1dHMuZHVlRGF0ZSwgaW5wdXRzLnByaW9yaXR5KVxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVUYXNrKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGFjdGl2ZVByb2plY3QuZGVsVGFzayh0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICAvL2dlbmVyYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9yZXNldElucHV0RmllbGRzKGlucHV0cykge1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgIH0pXG4gIH1cblxuICAvL21vZGFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfb3Blbk1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3RoaXMuZGF0YXNldC5tb2RhbH0tdGFzay1tb2RhbGApXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGFzZXQubW9kYWwpXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfb3BlbkFkZFRhc2tNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stbW9kYWwnKVxuICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YXNldC5tb2RhbClcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vcGVuVGFza0RldGFpbHNNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsLXRhc2stbW9kYWwnKVxuICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YXNldC5tb2RhbClcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbG9zZU1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC5vbicpXG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpXG4gIH1cblxuICBfbG9hZFByb2plY3RMaXN0KClcbiAgX2xvYWRUYXNrcygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXIiLCJjb25zdCB0YXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlPWZhbHNlKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIGNvbXBsZXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzayIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHRhc2sgZnJvbSAnLi9tb2R1bGVzL3Rhc2suanMnXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL21vZHVsZXMvcHJvamVjdC5qcydcbmltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9hcHBDb250cm9sbGVyLmpzJ1xuaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMnXG5cbnNjcmVlbkNvbnRyb2xsZXIoKVxuXG4vKlxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRwcmplY3RpblxuICAgIGlmIChhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KCkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KGFkZFByb2plY3RJbnB1dC52YWx1ZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkKGFkZFByb2plY3RJbnB1dClcbiAgfVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=