import express from "express";
import candidatosRoutes from './candidatosRoutes.js'
import sugerenciaVotoRoutes from './sugerenciaVotoRoutes.js';
import usersRoutes from './usersRoutes.js';
const router = express.Router();

router.use('/sugerenciaVoto', sugerenciaVotoRoutes);
router.use('/users', usersRoutes);
router.use('/candidatos', candidatosRoutes);
export default router