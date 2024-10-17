import express from "express";
import { registerAut } from "../controllers/registerControllers.js";

const router = express.Router();

router.post("/", registerAut);

export default router;