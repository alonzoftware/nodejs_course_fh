const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  const user = req.userAuth;
  if (!user) {
    return res.status(500).json({
      msg: "You Want check the ROLE without check TOKEN",
    });
  }

  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User: ${user.name} not is an ADMINISTRATOR`,
    });
  }

  next();
};

const hasTheseRoles = (...roles) => {
  return (req = request, res = response, next) => {
    const user = req.userAuth;
    if (!user) {
      return res.status(500).json({
        msg: "You Want check the ROLE without check TOKEN",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        msg: `User: ${user.name} not has these roles : ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, hasTheseRoles };
