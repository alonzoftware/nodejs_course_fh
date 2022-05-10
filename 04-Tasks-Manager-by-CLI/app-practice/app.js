require('colors');
const argv = require('./config/yargs');

const { showMainMenuReadline, pauseReadline } = require('./helpers/ui_menu_readline');
const { showMainMenuInquirer, 
        pauseInquirer ,
        readInputInquirer,
        } = require('./helpers/ui_menu_inquirer');
const Tasks = require('./models/tasks');
const {savedb,readdb} = require('./helpers/db_manager');
console.clear();

const mainReadline = async () => {

    let opt = '';
    do {
        opt = await showMainMenuReadline();
        console.log({ opt });
        if (opt !== '0') await pauseReadline();
    } while (opt !== '0');
    console.log('Good Bye ......');
}
const mainInquirer = async () => {

    const tasks = new Tasks();
    const tasksArrayFromDB = readdb();
    // console.log(tasksArrayFromDB);
    if (tasksArrayFromDB){
        // Object.keys(tasksArrayFromDB).forEach(key => {
        //     console.log(tasksArrayFromDB[key]);
        // })
        tasks.taskList = tasksArrayFromDB;
    }
    // await pauseInquirer();
    let opt = '';
    do {
        opt = await showMainMenuInquirer();
        // console.log({ opt });
        switch (opt) {
            case '1':
                const descrip = await readInputInquirer('Insert Task Description');
                console.log (descrip);
                tasks.addTask(descrip);
                break;
            case '2':
                console.log(tasks._taskList);
                
            break
        
        }

        savedb(tasks.taskList);

        if (opt !== '0') await pauseInquirer();
    } while (opt !== '0');
    console.log('Good Bye ......');
}

if (argv.r) {
    mainReadline();
} else if (argv.i) {
    mainInquirer();
} else {

};
