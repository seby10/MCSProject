import express from "express";
<<<<<<< routes/routes.js
import propuestasRoutes from './propuestasRoutes.js'
=======
>>>>>>> routes/routes.js

import candidatosRoutes from './candidatosRoutes.js'
import sugerenciaVotoRoutes from './sugerenciaVotoRoutes.js';
import usersRoutes from './usersRoutes.js';
import eventosNoticiasRoutes from './eventosNoticiasRoutes.js'

const router = express.Router();

router.use('/candidatos', candidatosRoutes);
router.use('/sugerenciaVoto', sugerenciaVotoRoutes);
router.use('/users', usersRoutes);
router.use('/eventos_noticias', eventosNoticiasRoutes);

router.use('/propuestas', propuestasRoutes);

export default router