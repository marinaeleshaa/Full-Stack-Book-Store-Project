import { VerifyToken } from "../jwt/jwtUtil.js";

export const AuthMiddleware = (req, res, next) => {
  console.log("verification start......");
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (!authHeader) return res.status(401).json({ error: "missing token" });

  const token = authHeader.split(" ")[1];
  // console.log(token)
  try {
    const verified = VerifyToken(token);
    console.log("verification done.");
    req.currentUser = {
      id: verified.id,
      username: verified.username,
      role: verified.role,
      email:verified.email
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
