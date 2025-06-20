document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load saved tasks
  loadTasks();

  // Add task when button is clicked
  addButton.addEventListener('click', () => addTask(taskInput.value));

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();
    if (trimmedText === '') {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement('li');
    li.textContent = trimmedText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeFromLocalStorage(trimmedText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    if (save) {
      saveToLocalStorage(trimmedText);
    }
  }

  function saveToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(task => addTask(task, false));
  }
});
