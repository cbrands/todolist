// Remove font-awesome
// Remove materialize
// Restyle app

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}
loadEventListeners();

function retrieveTasksFromLocalStorage() {
  if (localStorage.getItem('tasks') === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem('tasks'));
  }
}

function storeTasksInLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(task) {
  const li = document.createElement('li');
  li.className = 'item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<span class="del">X</span>';
  li.appendChild(link);
  taskList.appendChild(li);
}

function displayTasks(tasks) {
  tasks.forEach(function(task) {
    displayTask(task);
  });
}

// Get Tasks from LS
function getTasks() {
  let tasks = retrieveTasksFromLocalStorage();
  displayTasks(tasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    let tasks = retrieveTasksFromLocalStorage();
    tasks.push(taskInput.value);
    storeTasksInLocalStorage(tasks);
    displayTask(taskInput.value);
    taskInput.value = '';
  }

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks = retrieveTasksFromLocalStorage();

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  storeTasksInLocalStorage(tasks);
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
