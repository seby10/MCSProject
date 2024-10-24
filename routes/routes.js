import express from "express";
import candidatosRoutes from './candidatosRoutes.js'


const router = express.Router();

router.use('/candidatos', candidatosRoutes);

export default router