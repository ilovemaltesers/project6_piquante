const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the token from the Authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // verify the token
    const userId = decodedToken.userId; // extract the user ID from the token
    if (req.body.userId && req.body.userId !== userId) {
      // check if the user ID extracted from the token is different from the one sent in the request
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
