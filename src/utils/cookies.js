import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "None",
  httpOnly: true,
  secure: true,
};
const sendToken = (res, user, code, message, refreshToken) => {
  const acessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15s",
  });
  return res
    .status(code)
    .cookie("refresh-token", refreshToken, cookieOption)
    .json({
      success: true,
      message,
      token: acessToken,
    });
};
export { sendToken };
