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

    _resetInputField(taskName)
    _resetInputField(date)
    _resetInputField(taskPriority)
    _resetInputField(description)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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N0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNNO0FBQ1k7QUFDTTs7QUFFNUQsd0VBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9hcHBDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIlxuXG5jb25zdCBhcHBDb250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgcHJvamVjdHMgPSBbXVxuICBsZXQgYWN0aXZlUHJvamVjdCA9IHByb2plY3QoJ0RlZmF1bHQnKVxuICBwcm9qZWN0cy5wdXNoKGFjdGl2ZVByb2plY3QpXG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0KG5hbWUpXG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICB9XG5cbiAgZnVuY3Rpb24gc3dpdGNoQWN0aXZlUHJvamVjdChuZXdBY3RpdmVQcm9qZWN0KSB7XG4gICAgYWN0aXZlUHJvamVjdCA9IG5ld0FjdGl2ZVByb2plY3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbFByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHNbaW5kZXhdID09PSBhY3RpdmVQcm9qZWN0KSByZXR1cm5cblxuICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAoKSA9PiBhY3RpdmVQcm9qZWN0XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0c1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUHJvamVjdCxcbiAgICBzd2l0Y2hBY3RpdmVQcm9qZWN0LFxuICAgIGRlbFByb2plY3QsXG4gICAgZ2V0QWN0aXZlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0c1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcENvbnRyb2xsZXIiLCJpbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnXG5cbmNvbnN0IHByb2plY3QgPSAobmFtZSkgPT4ge1xuICBsZXQgdGFza3MgPSBbXVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIGxldCBuZXdUYXNrID0gdGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KVxuICAgIHRhc2tzLnB1c2gobmV3VGFzaylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbFRhc2soaW5kZXgpIHtcbiAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpXG4gIH1cblxuICBjb25zdCBnZXRUYXNrcyA9ICgpID0+IHRhc2tzXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGFkZFRhc2ssXG4gICAgZGVsVGFzayxcbiAgICBnZXRUYXNrc1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3QiLCJpbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tIFwiLi9hcHBDb250cm9sbGVyLmpzXCJcblxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9ICgpID0+IHtcbiAgbGV0IGFwcCA9IGFwcENvbnRyb2xsZXIoKVxuXG4gIC8vY2FjaGUgRE9NXG4gIGxldCBwcm9qZWN0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbiAgbGV0IGFkZFByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1pbnB1dCcpXG4gIGxldCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ0bicpXG4gIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ0bicpXG4gIGxldCBhZGRUYXNrU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1hZGQtdGFzaycpXG4gIGxldCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpXG4gIGxldCBjbG9zZU1vZGFsQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZS1tb2RhbCcpXG5cbiAgLy9iaW5kIGV2ZW50c1xuICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2FkZFByb2plY3QpXG4gIGFkZFByb2plY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIF9zdWJtaXRQcm9qZWN0SW5wdXQpXG4gIFxuICAvL21vZGFsIGV2ZW50c1xuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29wZW5BZGRUYXNrTW9kYWwpXG4gIGFkZFRhc2tTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlTW9kYWwpXG4gIGNsb3NlTW9kYWxCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZU1vZGFsKVxuICB9KVxuXG4gIC8vcHJvamVjdHMgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9sb2FkUHJvamVjdExpc3QoKSB7XG4gICAgX3Jlc2V0UHJvamVjdExpc3QoKVxuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCB0YWJsZVJvdyA9IHByb2plY3RzVGFibGUuaW5zZXJ0Um93KGluZGV4ICsgMSlcblxuICAgICAgbGV0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIHByb2plY3RJdGVtLm9uY2xpY2sgPSBfbWFrZUFjdGl2ZVByb2plY3RcbiAgICAgIHByb2plY3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3QubmFtZVxuICAgICAgcHJvamVjdEl0ZW0uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG5cbiAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlUHJvamVjdFxuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9ICdEZWxldGUnXG5cbiAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKVxuICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgIH0pXG4gICAgX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QoKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdC5uYW1lKSB7XG4gICAgICAgIGxldCBhY3RpdmVET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXgtbnVtYmVyPVwiJHtpbmRleH1cIl1gKVxuICAgICAgICBhY3RpdmVET01FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFByb2plY3RMaXN0KCkge1xuICAgIGxldCByb3dDb3VudCA9IHByb2plY3RzVGFibGUucm93cy5sZW5ndGhcbiAgICBmb3IgKGxldCBpID0gcm93Q291bnQgLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBwcm9qZWN0c1RhYmxlLmRlbGV0ZVJvdyhpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9tYWtlQWN0aXZlUHJvamVjdCgpIHtcbiAgICBhcHAuc3dpdGNoQWN0aXZlUHJvamVjdChhcHAuZ2V0UHJvamVjdHMoKVt0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJdKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9sb2FkVGFza3MoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKVxuICAgIGlmIChuZXdQcm9qZWN0TmFtZSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkpIHJldHVyblxuICAgIGFwcC5jcmVhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9yZXNldElucHV0RmllbGQoYWRkUHJvamVjdElucHV0KVxuICB9XG5cbiAgZnVuY3Rpb24gX2NoZWNrRHVwbGljYXRlUHJvamVjdChuZXdQcm9qZWN0TmFtZSkge1xuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgbGV0IGR1cGxpY2F0ZVJlc3VsdCA9IGZhbHNlXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSBwcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgZHVwbGljYXRlUmVzdWx0ID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGR1cGxpY2F0ZVJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVByb2plY3QoKSB7XG4gICAgYXBwLmRlbFByb2plY3QodGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIH1cblxuICBmdW5jdGlvbiBfc3VibWl0UHJvamVjdElucHV0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBfYWRkUHJvamVjdCgpXG4gICAgfVxuICB9XG5cbiAgLy90YXNrcyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX2xvYWRUYXNrcygpIHtcbiAgICBsZXQgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3QtaGVhZGVyJylcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBwcm9qZWN0TmFtZUhlYWRlci5pbm5lclRleHQgPSBhY3RpdmVQcm9qZWN0Lm5hbWVcbiAgICBcbiAgICBfcmVzZXRUYXNrcygpXG4gICAgX2NyZWF0ZVRhc2tzRE9NKClcbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXNldFRhc2tzKCkge1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG4gICAgdGFza3MuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVUYXNrc0RPTSgpIHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KClcbiAgICBsZXQgdGFza3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKVxuXG4gICAgYWN0aXZlUHJvamVjdC5nZXRUYXNrcygpLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxuICAgICAgbGV0IHRhc2tNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tNYWluLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbWFpbicpXG4gICAgICBsZXQgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBsZWZ0LmNsYXNzTGlzdC5hZGQoJ2xlZnQnKVxuICAgICAgbGV0IGNvbXBsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGNvbXBsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJylcbiAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcbiAgICAgIGxldCBkZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGRlbFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsLXRhc2stYnRuJylcbiAgICAgIGRlbFRhc2tCdXR0b24uaW5uZXJUZXh0ID0gJ3gnXG4gICAgICBkZWxUYXNrQnV0dG9uLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgICAgZGVsVGFza0J1dHRvbi5vbmNsaWNrID0gX2RlbGV0ZVRhc2tcbiAgICAgIGxldCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrSW5mby5jbGFzc0xpc3QuYWRkKCd0YXNrLWluZm8nKVxuICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHlcbiAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlXG5cbiAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoY29tcGxldGVCdXR0b24pXG4gICAgICBsZWZ0LmFwcGVuZENoaWxkKHRhc2tOYW1lKVxuICAgICAgdGFza01haW4uYXBwZW5kQ2hpbGQobGVmdClcbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKGRlbFRhc2tCdXR0b24pXG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpXG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRGF0ZSlcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza01haW4pXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKVxuICAgICAgdGFza3NEaXYuYXBwZW5kQ2hpbGQodGFza0RpdilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX3JldHJpZXZlQWRkVGFza0lucHV0cygpIHtcbiAgICAvL2NhY2hlIERPTVxuICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLW5hbWUnKVxuICAgIGxldCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpXG5cbiAgICBsZXQgdGFza05hbWVWYWx1ZSA9IHRhc2tOYW1lLnZhbHVlXG4gICAgbGV0IGRhdGVWYWx1ZSA9IGRhdGUudmFsdWVcbiAgICBsZXQgdGFza1ByaW9yaXR5VmFsdWUgPSB0YXNrUHJpb3JpdHkudmFsdWVcbiAgICBsZXQgZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uLnZhbHVlXG5cbiAgICBfcmVzZXRJbnB1dEZpZWxkKHRhc2tOYW1lKVxuICAgIF9yZXNldElucHV0RmllbGQoZGF0ZSlcbiAgICBfcmVzZXRJbnB1dEZpZWxkKHRhc2tQcmlvcml0eSlcbiAgICBfcmVzZXRJbnB1dEZpZWxkKGRlc2NyaXB0aW9uKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOmAke3Rhc2tOYW1lVmFsdWV9YCxcbiAgICAgIGRlc2NyaXB0aW9uOmAke2Rlc2NyaXB0aW9uVmFsdWV9YCxcbiAgICAgIGR1ZURhdGU6ZGF0ZVZhbHVlLFxuICAgICAgcHJpb3JpdHk6YCR7dGFza1ByaW9yaXR5VmFsdWV9YFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRBZGRUYXNrSW5wdXRzKCkge1xuICAgIGxldCBpbnB1dHMgPSBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKClcbiAgICBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpLmFkZFRhc2soaW5wdXRzLnRpdGxlLCBpbnB1dHMuZGVzY3JpcHRpb24sIGlucHV0cy5kdWVEYXRlLCBpbnB1dHMucHJpb3JpdHkpXG4gICAgX2xvYWRUYXNrcygpXG4gICAgX2Nsb3NlTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVRhc2soKSB7XG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBhcHAuZ2V0QWN0aXZlUHJvamVjdCgpXG4gICAgYWN0aXZlUHJvamVjdC5kZWxUYXNrKHRoaXMuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFRhc2tzKClcbiAgfVxuXG4gIC8vZ2VuZXJhbCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gX3Jlc2V0SW5wdXRGaWVsZChpbnB1dCkge1xuICAgIGlucHV0LnZhbHVlID0gJydcbiAgfVxuXG4gIC8vbW9kYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9vcGVuQWRkVGFza01vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfY2xvc2VNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwub24nKVxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29uJylcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICB9XG5cbiAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gIF9sb2FkVGFza3MoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5Db250cm9sbGVyIiwiY29uc3QgdGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZT1mYWxzZSkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBjb21wbGV0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2siLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0YXNrIGZyb20gJy4vbW9kdWxlcy90YXNrLmpzJ1xuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnXG5pbXBvcnQgYXBwQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcydcbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9zY3JlZW5Db250cm9sbGVyLmpzJ1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuLypcbiAgZnVuY3Rpb24gX2FkZFByb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3ROYW1lID0gYWRkcHJqZWN0aW5cbiAgICBpZiAoYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgX2NoZWNrRHVwbGljYXRlUHJvamVjdCgpKSByZXR1cm5cbiAgICBhcHAuY3JlYXRlUHJvamVjdChhZGRQcm9qZWN0SW5wdXQudmFsdWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZChhZGRQcm9qZWN0SW5wdXQpXG4gIH1cbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9