//Reference to HTML CONTROLS
const lblNewTkt = document.querySelector("#lblNewTkt");
const btnCreateTkt = document.querySelector("button"); //First Button in Document HTML

const socket = io();

socket.on("connect", () => {
  btnCreateTkt.disabled = false;
});

socket.on("disconnect", () => {
  btnCreateTkt.disabled = true;
});

socket.on("last-tkt", (lastTkt) => {
  lblNewTkt.innerHTML = lastTkt;
});

btnCreateTkt.addEventListener("click", () => {
  btnCreateTkt.disabled = true;
  socket.emit("add-tkt-to-queue", null, (tktStr) => {
    btnCreateTkt.disabled = false;
    console.log("Desde el server", tktStr);
    lblNewTkt.innerHTML = tktStr;
  });
});
