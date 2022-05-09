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
const pauseInquirer = async () => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.red} for continue : `
    }]
    console.log('\n');
    await inquirer.prompt(question);
}


module.exports = {
    showMainMenuInquirer,
    pauseInquirer
}
