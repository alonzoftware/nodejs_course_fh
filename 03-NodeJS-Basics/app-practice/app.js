const argv = require('./config/yargs');
const { createFilePromise, createFileAsync } = require('./helpers/multiplication');

console.clear;
// let base = 9;


createFilePromise(argv.b, argv.l, argv.t)
    .then(nameFile => { console.log(`Created FIle ${nameFile}`); })
    .catch(err => console.log(err));

createFileAsync(argv.b, argv.l, argv.t)
    .then(nameFile => { console.log(`Created FIle ${nameFile}`); })
    .catch(err => console.log(err))
