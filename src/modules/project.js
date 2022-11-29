import task from './task.js'

const project = (name) => {
  let tasks = []

  function addTask(title, description, dueDate, priority, complete) {
    let newTask = task(title, description, dueDate, priority, complete)
    tasks.push(newTask)
  }

  return {
    name,
    tasks,
    addTask
  }
}

export default project