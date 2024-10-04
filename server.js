const express = require('express');
const cors = require('cors');
const app = express();

const port = 25565;

app.use(cors());
app.use(express.json());

let tasks = [];
let taskId = 0;

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const newTask = {
        id: taskId++,
        task: req.body.task
    };
    tasks.push(newTask);
    res.json(newTask);
});

app.delete("/tasks:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    tasks = tasks.filter((task) => task.id !== taskId);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`listening`)
});