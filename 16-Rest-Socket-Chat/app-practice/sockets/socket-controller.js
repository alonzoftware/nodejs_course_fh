const { checkJWT } = require("../helpers");
const { ChatMessages } = require("../models");
const chatMessages = new ChatMessages();
const socketController = async (socket, io) => {
  //Simple Test Connection
  //----------------------
  //console.log(socket.id);
  //----------------------
  //User Connection
  //-----------------------------------------------
  const token = socket.handshake.headers["x-token"];
  const user = await checkJWT(token);
  if (!user) {
    return socket.disconnect();
  }
  socket.join(user.id); // global, socket.id, usuario.id
  chatMessages.connectUser(user);
  console.log("User Socket connected", user.name, socket.id);
  io.emit("update-users", chatMessages.usersArr);
  io.emit("receive-messages", chatMessages.last10);
  //-----------------------------------------------
  //User Disconnection
  //-----------------------------------------------
  socket.on("disconnect", () => {
    console.log(`User Socket disconnected ${user.name}`);
    chatMessages.disconnectUser(user.id);
    io.emit("update-users", chatMessages.usersArr);
  });
  //-----------------------------------------------
  socket.on("send-message", ({ uid, message }) => {
    if (uid) {
      // Private Message
      socket.to(uid).emit("private-message", { from: user.name, message });
    } else {
      chatMessages.sendMessage(user.id, user.name, message);
      io.emit("receive-messages", chatMessages.last10);
    }
  });
};
module.exports = {
  socketController,
};
