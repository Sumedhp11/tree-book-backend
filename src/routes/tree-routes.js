import { Router } from "express";
import {
  addNewTree,
  getTreeData,
  RequestupdateTree,
  // addTreeFromBackend,
} from "../controller/tree-controller.js";
import upload from "../config/multerConfig.js";

const router = Router();
router.post("/add", upload.single("file"), addNewTree);
router.patch("/request-tree-update", RequestupdateTree);
// router.post("/add-tree-backend", addTreeFromBackend);
router.get("/all", getTreeData);


export default router;
