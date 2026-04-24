const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
})


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
    done: false
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
  Toast.fire({
  icon: 'success',
  title: 'Task Added'
})
  getTasksDisplayed();
});



function getTasksDisplayed() {
  let tasksContainer = document.querySelector("#tasks-container");
  tasksContainer.innerHTML = "";

  let tasksArray = getLocalStorage("tasks") || [];

  if (tasksArray.length === 0) {
    tasksContainer.innerHTML = `<p>No tasks...</p>`;
    return;
  }

  tasksArray.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-content");

    taskCard.innerHTML = `
      <p class="text" data-id="${task.id}">${task.task}</p>
      <div>
        <button data-id="${task.id}" class="done-button">
          <span class="material-symbols-outlined">done_all</span>
        </button>

        <button data-id="${task.id}" class="edit-button">
          <span class="material-symbols-outlined">edit</span>
        </button>

        <button data-id="${task.id}" class="delete-button">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;
    tasksContainer.appendChild(taskCard);
  });
}

getTasksDisplayed();

document.addEventListener("DOMContentLoaded", () => {
  const tasksContainer = document.querySelector("#tasks-container");

  tasksContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-button");
    if (deleteBtn) {
      let allTasks = getLocalStorage("tasks") || [];
      const taskIdToDelete = deleteBtn.dataset.id;

      const updatedTasks = allTasks.filter(task => task.id !== taskIdToDelete);

      setLocalStorage("tasks", updatedTasks);
      Toast.fire({
    icon: 'error',
    title: 'Task Deleted',
  })
      getTasksDisplayed();
    }
  });
});



let tasksContainer = document.querySelector("#tasks-container");
tasksContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-button");

  if (editBtn) {
    const taskIdToEdit = editBtn.dataset.id;
    const taskCard = editBtn.closest(".task-content");
    const p = taskCard.querySelector(".text");

    const input = document.createElement("input");
    input.type = "text";
    input.value = p.textContent;

    input.addEventListener("blur", () => {
      p.textContent = input.value;
      input.replaceWith(p);

      let tasks = getLocalStorage("tasks") || [];

      tasks = tasks.map(task => {
        if (task.id == taskIdToEdit) {
          return { ...task, task: input.value };
        }
        return task;
      });
      setLocalStorage("tasks", tasks);
      
      
   Toast.fire({
    icon: 'warning',
    title: 'Task Edited',
  })

      getTasksDisplayed();
    });

    p.replaceWith(input);
    input.focus();
  }
});


tasksContainer.addEventListener("click", (e) => {
  const doneBtn = e.target.closest(".done-button");

  if (doneBtn) {
    const taskIdToDone = doneBtn.dataset.id;
    const taskCard = doneBtn.closest(".task-content");
    const p = taskCard.querySelector(".text");


      let tasks = getLocalStorage("tasks") || [];

      tasks = tasks.map(task => {
        if (task.id == taskIdToDone) {
          return { ...task, done: !task.done };
        }
        return task;
      });

      setLocalStorage("tasks", tasks);
         Toast.fire({
          icon: 'success',
          title: 'Task Done',
        })
      getTasksDisplayed();

  }
});



