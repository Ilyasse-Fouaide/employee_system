async function admin(req, res, next) {
  if (!req.role) {
    return res.status(401).json({ error: "Unauthorized Access. Only Admin Can access to this operation" });
  }

  next();
}

module.exports = admin;
