import express from "express";
import { getCandidatoByID, getCandidatos } from "../controllers/candidatosControllers.js";

const router = express.Router();

router.get("/getCandidato/:id", getCandidatoByID);
router.get("/getCandidatos", getCandidatos);

export default router;