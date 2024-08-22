import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please Login to Access this Route" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { verifyAccessToken };
