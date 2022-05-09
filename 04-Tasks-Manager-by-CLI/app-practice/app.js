require('colors');
const argv = require('./config/yargs');

const { showMainMenuReadline, pauseReadline } = require('./helpers/ui_menu_readline');
const { showMainMenuInquirer, 
        pauseInquirer ,
        readInputInquirer,
        } = require('./helpers/ui_menu_inquirer');
const Tasks = require('./models/tasks');
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
