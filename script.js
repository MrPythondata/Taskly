const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");
const importBtn = document.getElementById("import-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function renderTasks() {
    taskList.innerHTML = "";
  
    let filtered = tasks.filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    });
  
    filtered.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTask(index));
  
      const span = document.createElement("span");
      span.textContent = task.title;
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑";
      delBtn.addEventListener("click", () => deleteTask(index));
  
      li.append(checkbox, span, delBtn);
      taskList.appendChild(li);
    });
  }
  function addTask() {
    const title = taskInput.value.trim();
    if (!title) return;
  
    tasks.push({ title, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
  
  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.getAttribute("data-filter");
      renderTasks();
    });
  });
  
  importBtn.addEventListener("click", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = await res.json();
  
    data.forEach(item => {
      tasks.push({ title: item.title, completed: item.completed });
    });
  
    saveTasks();
    renderTasks();
  });
  addTaskBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", renderTasks);
VANTA.WAVES({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x111111
  });
  