import express from "express";
import { getAllModules, removeModule, updateActiveModule, checkModule, updateModule, checkName, addModule, removeRelModule } from "../controllers/modulesControllers.js";

const router = express.Router();

router.post("/getAllModule", getAllModules);

router.post("/deleteModule", removeModule);

router.post("/deleteModuleMenu", removeRelModule);

router.post("/updateActiveModule", updateActiveModule);

router.post("/checkModule", checkModule);

router.post("/updateModule", updateModule);

router.post("/getName", checkName);

router.post("/addModule", addModule);

export default router;