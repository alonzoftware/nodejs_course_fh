
const Task = require('./task');

class Tasks {
    _taskList = {};

    constructor(){
        this._taskList = {}; 
    }

    addTask(descrip) {
        const task = new Task(descrip);
        this._taskList[task.id] = task;
    } 
}

module.exports = Tasks;