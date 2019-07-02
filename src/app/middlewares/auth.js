const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.path.includes("/images/")) return next();

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");
  try {
    var decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    req.isAdmin = decoded.is_admin;

    if (req.path.includes("/admin/") && !req.isAdmin) {
      return res.status(401).json({ error: "Token invalid" });
    }
    console.log("Chamou a funcao do node.");
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
