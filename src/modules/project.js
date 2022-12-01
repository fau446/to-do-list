import task from './task.js'

const project = (name) => {
  let tasks = []

  function addTask(title, description, dueDate, priority, complete) {
    let newTask = task(title, description, dueDate, priority, complete)
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

export default project