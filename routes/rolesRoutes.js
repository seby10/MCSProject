import express from "express";
import {
  getAllRoles,
  removeRole,
  removeMenuRole,
  updateRole,
  getRole,
  checkRole,
  addRole,
  addMenuToRole,
  getAllRelMenus,
  removeMenuFromRole,
} from "../controllers/rolesControllers.js";

const router = express.Router();

router.post("/addRole", addRole);

router.post("/addMenuToRole", addMenuToRole);

router.post("/getAllroles", getAllRoles);

router.post("/getAllRelMenus", getAllRelMenus);

router.post("/deleteRole", removeRole);

router.post("/deleteMenuRole", removeMenuRole);

router.post("/deleteMenuFromRole", removeMenuFromRole);

router.post("/updateRole", updateRole);

router.post("/getName", getRole);

router.post("/checkRole", checkRole);

export default router;
