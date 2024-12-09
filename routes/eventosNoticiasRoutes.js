import express from "express";
import upload from '../middleware/uploadMiddleware.js';
import {
  getEventosNoticiasByDate,
  getRecentEventos,
  getEventosNoticias,
  createEventoNoticia,
  updateEventoNoticiaDetails,
  toggleEventoNoticiaStatus,
} from "../controllers/eventosNoticiasController.js";
const router = express.Router();

router.get("/getEventosNoticias/:date", getEventosNoticiasByDate);
router.get("/recent", getRecentEventos);
router.get("/getEventosNoticias", getEventosNoticias);
router.post("/addEventoNoticia", upload.single('imagen'), createEventoNoticia);
router.post("/updateEventoNoticia", upload.single('imagen'), updateEventoNoticiaDetails);
router.post("/toggleEventoNoticiaStatus", toggleEventoNoticiaStatus);

export default router;
