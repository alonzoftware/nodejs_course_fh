//Reference HTML Controls

const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");
const socket = io();
socket.on("last-4-tkts", (last4Tkts) => {
  const [tkt1, tkt2, tkt3, tkt4] = last4Tkts;
  const audio = new Audio("./audio/new-ticket.mp3");
  audio.play();

  if (tkt1) {
    lblTicket1.innerText = `Ticket ` + tkt1.number;
    lblEscritorio1.innerText = tkt1.desk;
  } else {
    lblTicket1.innerText = "Pending";
    lblEscritorio1.innerText = "";
  }
  if (tkt2) {
    lblTicket2.innerText = `Ticket ` + tkt2.number;
    lblEscritorio2.innerText = tkt2.desk;
  } else {
    lblTicket2.innerText = "Pending";
    lblEscritorio2.innerText = "";
  }
  if (tkt3) {
    lblTicket3.innerText = `Ticket ` + tkt3.number;
    lblEscritorio3.innerText = tkt3.desk;
  } else {
    lblTicket3.innerText = "Pending";
    lblEscritorio3.innerText = "";
  }
  if (tkt4) {
    lblTicket4.innerText = `Ticket ` + tkt4.number;
    lblEscritorio4.innerText = tkt4.desk;
  } else {
    lblTicket4.innerText = "Pending";
    lblEscritorio4.innerText = "";
  }
});
