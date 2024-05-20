const jwt = require("jsonwebtoken");

function authorise(req, res, next) {
  try {
    // Once the user is authenticated on the frontend,
    // the frontend sends a bearer token with each request.
    // To authorise routes in the middleware,
    // we extract the bearer token from the request headers.
    const token = req.headers.authorization.split(" ")[1];

    // Once we have the token from the frontend, we verify that the user is authorised.
    // Note: The frontend only receives the token and never generates it.
    // The backend sends the token to the frontend, and the frontend includes the token in the headers of each request.
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Verify the token
    const userId = decodedToken.userId; // Extract the user ID from the token

    // Check if the user ID from the token matches the user ID in the request body.
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}

module.exports = authorise;
