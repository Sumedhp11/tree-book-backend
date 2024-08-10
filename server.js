import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { ConnectDb } from "./src/config/dbConfig.js";
import treesRoutes from "./src/routes/tree-routes.js";
configDotenv();
ConnectDb();
const server = express();
const PORT = process.env.PORT || 8080;
server.use(cors());
server.use(express.json());

server.get("/", (_, res) => {
  res.send("Base url For Book Tree");
});
server.use("/api/trees", treesRoutes);

server.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
