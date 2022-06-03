//Simple Test Connection
//----------------------
//const socket = io();
//----------------------

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8085/api/auth/"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/";

let user = null;
let socket = null;

// References HTML
const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

const main = async () => {
  await validateJWT();
};
const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length < 10) {
    window.Location = "index.html";
    throw new Error("Invalid Token");
  }
  const resp = await fetch(url, { headers: { "x-token": token } });
  const { userAuth: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem("token", tokenDB);
  user = userDB;
  document.title = user.name;
  await connectSocket();
};
const connectSocket = async () => {
  socket = io({
    extraHeaders: { "x-token": localStorage.getItem("token") },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });

  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });

  // socket.on('recibir-mensajes', dibujarMensajes );
  // socket.on('usuarios-activos', dibujarUsuarios );

  // socket.on('mensaje-privado', ( payload ) => {
  //     console.log('Privado:', payload )
  // });
};

main();
