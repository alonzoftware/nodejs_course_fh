require('colors');
const argv = require('./config/yargs');
const { showMainMenuReadline, pauseReadline } = require('./helpers/ui_menu_readline');
const { showMainMenuInquirer, pauseInquirer } = require('./helpers/ui_menu_inquirer');
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

    let opt = '';
    do {
        opt = await showMainMenuInquirer();
        console.log({ opt });
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
