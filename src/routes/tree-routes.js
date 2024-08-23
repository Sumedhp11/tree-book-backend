import { Router } from "express";
import {
  addNewTree,
  getTreeData,
  RequestupdateTree,
  // addTreeFromBackend,
} from "../controller/tree-controller.js";
import upload from "../config/multerConfig.js";
import { getTreeKbByname } from "../controller/TreeKb-controller.js";

const router = Router();
router.post("/add", upload.single("file"), addNewTree);
router.patch("/request-tree-update", RequestupdateTree);
// router.post("/add-tree-backend", addTreeFromBackend);
router.get("/all", getTreeData);
router.get("/getkb-by-name/:treeName", getTreeKbByname);

export default router;
