import project from "./project.js"

const appController = () => {
  let projects = []
  let activeProject

  if (localStorage.getItem('savedProjects') === null) {
    activeProject = project('Default')
    projects.push(activeProject)
  } else {
    loadProjects()
  }

  function saveProjects() {
    localStorage.setItem('savedProjects', 
      JSON.stringify({ 'projects': projects })
    )
  }

  function loadProjects() {
    let projectsArr = JSON.parse(localStorage.getItem('savedProjects'))

    projectsArr['projects'].forEach((obj) => {
      let newProject = project(obj['name'])

      obj['tasks'].forEach((task) => {
        newProject.addTask(task['title'], task['description'], task['dueDate'], task['priority'], task['complete'])
      })

      projects.push(newProject)
      activeProject = projects[0]
    })
  }


  function createProject(name) {
    let newProject = project(name)
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
    loadProjects
  }
}

export default appController