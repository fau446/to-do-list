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

  //test
  activeProject.addTask('Task 1', 'Hello THere', 'Oct. 15', 'Normal', false)
  activeProject.addTask('Task 2', 'Test', 'Dec. 15', 'Important', true)


  //test

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
  addTaskButton.addEventListener('click', _openAddTaskModal)
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
    _resetInputField(addProjectInput)
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

    activeProject.getTasks().forEach((task) => {
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
      let delTaskButton = document.createElement('button')
      delTaskButton.classList.add('del-task-btn')
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

    return {
      title:`${taskName.value}`,
      description:`${description.value}`,
      dueDate:date.value,
      priority:`${taskPriority.value}`
    }
  }

  function _submitAddTaskInputs() {
    //activeProject.addTask
    let inputs = _retrieveAddTaskInputs()
    app.getActiveProject().addTask(inputs.title, inputs.description, inputs.dueDate, inputs.priority)
    _loadTasks()
    _closeModal()
  }

  //general functions
  function _resetInputField(input) {
    input.value = ''
  }

  //modal functions
  function _openAddTaskModal() {
    let modal = document.querySelector('.add-task-modal')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiXG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtdXG4gIGxldCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdCgnRGVmYXVsdCcpXG4gIHByb2plY3RzLnB1c2goYWN0aXZlUHJvamVjdClcblxuICAvL3Rlc3RcbiAgYWN0aXZlUHJvamVjdC5hZGRUYXNrKCdUYXNrIDEnLCAnSGVsbG8gVEhlcmUnLCAnT2N0LiAxNScsICdOb3JtYWwnLCBmYWxzZSlcbiAgYWN0aXZlUHJvamVjdC5hZGRUYXNrKCdUYXNrIDInLCAnVGVzdCcsICdEZWMuIDE1JywgJ0ltcG9ydGFudCcsIHRydWUpXG5cblxuICAvL3Rlc3RcblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QobmFtZSlcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBY3RpdmVQcm9qZWN0KG5ld0FjdGl2ZVByb2plY3QpIHtcbiAgICBhY3RpdmVQcm9qZWN0ID0gbmV3QWN0aXZlUHJvamVjdFxuICB9XG5cbiAgZnVuY3Rpb24gZGVsUHJvamVjdChpbmRleCkge1xuICAgIGlmIChwcm9qZWN0c1tpbmRleF0gPT09IGFjdGl2ZVByb2plY3QpIHJldHVyblxuXG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGFjdGl2ZVByb2plY3RcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzXG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIHN3aXRjaEFjdGl2ZVByb2plY3QsXG4gICAgZGVsUHJvamVjdCxcbiAgICBnZXRBY3RpdmVQcm9qZWN0LFxuICAgIGdldFByb2plY3RzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29udHJvbGxlciIsImltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcydcblxuY29uc3QgcHJvamVjdCA9IChuYW1lKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpXG4gICAgdGFza3MucHVzaChuZXdUYXNrKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVsVGFzayhpbmRleCkge1xuICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3NcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYWRkVGFzayxcbiAgICBkZWxUYXNrLFxuICAgIGdldFRhc2tzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdCIsImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gXCIuL2FwcENvbnRyb2xsZXIuanNcIlxuXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgYXBwID0gYXBwQ29udHJvbGxlcigpXG5cbiAgLy9jYWNoZSBET01cbiAgbGV0IHByb2plY3RzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuICBsZXQgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0JylcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJylcbiAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJylcbiAgbGV0IGFkZFRhc2tTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWFkZC10YXNrJylcbiAgbGV0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JylcbiAgbGV0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLW1vZGFsJylcblxuICAvL2JpbmQgZXZlbnRzXG4gIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfYWRkUHJvamVjdClcbiAgYWRkUHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgX3N1Ym1pdFByb2plY3RJbnB1dClcbiAgXG4gIC8vbW9kYWwgZXZlbnRzXG4gIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb3BlbkFkZFRhc2tNb2RhbClcbiAgYWRkVGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9zdWJtaXRBZGRUYXNrSW5wdXRzKVxuICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgY2xvc2VNb2RhbEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIH0pXG5cbiAgLy9wcm9qZWN0cyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRQcm9qZWN0TGlzdCgpIHtcbiAgICBfcmVzZXRQcm9qZWN0TGlzdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cylcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHRhYmxlUm93ID0gcHJvamVjdHNUYWJsZS5pbnNlcnRSb3coaW5kZXggKyAxKVxuXG4gICAgICBsZXQgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgcHJvamVjdEl0ZW0ub25jbGljayA9IF9tYWtlQWN0aXZlUHJvamVjdFxuICAgICAgcHJvamVjdEl0ZW0uaW5uZXJUZXh0ID0gcHJvamVjdC5uYW1lXG4gICAgICBwcm9qZWN0SXRlbS5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcblxuICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IF9kZWxldGVQcm9qZWN0XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gJ0RlbGV0ZSdcblxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgfSlcbiAgICBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfaGlnaGxpZ2h0QWN0aXZlUHJvamVjdCgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgbGV0IGFjdGl2ZURPTUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleC1udW1iZXI9XCIke2luZGV4fVwiXWApXG4gICAgICAgIGFjdGl2ZURPTUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0UHJvamVjdExpc3QoKSB7XG4gICAgbGV0IHJvd0NvdW50ID0gcHJvamVjdHNUYWJsZS5yb3dzLmxlbmd0aFxuICAgIGZvciAobGV0IGkgPSByb3dDb3VudCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHByb2plY3RzVGFibGUuZGVsZXRlUm93KGkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX21ha2VBY3RpdmVQcm9qZWN0KCkge1xuICAgIGFwcC5zd2l0Y2hBY3RpdmVQcm9qZWN0KGFwcC5nZXRQcm9qZWN0cygpW3RoaXMuZGF0YXNldC5pbmRleE51bWJlcl0pXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpXG4gICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSkgcmV0dXJuXG4gICAgYXBwLmNyZWF0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZChhZGRQcm9qZWN0SW5wdXQpXG4gIH1cblxuICBmdW5jdGlvbiBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSB7XG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBsZXQgZHVwbGljYXRlUmVzdWx0ID0gZmFsc2VcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09IHByb2plY3QubmFtZSkge1xuICAgICAgICBkdXBsaWNhdGVSZXN1bHQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZHVwbGljYXRlUmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlUHJvamVjdCgpIHtcbiAgICBhcHAuZGVsUHJvamVjdCh0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRQcm9qZWN0SW5wdXQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIF9hZGRQcm9qZWN0KClcbiAgICB9XG4gIH1cblxuICAvL3Rhc2tzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFRhc2tzKCkge1xuICAgIGxldCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUtcHJvamVjdC1oZWFkZXInKVxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIHByb2plY3ROYW1lSGVhZGVyLmlubmVyVGV4dCA9IGFjdGl2ZVByb2plY3QubmFtZVxuICAgIFxuICAgIF9yZXNldFRhc2tzKClcbiAgICBfY3JlYXRlVGFza3NET00oKVxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0VGFza3MoKSB7XG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcbiAgICB0YXNrcy5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVRhc2tzRE9NKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGxldCB0YXNrc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG5cbiAgICBhY3RpdmVQcm9qZWN0LmdldFRhc2tzKCkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgIGxldCB0YXNrTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrTWFpbi5jbGFzc0xpc3QuYWRkKCd0YXNrLW1haW4nKVxuICAgICAgbGV0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgbGVmdC5jbGFzc0xpc3QuYWRkKCdsZWZ0JylcbiAgICAgIGxldCBjb21wbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG4gICAgICBsZXQgZGVsVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbC10YXNrLWJ0bicpXG4gICAgICBsZXQgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgndGFzay1pbmZvJylcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZVxuXG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKGNvbXBsZXRlQnV0dG9uKVxuICAgICAgbGVmdC5hcHBlbmRDaGlsZCh0YXNrTmFtZSlcbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkZWxUYXNrQnV0dG9uKVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0RhdGUpXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tNYWluKVxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSW5mbylcbiAgICAgIHRhc2tzRGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKSB7XG4gICAgLy9jYWNoZSBET01cbiAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lJylcbiAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOmAke3Rhc2tOYW1lLnZhbHVlfWAsXG4gICAgICBkZXNjcmlwdGlvbjpgJHtkZXNjcmlwdGlvbi52YWx1ZX1gLFxuICAgICAgZHVlRGF0ZTpkYXRlLnZhbHVlLFxuICAgICAgcHJpb3JpdHk6YCR7dGFza1ByaW9yaXR5LnZhbHVlfWBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0QWRkVGFza0lucHV0cygpIHtcbiAgICAvL2FjdGl2ZVByb2plY3QuYWRkVGFza1xuICAgIGxldCBpbnB1dHMgPSBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKClcbiAgICBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmFkZFRhc2soaW5wdXRzLnRpdGxlLCBpbnB1dHMuZGVzY3JpcHRpb24sIGlucHV0cy5kdWVEYXRlLCBpbnB1dHMucHJpb3JpdHkpXG4gICAgX2xvYWRUYXNrcygpXG4gICAgX2Nsb3NlTW9kYWwoKVxuICB9XG5cbiAgLy9nZW5lcmFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfcmVzZXRJbnB1dEZpZWxkKGlucHV0KSB7XG4gICAgaW5wdXQudmFsdWUgPSAnJ1xuICB9XG5cbiAgLy9tb2RhbCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX29wZW5BZGRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLW1vZGFsJylcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvbicpXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ29uJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbG9zZU1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC5vbicpXG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpXG4gIH1cblxuICBfbG9hZFByb2plY3RMaXN0KClcbiAgX2xvYWRUYXNrcygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXIiLCJjb25zdCB0YXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlPWZhbHNlKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIGNvbXBsZXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzayIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHRhc2sgZnJvbSAnLi9tb2R1bGVzL3Rhc2suanMnXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL21vZHVsZXMvcHJvamVjdC5qcydcbmltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9hcHBDb250cm9sbGVyLmpzJ1xuaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL3NjcmVlbkNvbnRyb2xsZXIuanMnXG5cbnNjcmVlbkNvbnRyb2xsZXIoKVxuXG4vKlxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRwcmplY3RpblxuICAgIGlmIChhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KCkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KGFkZFByb2plY3RJbnB1dC52YWx1ZSlcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgICBfcmVzZXRJbnB1dEZpZWxkKGFkZFByb2plY3RJbnB1dClcbiAgfVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=