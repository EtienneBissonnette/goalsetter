const jwt = require("jsonwebtoken");
const User = require("../models/users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from request header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decodedToken.id).select("-password"); //user object without hashed password added in req
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      next(new Error("User not authorized, invalid JWT"));
    }
  }
  if (!token) {
    res.status(401);
    next(new Error("User not authorized, no JWT defined"));
  }
};

module.exports = { protect };
