import { Router } from "express";
import {
  AdminRegister,
  Adminlogin,
  getAllEditRequests,
  getAllTrees,
  updateTree,
  ChangeEditRequestStatus,
} from "../controller/admin-controller.js";
import { verifyAndRefreshToken } from "../middleware/AuthMiddleware.js";

const router = Router();
router.post("/register", AdminRegister);
router.post("/login", Adminlogin);
router.use(verifyAndRefreshToken);
router.get("/get-all-trees", getAllTrees);
router.patch("/update-tree/:treeId", updateTree);
router.get("/edit-requests", getAllEditRequests);
router.patch("/handle-edit-requests/:id", ChangeEditRequestStatus);

export default router;
