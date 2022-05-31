//Reference HTML CONTROLS
const lblDesk = document.querySelector("h1");
const btnAttendTkt = document.querySelector("button");
const lblAlert = document.querySelector(".alert");
const lblAttendingTo = document.querySelector("small");
const lblQueue = document.querySelector("#lblPendientes");
const searchParams = new URLSearchParams(window.location.search);

lblAlert.style.display = "none";
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("The Param escritorio is not found");
}
const desk = searchParams.get("escritorio");
lblDesk.innerHTML = desk;
lblAttendingTo.innerHTML = "No Ticket";
const socket = io();

socket.on("connect", () => {
  btnAttendTkt.disabled = false;
});

socket.on("disconnect", () => {
  btnAttendTkt.disabled = true;
});

socket.on("queue-tkts", (queueStr) => {
  lblQueue.innerHTML = queueStr;
  console.log(queueStr);
  if (parseInt(queueStr) > 0) {
    lblAlert.style.display = "none";
  }
  //   lblNewTkt.innerHTML = lastTkt;
});

btnAttendTkt.addEventListener("click", () => {
  socket.emit("attend-tkt", { desk }, ({ ok, msg, tkt, queue }) => {
    if (!ok) {
      lblAlert.style.display = "";
      lblAlert.innerText = msg;
      lblQueue.innerHTML = "0";
    } else {
      lblAlert.style.display = "none";
      lblAttendingTo.innerHTML = `Ticket ${tkt.number}`;
      lblQueue.innerHTML = queue;
    }
  });
});
