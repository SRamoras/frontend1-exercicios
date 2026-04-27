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


function updateStats() {
  const tasks = getLocalStorage("tasks") || [];
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  document.querySelector("#stat-total").textContent = total;
  document.querySelector("#stat-done").textContent = done;
  document.querySelector("#stat-pending").textContent = pending;
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
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks...</p>`;
    updateStats();
    return;
  }

  tasksArray.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-content");
    if (task.done) taskCard.classList.add("task-done");

    taskCard.innerHTML = `
    <p class="text" data-id="${task.id}">${task.task}</p>
    <div class="task-actions">
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
      <div class="date">
        ${new Date(task.date).toLocaleString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  `;
    tasksContainer.appendChild(taskCard);
  });
  updateStats();
}


getTasksDisplayed();

document.addEventListener("DOMContentLoaded", () => {
  const tasksContainer = document.querySelector("#tasks-container");

  tasksContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-button");

    if (deleteBtn) {
      const taskIdToDelete = deleteBtn.dataset.id;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          let allTasks = getLocalStorage("tasks") || [];

          const updatedTasks = allTasks.filter(
            task => task.id !== taskIdToDelete
          );

          setLocalStorage("tasks", updatedTasks);

          getTasksDisplayed();

          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success"
          });
        }
      });
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

    let tasks = getLocalStorage("tasks") || [];
    let updatedTask;

    tasks = tasks.map(task => {
      if (task.id == taskIdToDone) {
        updatedTask = { ...task, done: !task.done };
        return updatedTask;
      }
      return task;
    });

    setLocalStorage("tasks", tasks);

    Toast.fire({
      icon: updatedTask.done ? 'success' : 'warning',
      title: updatedTask.done ? 'Task Done' : 'Task Undone',
    });

    getTasksDisplayed();
  }
});