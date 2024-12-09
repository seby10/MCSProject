import express from "express";
import { getPropuestaByGrupDir } from "../controllers/propuestasControllers.js";
import { getCategorias } from "../controllers/propuestasControllers.js";
import { getPropuestas, insertPropuesta, updatePropuesta, deletePropuesta } from "../controllers/propuestasControllers.js";


const router = express.Router();

router.get("/getPropuestas/:grup", getPropuestaByGrupDir);
router.get("/categorias", getCategorias); 
router.get("/getPropuestas", getPropuestas); 

router.post("/insertPropuesta", insertPropuesta);

// Actualizar propuesta existente
router.put("/updatePropuesta", updatePropuesta);

// Eliminar propuesta
router.delete("/deletePropuesta/:id", deletePropuesta);
export default router;

