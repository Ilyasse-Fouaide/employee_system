const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verifiedUser.userId;
    req.email = verifiedUser.email;
    req.username = verifiedUser.username;
    req.role = verifiedUser.role;
    next();
  } catch (error) {
    res.status(500).json({ error: "Invalid token." });
  }
}

module.exports = authMiddleware;
