import project from "./project.js"

const appController = () => {
  let projects = []

  //only if there is no save file. Otherwise, activeProject = first project in array
  let activeProject = project('Default')
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
    getProjectsArr
  }
}

export default appController