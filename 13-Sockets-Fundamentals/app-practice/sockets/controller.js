

const socketController = socket => {
    console.log(`Client Connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client Disconnected ${socket.id}`);
    });
    socket.on('send-message', (payload, callback) => {
        // console.log(payload);
        // socket.broadcast.emit('send-message', payload);
        const id = 12345;
        socket.broadcast.emit('send-message', payload);
        callback(id);
    });
}
module.exports = {
    socketController,
}