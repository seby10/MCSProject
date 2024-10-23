import express from "express";
import candidatosRoutes from './candidatosRoutes.js'
import propuestasRoutes from './propuestasRoutes.js'


const router = express.Router();

router.use('/candidatos', candidatosRoutes);

router.use('/propuestas', propuestasRoutes);

export default router