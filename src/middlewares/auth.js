const auth = async (req, res, next) => {
  const { verifyToken } = await import("../utils/jwt.mjs");
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Token inválido" });

  req.user = payload;
  next();
};

module.exports = auth;
