import { Router } from "express";
import upload from "../config/multerConfig.js";
import {
  AdminRegister,
  Adminlogin,
  ChangeEditRequestStatus,
  addTreeKb,
  getAllEditRequests,
  getAllTrees,
  logoutAdmin,
  refreshAccessToken,
  updateTree,
} from "../controller/admin-controller.js";
import { getAllTreeKb } from "../controller/TreeKb-controller.js";
import { verifyAccessToken } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/register", AdminRegister);
router.post("/login", Adminlogin);

router.get("/refresh-token", refreshAccessToken);

router.use(verifyAccessToken);

router.get("/get-all-trees", getAllTrees);
router.patch("/update-tree/:treeId", updateTree);
router.get("/edit-requests", getAllEditRequests);
router.patch("/handle-edit-requests/:id", ChangeEditRequestStatus);
router.post("/logout", logoutAdmin);
router.post("/add-kb", upload.single("file"), addTreeKb);
router.get("/get-all-kbs", getAllTreeKb);

export default router;
