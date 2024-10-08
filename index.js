import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { ConnectDb } from "./src/config/dbConfig.js";
import treesRoutes from "./src/routes/tree-routes.js";
import adminRoutes from "./src/routes/admin-routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
configDotenv();
ConnectDb();
const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: ["http://localhost:5173", "https://treebook.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

server.use(morgan("dev"));
server.get("/", (_, res) => {
  res.send("Base url For Book Tree");
});

server.use("/api/trees", treesRoutes);
server.use("/api/admin", adminRoutes);

server.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
