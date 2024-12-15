import express from "express";
import {
  getAdmins,
  putAdmin,
  postAdmin,
} from "../controllers/adminControllers.js";
const router = express.Router();

router.get("/getAdmins", getAdmins);
router.post("/updateAdmin", putAdmin);
router.post("/addAdmin", postAdmin);

export default router;