const TicketsControl = require('../models/tickets-control');

const ticketsControl = new TicketsControl();
const socketController = socket => {
    // console.log(`Client Connected ${socket.id}`);
    const tktStr = `Ticket ${ticketsControl.lastTkt} `;
    socket.emit('last-tkt', tktStr);

    socket.on('disconnect', () => {
        console.log(`Client Disconnected ${socket.id}`);
    });
    socket.on('add-tkt-to-queue', (payload, callback) => {
        const tktStr = ticketsControl.addTktToQueue();
        callback(tktStr);
    });
}
module.exports = {
    socketController,
}