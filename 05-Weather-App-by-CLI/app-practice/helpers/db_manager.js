
const fs = require('fs');
const pathFile = './db/dbfile.json'

const savedb = (dataArray) => {

    fs.writeFileSync(pathFile, JSON.stringify(dataArray));
}
const readdb = () => {
    if (!fs.existsSync(pathFile)) {
        return null;
    }
    const info = fs.readFileSync(pathFile, { encoding: 'utf-8' });
    return JSON.parse(info);
}



module.exports = {
    savedb,
    readdb,
}
