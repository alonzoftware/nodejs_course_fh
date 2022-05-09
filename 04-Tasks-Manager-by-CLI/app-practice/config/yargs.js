const argv = require('yargs')
    .option('r', {
        alias: 'readline',
        type: 'boolean',
        description: 'Menu App using Menu type "readline"',
        demandOption: true,
        // default: true
    })
    .option('i', {
        alias: 'inquirer',
        type: 'boolean',
        description: 'Menu App using Menu type "inquirer"',
        demandOption: true,
        // default: false
    })
    .check((argv, options) => {

        return true;
    })
    .argv;

module.exports = argv;
