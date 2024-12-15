import express from "express";
import {
    addSugerencias,
    addVotos,
    getSugerencias,
    getVotos,
    actualizarEstadoSugerencia,
} from "../controllers/sugerenciaVotoControllers.js";

const router = express.Router();

router.post("/addSugerencias", addSugerencias);
router.post("/addVotos", addVotos);
router.get("/getSugerencias", getSugerencias);
router.get("/getVotos", getVotos);
router.put("/updateEstadoSugerencia", actualizarEstadoSugerencia);


export default router;
