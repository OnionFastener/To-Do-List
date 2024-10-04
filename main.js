let form = document.getElementById("taskForm");
let taskList = document.getElementById("taskList");

form.addEventListener('submit', handleTaskSubmission);
window.addEventListener("DOMContentLoaded", fetchTasks);

function handleTaskSubmission(event) {
    let task = document.getElementById('taskInput').value
    event.preventDefault();

    if (task.length >= 25) {
        alert("task is too long (more than 25 characters)");
    } else {
        addTaskToBackend(task);
    }

    document.getElementById('taskInput').value = '';
}

function addTaskToList(task) {
    const newTask = document.createElement('li');
    newTask.textContent = task.task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"
    deleteButton.id = "deleteButton"
    deleteButton.addEventListener("click", function () {
        deleteTask(task.id, newTask);
    });

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

function fetchTasks() {
    fetch("http://50.98.90.185:25565/tasks")
    .then((response) => response.json())
    .then((tasks) => {

        taskList.innerHTML = "";

        for (let i = 0; i < tasks.length ; i++) {
            addTaskToList(tasks[i]);
        };
    })
}

function addTaskToBackend(task) {
    fetch("http://50.98.90.185:25565/tasks", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ task })
    })
    .then((response) => response.json())
    .then((newTask) => addTaskToList(newTask))
}

function deleteTask(taskId, taskElement) {
    fetch(`http://50.98.90.185:25565/tasks/${taskId}`, {
        method: "DELETE"
    })
    .then(()=> {
        taskElement.remove();
    });
};