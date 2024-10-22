import express from "express";
import {
    addSugerencias,
} from "../controllers/sugerenciasControllers.js";

const router = express.Router();

router.post("/addSugerencias", addSugerencias);



export default router;
