import { Router } from "express";
import { addNewTree, getTreeData } from "../controller/tree-controller.js";
import upload from "../config/multerConfig.js";

const router = Router();
router.post("/add", upload.single("file"), addNewTree);
router.get("/all", getTreeData);

export default router;
