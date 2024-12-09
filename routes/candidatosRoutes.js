import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getCandidatoByID,
  getCandidatos,
  putCandidato,
  postCandidato,
} from "../controllers/candidatosControllers.js";
const router = express.Router();

router.get("/getCandidato/:id", getCandidatoByID);
router.get("/getCandidatos", getCandidatos);
router.post("/updateCandidato", upload.single("imagen"), putCandidato);
router.post("/addCandidato", upload.single("imagen"), postCandidato);

export default router;
