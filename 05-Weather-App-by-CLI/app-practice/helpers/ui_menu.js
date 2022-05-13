const inquirer = require('inquirer');
require('colors');


const showMainMenu = async () => {
    const menuOpts = [{
        type: 'list',
        name: 'opt',
        message: 'Select an Option',
        choices: [
            { name: `${'1.'.green} Search Place`, value: 1 },
            { name: `${'2.'.green} Searching History`, value: 2 },
            { name: `${'0.'.green} Exit \n`, value: 0 },
        ]
    }];
    console.clear();
    console.log('===================='.green);
    console.log('Weather App by CLI'.green);
    console.log('===================='.green);

    const { opt } = await inquirer.prompt(menuOpts);
    return opt
}

const showPlacesMenuList = async (placesArray = []) => {


    const choices = placesArray.map((place, i) => {
        const idx = `${i + 1}. `.green;
        return {
            value: place.id,
            name: `${idx} ${place.descrip}`,
        }

    });
    //console.log(choices);
    const menuPlaces = [{
        type: 'list',
        name: 'id',
        message: 'Select a Place',
        choices
    }];
    const { id } = await inquirer.prompt(menuPlaces);
    return id
}

const pause = async () => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.red} for continue : `
    }]
    console.log('\n');
    await inquirer.prompt(question);
}
const readInput = async (message = '') => {

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
const confirm = async (message) => {
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
    showMainMenu,
    pause,
    readInput,
    showPlacesMenuList,
    confirm,
}
