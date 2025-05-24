const HttpError = require("../utils/http-error");

const auth = async (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    const { verifyToken } = await import("../utils/jwt.mjs");
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);
    req.payload = payload
    if (!payload) return res.status(401).json({ error: "Token inválido" });

    req.user = payload;
    next();
  } else {
    if (req.session.user) return next();
    throw new HttpError(401, "No autenticado", "auth/login");
  }
};

module.exports = auth;
