import express from "express";
import { getCandidatoByID } from "../controllers/candidatosControllers.js";

const router = express.Router();

router.get("/getCandidato/:id", getCandidatoByID);

export default router;