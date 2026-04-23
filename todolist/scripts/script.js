function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function createTask(task) {
  let id = self.crypto.randomUUID();
  const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
  let taskObj = {
    id: id,
    date: date,
    task: task,
  };
  return taskObj;
}

let form = document.querySelector("#add-list");

form.addEventListener("submit", (e) => {
  let taskInput = document.querySelector("#task-input").value;
  e.preventDefault();

  let tasksArray = getLocalStorage("tasks") || [];
  let task = createTask(taskInput);
  tasksArray.push(task);

  setLocalStorage("tasks", tasksArray);
  getTasksDisplayed();
});




function getTasksDisplayed() {
  let tasksContainer = document.querySelector("#tasks-container");
  tasksContainer.innerHTML = "";
  let tasksArray = getLocalStorage("tasks");
  tasksArray.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.innerHTML = `
        <p>${task.task}</p>
        <button data-id="${task.id}" class="edit-button">Edit</button>
        <button data-id="${task.id}" class="delete-button">Delete</button>
    `;
    tasksContainer.appendChild(taskCard);
  });
}





getTasksDisplayed();

document.addEventListener("DOMContentLoaded", () => {
  const tasksContainer = document.querySelector("#tasks-container");

  tasksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      let allTasks = getLocalStorage("tasks") || [];
      const taskIdToDelete = e.target.dataset.id;

      const updatedTasks = allTasks.filter(task => task.id !== taskIdToDelete);

      setLocalStorage("tasks", updatedTasks);
      getTasksDisplayed();
    }
  });
});