import express from "express";
import {
  getAllMenus,
  removeMenu,
  updateActiveMenu,
  checkMenu,
  updateMenu,
  checkName,
  addMenu,
  addMenuModule,
  removeRelMenu,
  getAllRel,
  removeRel,
  removeMenuRole,
} from "../controllers/menusControllers.js";

const router = express.Router();

router.post("/getAllMenus", getAllMenus);

router.post("/deleteMenu", removeMenu);

router.post("/deleteMenuModule", removeRelMenu);

router.post("/deleteMenuRole", removeMenuRole);

router.post("/deleteRelation", removeRel);

router.post("/updateActiveMenu", updateActiveMenu);

router.post("/checkMenu", checkMenu);

router.post("/updateMenu", updateMenu);

router.post("/getName", checkName);

router.post("/addMenu", addMenu);

router.post("/addMenuModule", addMenuModule);

router.post("/getAllRelations", getAllRel);

export default router;
