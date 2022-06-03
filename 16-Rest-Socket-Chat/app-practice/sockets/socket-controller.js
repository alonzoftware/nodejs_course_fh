const { checkJWT } = require("../helpers");

const socketController = async (socket) => {
  //Simple Test Connection
  //----------------------
  //console.log(socket.id);
  //----------------------

  const token = socket.handshake.headers["x-token"];
  const user = await checkJWT(token);
  if (!user) {
    return socket.disconnect();
  }
  console.log("User Socket connected", user.name);
};
module.exports = {
  socketController,
};
