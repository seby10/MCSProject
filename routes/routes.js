import express from "express";
import eventosNoticiasRoutes from './eventosNoticiasRoutes.js'

const router = express.Router();

router.use('/eventos_noticias', eventosNoticiasRoutes);

export default router