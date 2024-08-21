import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const verifyAndRefreshToken = async (req, res, next) => {
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
      if (err && err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return res.status(401).json({
            success: false,
            message: "Refresh token missing",
          });
        }

        jwt.verify(
          refreshToken,
          process.env.JWT_SECRET,
          (err, decodedRefresh) => {
            if (err) {
              return res.status(403).json({
                success: false,
                message: "Invalid or expired refresh token",
              });
            }

            const newAccessToken = jwt.sign(
              { id: decodedRefresh.id },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              success: true,
              message: "Access token refreshed",
              accessToken: newAccessToken,
            });
          }
        );
      } else if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { verifyAndRefreshToken };
