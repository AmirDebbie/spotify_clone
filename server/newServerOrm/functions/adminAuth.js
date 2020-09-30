module.exports = function adminAuth(req, res, next) {
    if (req.decoded.isAdmin) {
      next();
    } else {
      res.sendStatus(401);
    }
  }