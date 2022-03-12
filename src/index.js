import { addTask } from "./task";
import { addProject, displayProject, projectListeners } from "./project";
import "./style.css";
import Complete from "./complete.png";
import Remove from "./remove.png";

(function initialize() {
  displayProject("inbox");

  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let projectList = document.querySelector(".projects ul");
  projectList.innerHTML = "";
  projects.forEach((pjt) => {
    let li = document.createElement("li");
    li.innerHTML = `${pjt.name} <span><img src="../src/remove.png"></span>`;
    li.setAttribute("data-id", projects.indexOf(pjt));
    projectList.appendChild(li);
  });

  projectListeners();
})();

// Control Forms
(function addTaskControl() {
  const taskForm = document.querySelector(".task-form");
  const addTaskBtn = document.querySelector(".content p");

  addTaskBtn.addEventListener("click", () => {
    taskForm.style.display = "block";
    addTaskBtn.style.display = "none";
  });
})();

(function addProjectControl() {
  const projectForm = document.querySelector(".project-form");
  const addProjectBtn = document.querySelector(".projects p");

  addProjectBtn.addEventListener("click", () => {
    projectForm.style.display = "block";
    addProjectBtn.style.display = "none";
  });
})();

// Submit forms
(function submitForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const formName = form.className;
      e.preventDefault();

      document.querySelector(`.${formName}`).style.display = "none";

      if (formName === "task-form") {
        document.querySelector(".content p").style.display = "block";
      } else {
        document.querySelector(".projects p").style.display = "block";
      }
    });
  });
})();

// Buttons control
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let button = e.target.innerHTML;
    const formName = btn.parentElement.parentElement.className;
    const input = document.querySelector(`.${formName} input`);

    if (button === "Add" && input.value !== "") {
      if (formName === "task-form") {
        const name = input.value;
        const date = new Date().toUTCString();
        const project = document
          .querySelector(".content h2")
          .innerHTML.toLowerCase();
        let id = JSON.parse(localStorage.getItem("tasks") || "[]").length;

        addTask(name, date, project, id);
        displayProject(project);
      } else {
        const name = input.value;
        addProject(name);
      }
    }

    input.value = "";
  });
});

const navItems = document.querySelectorAll(".links li");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    displayProject(item.textContent.toLowerCase());
    document.querySelectorAll(".selected").forEach((element) => {
      element.classList.remove("selected");
    });
    item.className = "selected";
  });
});
