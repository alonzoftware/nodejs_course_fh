const createMessage = (name, msg) => {
  return {
    name,
    msg,
    time: new Date().getTime(),
  };
};
module.exports = { createMessage };
