import express from "express";
import { getPropuestaByID } from "../controllers/propuestasControllers.js";

const router = express.Router();

router.get("/getPropuestas/:id", getPropuestaByID);

export default router;