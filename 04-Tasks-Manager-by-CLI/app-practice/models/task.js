const {v4 : uuidv4} = require('uuid');

class Task {
    id = '';
    descrip = '';
    completedAt = null;

    constructor(descrip) {
        this.id = uuidv4();
        this.descrip = descrip;
        this.completedAt = null;
    }


}

module.exports = Task;