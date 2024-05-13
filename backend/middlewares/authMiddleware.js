const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authMiddleware = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //   res.send(decode);
      req.user = await User.findById(decode.id);
      next();
      // console.log(req.user);
    } catch (error) {
      throw new Error("Wrong Token");
    }
  } else {
    throw new Error("No token found");
  }
});

module.exports = authMiddleware;
