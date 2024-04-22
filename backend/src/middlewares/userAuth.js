const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const isAuthenticated = (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken || !headerToken.startsWith("Bearer ")) {
    return res.status(403).json({
      data: {},
      msg: "You don't have permission to access this resource",
      success: false,
    });
  }

  let token = headerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      data: {},
      msg: "Invalid token",
      success: false,
    });
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
};
