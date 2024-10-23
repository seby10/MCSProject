import express from "express";
import { getEventosNoticiasByDate } from "../controllers/eventosNoticiasController.js";

const router = express.Router();

router.get("/getEventosNoticias/:date", getEventosNoticiasByDate);

export default router;