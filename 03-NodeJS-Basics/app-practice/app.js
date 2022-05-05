const {crearArchivoPromise,createArchivoAsync} = require ('./helpers/multiplication');

console.clear;
let base = 9;

createArchivoAsync(base)
.then(nomFile => { console.log (`Created FIle ${nomFile}`);})
.catch(err => console.log(err))
