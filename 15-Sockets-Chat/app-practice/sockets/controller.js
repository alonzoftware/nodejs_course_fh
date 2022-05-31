const Users = require('../models/users');
const users = new Users();
const socketController = socket => {
    // console.log(`Client Connected ${socket.id}`);

    socket.on('disconnect', () => {
        // console.log(`Client Disconnected ${socket.id}`);
        const personDel = users.delPerson(socket.id);
        socket.broadcast.emit('upd-people', users.getPeople);
        socket.broadcast.emit('create-msg', { user: 'Admin', msg: `The person ${personDel.name} left the chat` });
    });
    socket.on('send-message', (payload, callback) => {
        // console.log(payload);
        // socket.broadcast.emit('send-message', payload);
        const id = 12345;
        socket.broadcast.emit('send-message', payload);
        callback(id);
    });

    socket.on('enter-chat-room', (person, callback) => {
        if (!person || !person.name) {
            return callback({
                ok: false,
                msg: 'The person name is required',
            })
        }
        const people = users.addPerson(socket.id, person.name);
        callback({
            ok: true,
            // people,
        })

    });
}
module.exports = {
    socketController,
}