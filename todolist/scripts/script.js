
function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

function createTask(task){
    let id = self.crypto.randomUUID()
    let taskObj = {
        id: id,
        task: task
    }
    return taskObj
}


let form = document.querySelector("#add-list")


form.addEventListener("submit", (e) => {
    let taskInput = document.querySelector("#task-input").value
    e.preventDefault()
    
    let tasksArray = getLocalStorage("tasks") || []
    let task = createTask(taskInput)
    tasksArray.push(task)

    setLocalStorage("tasks", tasksArray)
    getTasksDisplayed()
})


function getTasksDisplayed(){
    let tasksContainer = document.querySelector("#tasks-container")
    tasksContainer.innerHTML=  ""
    let tasksArray = getLocalStorage("tasks")
    tasksArray.forEach(task => {
        const taskCard = document.createElement("div")
        taskCard.innerHTML = `
        <p>${task.id}</p>
        <p>${task.task}</p>
    `;
    tasksContainer.appendChild(taskCard);
    })
}

getTasksDisplayed()