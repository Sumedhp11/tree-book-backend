import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing or malformed",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired access token",
        });
      }

      req.user = decoded; // Attach user information to request
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { verifyAccessToken };
