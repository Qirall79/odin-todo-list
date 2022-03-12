import { removeTask } from "./task";

// Create Project
function Project(name) {
  this.name = name;
}

function addProject(name) {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  const project = new Project(name);
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
  let projectList = document.querySelector(".projects ul");
  projectList.innerHTML = "";
  projects.forEach((pjt) => {
    let li = document.createElement("li");
    li.innerHTML = `${pjt.name} <span><img src="../src/remove.png"></span>`;
    li.setAttribute("data-id", projects.indexOf(pjt));
    projectList.appendChild(li);
  });

  projectListeners();
}

function displayProject(project) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  document.querySelector(".content h2").innerHTML = project;

  // Clear tasks list
  let taskList = document.querySelector(".tasks");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    if (task.project === project) {
      let li = document.createElement("li");
      li.innerHTML = `<div><div class="mark"><img src="../src/complete.png"></div> ${task.name}</div> <span>${task.date} <img src="../src/remove.png"></span>`;
      li.setAttribute("data-id", task.id);
      taskList.appendChild(li);
    }
  });

  //Remove task
  let taskRemoveBtn = document.querySelectorAll(".tasks li img");
  taskRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeTask(btn.parentElement.parentElement.dataset.id);
    });
  });

  // Mark complete
  const completeBtn = document.querySelectorAll(".mark");
  if (completeBtn) {
    completeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskId = btn.parentElement.parentElement.dataset.id;
        document.querySelector(
          `.content li[data-id="${taskId}"]`
        ).style.textDecoration = "line-through";

        document.querySelector(
          `li[data-id="${taskId}"] .mark img`
        ).style.display = "inline-block";

        const taskProject = document
          .querySelector(".content h2")
          .innerHTML.toLowerCase();
        setTimeout(removeTask, 1000, taskId);
        setTimeout(displayProject, 1000, taskProject);
      });
    });
  }
}

function projectListeners() {
  let projects = document.querySelectorAll(".projects li");
  projects.forEach((project) => {
    project.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") {
        displayProject(project.textContent.toLowerCase());
        document.querySelectorAll(".selected").forEach((element) => {
          element.classList.remove("selected");
        });
        project.className = "selected";
      }
    });
  });

  let projectRemoveBtn = document.querySelectorAll(".projects li img");
  projectRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeProject(btn.parentElement.parentElement.dataset.id);
    });
  });
}

function removeProject(id) {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  projects.splice(id, 1);
  localStorage.setItem("projects", JSON.stringify(projects));

  document.querySelector(`.projects li[data-id="${id}"]`).style.display =
    "none";
  displayProject("inbox");
}

export { addProject, displayProject, projectListeners };
