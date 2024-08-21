import { Router } from "express";
import {
  AdminRegister,
  Adminlogin,
  getAllEditRequests,
  getAllTrees,
  updateTree,
  ChangeEditRequestStatus,
  refreshAccessToken,
} from "../controller/admin-controller.js";
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

export default router;
