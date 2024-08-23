import { Router } from "express";
import {
  AdminRegister,
  Adminlogin,
  getAllEditRequests,
  getAllTrees,
  updateTree,
  ChangeEditRequestStatus,
  refreshAccessToken,
  logoutAdmin,
  addTreeKb,
} from "../controller/admin-controller.js";
import { verifyAccessToken } from "../middleware/AuthMiddleware.js";
import { getAllTreeKb } from "../controller/TreeKb-controller.js";

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
router.post("/add-kb", addTreeKb);
router.get("/get-all-kbs", getAllTreeKb);

export default router;
