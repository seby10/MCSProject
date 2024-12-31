import express from "express";
import {
    addSugerencias,
    addVotos,
    getSugerencias,
    getVotos,
    actualizarEstadoSugerencia,
    actualizarActivoSugerencia
} from "../controllers/sugerenciaVotoControllers.js";

const router = express.Router();

router.post("/addSugerencias", addSugerencias);
router.post("/addVotos", addVotos);
router.get("/getSugerencias", getSugerencias);
router.get("/getVotos", getVotos);
router.put("/updateEstadoSugerencia", actualizarEstadoSugerencia);
router.put("/updateActivoSugerencia", actualizarActivoSugerencia);

export default router;