const http = require("http");
const port = 8085;

http
  .createServer((req, res) => {
    // res.setHeader("Content-Disposition", "attachment; filename=lista.csv");
    // res.write("id, nombre\n");
    // res.write("1, Fernando\n");
    // res.write("2, Maria\n");

    // res.writeHead(200, { "Content-Type": "text/plain" });
    res.writeHead(200, { "Content-Type": "application/json" });

    let salida = {
      nombre: "fernando",
      edad: 32,
      url: req.url,
    };

    res.write(JSON.stringify(salida));
    // res.write('Hola Mundo');
    res.end();
  })
  .listen(port);
console.log(`Escuchando el puerto ${port}`);
