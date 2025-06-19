const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies.token;

  //  console.log("token",token);

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.isAdmin = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roles)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

exports.isAgent = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roles)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
