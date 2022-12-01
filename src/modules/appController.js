import project from "./project.js"

const appController = () => {
  let projects = []
  let activeProject = project('Default')
  projects.push(activeProject)

  function createProject(name) {
    let newProject = project(name)
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

export default appController