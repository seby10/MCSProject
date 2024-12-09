import express from "express";
import {
  getCandidatoByID,
  getCandidatos,
  putCandidato,
  postCandidato,
} from "../controllers/candidatosControllers.js";
const router = express.Router();

router.get("/getCandidato/:id", getCandidatoByID);
router.get("/getCandidatos", getCandidatos);
router.post("/updateCandidato", putCandidato);
router.post("/addCandidato", postCandidato);

export default router;
