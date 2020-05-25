const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  console.log(header);
  if (!header) {
    req.isAuth = false;
    const error = new Error("No Authorization header");
    error.statusCode = 401;
    return next(error);
  }
  const token = header.split(" ")[1];
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    req.isAuth = false;
    const error = new Error("Token could not be verified");
    error.statusCode = 401;
    return next(error);
  }

  if (!verifiedToken) {
    req.isAuth = false;
    const error = new Error("No token provided");
    error.statusCode = 401;
    return next(error);
  }

  req.userId = verifiedToken.userId;
  req.isAuth = true;
  next();
};
