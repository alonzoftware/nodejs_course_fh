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

  socket.on("update-users", (users = []) => {
    renderUsers(users);
  });

  socket.on("receive-messages", renderMessages);

  socket.on("private-message", (payload) => {
    console.log("Private:", payload);
  });
};

const renderUsers = (users) => {
  let usersHtml = "";
  users.forEach(({ name, uid }) => {
    usersHtml += `
          <li>
              <p>
                  <h5 class="text-success"> ${name} </h5>
                  <span class="fs-6 text-muted">${uid}</span>
              </p>
          </li>
      `;
  });

  ulUsuarios.innerHTML = usersHtml;
};

const renderMessages = (messages = []) => {
  let mensajesHTML = "";
  messages.forEach(({ name, message }) => {
    mensajesHTML += `
          <li>
              <p>
                  <span class="text-primary">${name}: </span>
                  <span>${message}</span>
              </p>
          </li>
      `;
  });

  ulMensajes.innerHTML = mensajesHTML;
};

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
  const message = txtMensaje.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }
  if (message.length === 0) {
    return;
  }

  socket.emit("send-message", { uid, message });

  txtMensaje.value = "";
});

btnSalir.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location = "index.html";
});
// btnSalir.addEventListener("click", () => {
//   localStorage.removeItem("token");

//   const auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(() => {
//     console.log("User signed out.");
//     window.location = "index.html";
//   });
// });

const main = async () => {
  await validateJWT();
};
main();
// function init() {
//   gapi.load("auth2", function () {
//     /* Ready. Make a call to gapi.auth2.init or some other API */
//     gapi.auth2.init({
//       client_id:
//         "58791206860-fo3op7ijs27aodiqeiak68ole6kjhn7o.apps.googleusercontent.com",
//     });
//     main();
//   });
// }
