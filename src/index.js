import task from './modules/task.js'
import project from './modules/project.js'
import appController from './modules/appController.js'
import screenController from './modules/screenController.js'


/*
app.createProject('Test')
app.getActiveProject().addTask("Task 1", 'test description', 'Oct. 15', 1, false)
app.getActiveProject().addTask("Task 2", 'test description', 'Oct. 15', 1, false)
app.getActiveProject().addTask("Task 3", 'test description', 'Oct. 15', 1, false)
app.getActiveProject().delTask(1)
app.switchActiveProject(app.getProjects()[1])
console.log(app.getActiveProject())
*/

screenController()

/*
  function _addProject() {
    let newProjectName = addprjectin
    if (addProjectInput.value.trim() === '' || _checkDuplicateProject()) return
    app.createProject(addProjectInput.value)
    _loadProjectList()
    _resetInputField(addProjectInput)
  }
*/