
const Task = require('./task');

class Tasks {
    _taskList = {};

    constructor(){
        this._taskList = {}; 
    }

    get taskList () {
        return this._taskList;
    }

    set taskList (taskArrayObj){
        this._taskList = taskArrayObj;
    }

    addTask(descrip) {
        const task = new Task(descrip);
        this._taskList[task.id] = task;
    } 
}

module.exports = Tasks;