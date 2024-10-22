import express from "express";
import votosRoutes from './votosRoutes.js';
import sugerenciasRoutes from './sugerenciasRoutes.js';
import usersRoutes from './usersRoutes.js';
const router = express.Router();

router.use('/votos', votosRoutes);
router.use('/sugerencias', sugerenciasRoutes);
router.use('/users', usersRoutes);

export default router