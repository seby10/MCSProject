import express from "express";
import sugerenciaVotoRoutes from './sugerenciaVotoRoutes.js';
import usersRoutes from './usersRoutes.js';
const router = express.Router();

router.use('/sugerenciaVoto', sugerenciaVotoRoutes);
router.use('/users', usersRoutes);

export default router