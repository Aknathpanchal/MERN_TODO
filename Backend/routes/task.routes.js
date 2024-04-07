const { Router } = require("express");
const TaskModel = require("../models/Task");

const taskRouter = Router();

taskRouter.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        return res.send(tasks);
    } catch (error) {
        return res.status(500).send({ message: "Error while fetching tasks" });
    }
});

taskRouter.get("/task/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const task = await TaskModel.find({id});
        return res.send(task);
    } catch (error) {
        return res.status(500).send({ message: "Error while fetching tasks" });
    }
});

taskRouter.post("/task", async (req, res) => {
    console.log("POST",req.body)
    try {
        const newTask = await TaskModel.create(req.body);
        return res.status(201).send(newTask);
    } catch (error) {
        return res.status(500).send({ message: "Error while creating task" });
    }
});

taskRouter.delete("/task/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await TaskModel.findByIdAndDelete(id);
        return res.status(200).send({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Error while deleting task" });
    }
});

taskRouter.patch("/task/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.send(updatedTask);
    } catch (error) {
        return res.status(400).send({ message: "Error while updating task" });
    }
});

module.exports = taskRouter;
