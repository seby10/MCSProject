import express from "express";
import { getEventosNoticiasByDate, getRecentEventos } from "../controllers/eventosNoticiasController.js";

const router = express.Router();

router.get("/getEventosNoticias/:date", getEventosNoticiasByDate);

router.get("/recent", getRecentEventos);

export default router;