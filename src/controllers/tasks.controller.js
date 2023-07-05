import Task from '../models/task.model.js'

const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id})

    res.json(tasks)
}

const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(400).json({message: "Task not found"})

    res.json(task)
}

const createTask = async (req, res) => {
    const { title, description, date } = req.body
    
    const newTask = new Task({title, description, date, user: req.user.id})
    const taskSaved = await newTask.save()

    res.json({
        id: taskSaved._id,
        title: taskSaved.title,
        description: taskSaved.description,
        date: taskSaved.date
    })
}

const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(400).json({message: "Task not found"})

    res.sendStatus(204)
}

const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!task) return res.status(400).json({message: "Task not found"})

    res.json(task)
}

export {getTasks, getTask, createTask, deleteTask, updateTask}