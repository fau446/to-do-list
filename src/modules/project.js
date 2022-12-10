import task from './task.js'

const project = (name) => {
  let tasks = []

  function addTask(title, description, dueDate, priority, complete=false) {
    let newTask = task(title, description, dueDate, priority, complete)
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

export default project