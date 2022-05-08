const colors = require('colors');
const fs = require("fs");
const path = "./output/";

const createFilePromise = (base = 0, list = false, limit) => {
  return new Promise((resolve, reject) => {
    let output = "";
    output += `=======================\n`;
    output += `TABLE ${base} - Promise\n`;
    output += `=======================\n`;

    output += genOutput(base, limit);
    if (list) {
      const line = `=======================`.red;
      console.log(line);
      console.log(`TABLE ${base} - Promise`.red);
      console.log(colors.red(`=======================`));

      console.log(genOutputLog(base, limit));
    }
    // fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    //   });
    const nameFile = `table-${base}-promise.txt`;
    fs.writeFile(path + nameFile, output, (err) => {
      if (err) reject(err);
      resolve(nameFile);
    });
  });
};

const createFileAsync = async (base = 0, list = false, limit) => {
  try {
    let output = "";
    output += `=======================\n`;
    output += `TABLE ${base} - Async\n`;
    output += `=======================\n`;

    output += genOutput(base, limit);
    if (list) {

      console.log(`=======================`.green);
      console.log(`TABLE ${base} - Async`.green);
      console.log(`=======================`.green);

      console.log(genOutputLog(base, limit));
    }

    const nameFile = `table-${base}-async.txt`;
    fs.writeFileSync(path + nameFile, output);
    return nameFile;
  } catch (error) {
    throw error;
  }
};
const genOutput = (base, limit) => {

  let output = "";

  for (i = 1; i <= limit; i++) {
    output += `${base} x ${i} = ${base * i}\n`;
  }
  return output;
};
const genOutputLog = (base, limit) => {

  let output = "";

  for (i = 1; i <= limit; i++) {
    output += `${base} ` + 'x'.blue + ` ${i} ` + '='.blue + ` ${base * i}\n`;
  }
  return output;
};

module.exports = {
  createFilePromise,
  createFileAsync,
};
