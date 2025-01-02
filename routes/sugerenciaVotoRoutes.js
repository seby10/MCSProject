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

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> caa58da933a6631e84b2205707bf21af12ce4528
