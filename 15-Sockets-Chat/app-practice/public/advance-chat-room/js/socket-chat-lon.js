const person = {
  name: userName,
  room: userRoom,
};
const socket = io();

socket.on("connect", () => {
  socket.emit("enter-chat-room", person, (payload) => {
    renderUsers(payload.people);
  });
});
socket.on("disconnect", () => {});

socket.on("receive-message", (msg) => {
  //   console.log(msg);
});
socket.on("receive-private-message", (msg) => {
  //   console.log(msg);
});
socket.on("receive-room-message", (msg) => {
  renderMessages(msg, false);
});
socket.on("upd-people", (people) => {
  //   console.log(people);
  renderUsers(people);
});
