const fs = require("fs");

const crearArchivoPromise = (base = 5) => {
  console.log(`================`);
  console.log(`   TABLE 5`);
  console.log(`================`);

  let salida = "";
  for (i = 1; i <= 10; i++) {
    salida += `${base} x ${i} = ${base * i}\n`;
  }
  console.log(salida);

  // fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
  //     if (err) throw err;
  //     console.log('The file has been saved!');
  //   });
  return new Promise((resolve, reject) => {
    const nomFile = `tabla-${base}.txt`;
    fs.writeFile(nomFile, salida, (err) => {
      if (err) reject(err);
      resolve(nomFile);
    });
  });
};

const createArchivoAsync = async (base) => {
  try {
    console.log(`================`);
    console.log(`   TABLE 5`);
    console.log(`================`);

    let salida = "";
    for (i = 1; i <= 10; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
    }
    console.log(salida);

    const nomFile = `tabla-${base}.txt`;
    fs.writeFileSync(nomFile, salida);
    return nomFile;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivoPromise,
  createArchivoAsync,
};
