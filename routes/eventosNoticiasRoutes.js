import express from "express";
import upload from '../middleware/uploadMiddleware.js';
import {
  getEventosNoticiasByDate,
  getRecentEventos,
  getEventosNoticias,
  createEventoNoticia,
  updateEventoNoticiaDetails,
  toggleEventoNoticiaStatus,
  //getEventoNoticiaById
} from "../controllers/eventosNoticiasController.js";
const router = express.Router();

router.get("/getEventosNoticias/:date", getEventosNoticiasByDate);
router.get("/recent", getRecentEventos);
router.get("/getEventosNoticiasAll", getEventosNoticias);
router.post("/addEventoNoticia", upload.single('imagen'), createEventoNoticia);
//router.get("/getEventosNoticiasById/:id", getEventoNoticiaById);
router.put("/updateEventoNoticia", upload.single('imagen'), updateEventoNoticiaDetails);
router.put("/toggleStatus", toggleEventoNoticiaStatus);
export default router;
