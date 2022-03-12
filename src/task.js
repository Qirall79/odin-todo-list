import { displayProject } from "./project";

// Create Task
function Task(name, date, project, id) {
  this.name = name;
  this.date = date;
  this.project = project;
  this.id = id;
}

function addTask(name, date, project, id) {
  let tasks = JSON.parse(window.localStorage.getItem("tasks") || "[]");
  const task = new Task(name, date, project, id);
  tasks.push(task);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    if (task.id == id) {
      let index = tasks.indexOf(task);
      tasks.splice(index, 1);
    }
  });
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  document.querySelector(`.tasks li[data-id="${id}"]`).style.display = "none";
  displayProject("inbox");
}

export { addTask, removeTask };
