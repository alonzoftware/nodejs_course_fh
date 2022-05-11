require("colors");
const { ListType } = require("../helpers/enumerates");
const Task = require("./task");

class Tasks {
  _taskList = {};

  constructor() {
    this._taskList = {};
  }

  get taskList() {
    return this._taskList;
  }
  get taskListArray() {
    let listArray = [];
    Object.keys(this._taskList).forEach((key) => {
      listArray.push(this._taskList[key]);
    });
    return listArray;
  }

  set taskList(taskArrayObj = []) {
    taskArrayObj.forEach((task) => {
      this._taskList[task.id] = task;
    });
  }

  addTask(descrip) {
    const task = new Task(descrip);
    this._taskList[task.id] = task;
  }

  showItemsList(listType = ListType.Completed) {
    let count = 1;
    this.taskListArray.map((task, i) => {
      let descrip = "";
      switch (listType) {
        case ListType.Completed:
          if (task.completedAt) {
            descrip = task.descrip;
            console.log(`${count}. `.green + descrip + `:: ${'Completed'.yellow}`);
          }
          count++;
          break;
        case ListType.Pending:
          if (!task.completedAt) {
            descrip = task.descrip;
            console.log(`${count}. `.green + descrip + `:: ${'Pending'.red}`);
          }
          count++;
          break;
        case ListType.All:
          descrip = task.descrip;
          (task.completedAt) 
          ? console.log(`${count}. `.green + descrip + `:: ${'Completed'.yellow}`)
          : console.log(`${count}. `.green + descrip + `:: ${'Pending'.red}`);
          count++;
          break;
      }
    });
  }
}

module.exports = Tasks;
