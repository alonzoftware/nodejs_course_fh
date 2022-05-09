require('colors');
const showMainMenuReadline = () => {

    return new Promise((resolve, reject) => {
        console.clear();
        console.log('===================='.green);
        console.log('Tasks Manager by CLI'.green);
        console.log('===================='.green);

        console.log(`${'1.'.green} Create Task`);
        console.log(`${'2.'.green} List All Tasks`);
        console.log(`${'3.'.green} List Completed Tasks`);
        console.log(`${'4.'.green} List Pending Tasks`);
        console.log(`${'5.'.green} Set Completed Task`);
        console.log(`${'6.'.green} Erase Task`);
        console.log(`${'0.'.green} Exit \n`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Select an Option : `, (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}
const pauseReadline = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`Press ${'ENTER'.red} for continue : `, (opt) => {
            readline.close();
            resolve();
        });
    })
}


module.exports = {
    showMainMenuReadline,
    pauseReadline
}