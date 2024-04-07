const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: { type: String, require: true },
    desc: { type: String },
    Priority: { type: String },
    Category: { type: String }
})

const TaskModel = mongoose.model("task", taskSchema)

module.exports = TaskModel;