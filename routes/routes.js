import express from "express";
import votosRoutes from './votosRoutes.js';


const router = express.Router();

router.use('/votos', votosRoutes);


export default router