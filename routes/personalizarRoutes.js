
import express from "express";
import upload from "../middleware/customMiddleware.js";
import {
  updateData,
  getData,

} from "../controllers/personalizarControllers.js";
const router = express.Router();

router.post(
  "/updateData",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "icon", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  updateData
);

router.get("/getData",getData);

export default router;