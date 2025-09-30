import jwt from "jsonwebtoken";
process.loadEnvFile(".env");

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = "2d";

export const GenerateToken = (payload) => {
  return jwt.sign(payload, jwtSecretKey, {
    expiresIn: jwtExpiresIn,
    issuer: "rina", // ? الي عمل ال token زي ما بنعمل sign in by google
    subject: `${payload.id}`,
  });
};

export const VerifyToken = (token) => jwt.verify(token, jwtSecretKey); // ? return the payload (user data) if verified
