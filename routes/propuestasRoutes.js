import express from "express";
import { 
  getPropuestaByGrupDir, 
  getCategorias, 
  getPropuestas, 
  insertPropuesta, 
  updatePropuesta, 
  deletePropuesta 
} from "../controllers/propuestasControllers.js";
import upload from '../middleware/uploadPropuestas.js';

const router = express.Router();

// Obtener propuestas por grupo
router.get("/getPropuestas/:grup", getPropuestaByGrupDir);

// Obtener categorías
router.get("/categorias", getCategorias); 

// Obtener todas las propuestas
router.get("/getPropuestas", getPropuestas); 

// Insertar una nueva propuesta
router.post("/insertPropuesta", upload.single("image"), insertPropuesta); 

// Actualizar una propuesta existente
router.put("/updatePropuesta", upload.single("image"), updatePropuesta); 

// Eliminar propuesta
router.delete("/deletePropuesta/:id", deletePropuesta);

export default router;
