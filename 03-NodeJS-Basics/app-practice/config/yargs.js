const argv = require('yargs')
    .option("b", {
        alias: "base",
        type: "number",
        demandOption: true,
        description: "Multiplication Base"
    })
    .option("l", {
        alias: "list",
        type: "boolean",
        default: false,
        description: "View list of operations"
    })
    .option("t", {
        alias: "limit",
        type: "number",
        default: 10,
        description: "Number Limit of Operations"
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw "ERROR: The base must be a Number";
        }
        if (isNaN(argv.limit)) {
            throw "ERROR: The Number limit must be a Number";
        }
        if (argv.limit < 0) {
            throw "ERROR: The Number limit must be greater than cero";
        }
        return true;
    })
    .argv;

module.exports = argv;