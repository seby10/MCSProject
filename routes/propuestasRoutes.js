import express from "express";
import { getPropuestaByGrupDir } from "../controllers/propuestasControllers.js";

const router = express.Router();

router.get("/getPropuestas/:grup", getPropuestaByGrupDir);

export default router;