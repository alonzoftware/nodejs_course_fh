
const fs = require('fs');
const pathFile = './db/dbfile.json'

const saveDB = (dataObj) => {

    fs.writeFileSync(pathFile, JSON.stringify(dataObj));
}
const readDB = () => {
    if (!fs.existsSync(pathFile)) {
        return null;
    }
    const info = fs.readFileSync(pathFile, { encoding: 'utf-8' });
    return JSON.parse(info);
}



module.exports = {
    saveDB,
    readDB,
}
