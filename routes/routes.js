import express from "express";

import candidatosRoutes from './candidatosRoutes.js'
import propuestasRoutes from './propuestasRoutes.js'
import sugerenciaVotoRoutes from './sugerenciaVotoRoutes.js';
import usersRoutes from './usersRoutes.js';
import eventosNoticiasRoutes from './eventosNoticiasRoutes.js'
import loginRoutes from './loginRoutes.js'

const router = express.Router();

router.use('/candidatos', candidatosRoutes);
router.use('/sugerenciaVoto', sugerenciaVotoRoutes);
router.use('/users', usersRoutes);
router.use('/eventos_noticias', eventosNoticiasRoutes);
router.use('/login', loginRoutes);
router.use('/propuestas', propuestasRoutes);

export default router