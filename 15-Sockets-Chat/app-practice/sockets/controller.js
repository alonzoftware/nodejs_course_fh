const Users = require("../models/users");
const { createMessage } = require("../helpers/create-message");
const users = new Users();
const socketController = (socket) => {
  // console.log(`Client Connected ${socket.id}`);

  socket.on("enter-chat-room", (person, callback) => {
    if (!person || !person.name || !person.room) {
      return callback({
        ok: false,
        msg: "The person name/room are required",
      });
    }

    socket.join(person.room);
    const people = users.addPerson(socket.id, person.name, person.room);
    const peopleRoom = users.getRoomPeople(person.room);
    // socket.broadcast.to(person.room).emit("upd-people", people);
    socket.broadcast.to(person.room).emit("upd-people", peopleRoom);
    callback({
      ok: true,
      people,
    });
  });
  socket.on("disconnect", () => {
    // console.log(`Client Disconnected ${socket.id}`);
    const personDel = users.delPerson(socket.id);
    console.log(personDel);
    const msg = createMessage(
      "Admin",
      `The person ${personDel.name} left the chat`
    );
    // socket.broadcast.emit("receive-message", msg);
    // socket.broadcast.emit("upd-people", users.getPeople());
    socket.broadcast.to(personDel.room).emit("receive-message", msg);
    socket
      .to(personDel.room)
      .emit("upd-people", users.getRoomPeople(personDel.room));
  });
  socket.on("send-message", (payload) => {
    const person = users.getPerson(socket.id);
    const msg = createMessage(person.name, payload.msg);
    socket.broadcast.emit("receive-message", msg);
  });
  socket.on("send-room-message", (payload) => {
    const person = users.getPerson(socket.id);
    const msg = createMessage(person.name, payload.msg);
    socket.broadcast.to(person.room).emit("receive-room-message", msg);
  });

  socket.on("send-private-message", (payload) => {
    const person = users.getPerson(socket.id);
    const msg = createMessage(person.name, payload.msg);
    socket.to(payload.idTo).emit("receive-private-message", msg);
  });
};
module.exports = {
  socketController,
};
