let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("task-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const text = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  const task = { text, dueDate, priority, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  this.reset();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = \`
      <span>\${task.text} - Due: \${task.dueDate || "No date"} - Priority: \${task.priority}</span>
      <div>
        <button onclick="toggleComplete(\${index})">\${task.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(\${index})">Delete</button>
      </div>
    \`;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();