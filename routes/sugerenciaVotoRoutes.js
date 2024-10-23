import express from "express";
import {
    addSugerencias,
    addVotos,
} from "../controllers/sugerenciaVotoControllers.js";

const router = express.Router();

router.post("/addSugerencias", addSugerencias);
router.post("/addVotos", addVotos);


export default router;
