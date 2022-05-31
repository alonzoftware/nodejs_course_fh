const TicketsControl = require("../models/tickets-control");

const ticketsControl = new TicketsControl();
const socketController = (socket) => {
  // console.log(`Client Connected ${socket.id}`);
  //INITIAL CONDITIONS
  //------------------------------------
  const lastTkt = ticketsControl.lastTkt;
  socket.emit("last-tkt", `Ticket ${lastTkt}`);

  const queue = ticketsControl.tkts.length;
  socket.emit("queue-tkts", queue);

  socket.emit("last-4-tkts", ticketsControl.last4Tkts);
  //------------------------------------

  socket.on("disconnect", () => {
    console.log(`Client Disconnected ${socket.id}`);
  });
  socket.on("add-tkt-to-queue", (payload, callback) => {
    const tktStr = ticketsControl.addTktToQueue();
    const queue = ticketsControl.tkts.length;
    socket.broadcast.emit("queue-tkts", queue);
    callback(tktStr);
  });

  socket.on("attend-tkt", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: "The Desk is REQUIRED",
      });
    }

    const tkt = ticketsControl.attendTkt(desk);
    if (!tkt) {
      return callback({
        ok: false,
        msg: "There are no more tickets",
      });
    }
    socket.broadcast.emit("last-4-tkts", ticketsControl.last4Tkts);
    const queue = ticketsControl.tkts.length;
    socket.broadcast.emit("queue-tkts", queue);

    callback({
      ok: true,
      queue,
      tkt,
    });
  });
};
module.exports = {
  socketController,
};
