import express from "express";
import candidatosRoutes from './candidatosRoutes.js'
import sugerenciaVotoRoutes from './sugerenciaVotoRoutes.js';
import usersRoutes from './usersRoutes.js';
const router = express.Router();
router.use('/candidatos', candidatosRoutes);
router.use('/sugerenciaVoto', sugerenciaVotoRoutes);
router.use('/users', usersRoutes);
export default router