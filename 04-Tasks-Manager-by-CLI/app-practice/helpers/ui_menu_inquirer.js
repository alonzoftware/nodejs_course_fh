const inquirer = require('inquirer');
const { async } = require('rxjs');
require('colors');

const menuOpts = [{
    type: 'list',
    name: 'opt',
    message: 'Select an Option',
    choices: [
        { name: `${'1.'.green} Create Task`, value: '1' },
        { name: `${'2.'.green} List All Tasks`, value: '2' },
        { name: `${'3.'.green} List Completed Tasks`, value: '3' },
        { name: `${'4.'.green} List Pending Tasks`, value: '4' },
        { name: `${'5.'.green} Set Completed Task`, value: '5' },
        { name: `${'6.'.green} Erase Task`, value: '6' },
        { name: `${'0.'.green} Exit \n`, value: '0' },
    ]
}];
const showMainMenuInquirer = async () => {

    console.clear();
    console.log('===================='.green);
    console.log('Tasks Manager by CLI'.green);
    console.log('===================='.green);

    const { opt } = await inquirer.prompt(menuOpts);
    return opt
}

const showTasksMenuList = async (tasksArray = []) => {


    const choices = tasksArray.map((task, i) => {
        const idx = `${i + 1}. `.green;
        return {
            value: task.id,
            name: `${idx} ${task.descrip}`,
        }

    });
    //console.log(choices);
    const menuTasks = [{
        type: 'list',
        name: 'id',
        message: 'Select a Task to Delete',
        choices
    }];
    const { id } = await inquirer.prompt(menuTasks);
    return id
}
const showTasksMenuListForSetCompleted = async (tasksArray = []) => {


    const choices = tasksArray.map((task, i) => {
        const idx = `${i + 1}. `.green;
        const completedAt = (task.completedAt) ? `${task.completedAt}`.green : 'Pending'.red
        return {
            value: task.id,
            name: `${idx} ${task.descrip} :: ${completedAt}`,
            checked: (task.completedAt) ? true : false,
        }

    });
    //console.log(choices);
    const menuTasks = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select a Task to set Completed/Pending',
        choices
    }];
    const { ids } = await inquirer.prompt(menuTasks);
    return ids
}

const pauseInquirer = async () => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.red} for continue : `
    }]
    console.log('\n');
    await inquirer.prompt(question);
}
const readInputInquirer = async (message) => {

    const question = [{
        type: 'input',
        name: 'descrip',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please Ingress a Value';
            }
            return true;
        }
    }]
    console.log('\n');
    const { descrip } = await inquirer.prompt(question);
    return descrip;
}
const confirmInquirer = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }]
    console.log('\n');
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    showMainMenuInquirer,
    pauseInquirer,
    readInputInquirer,
    showTasksMenuList,
    confirmInquirer,
    showTasksMenuListForSetCompleted,

}
