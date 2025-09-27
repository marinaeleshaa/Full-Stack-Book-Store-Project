import { VerifyToken } from "../jwt/jwtUtil.js";

export const AuthMiddleware = (req, res, next) => {
  console.log("verification start......");
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const verified = VerifyToken(token);
    req.currentUser = {
      id: verified.id,
      username: verified.username,
      role: verified.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
