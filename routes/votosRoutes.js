import express from "express";
import {
  addVotos,
} from "../controllers/votosControllers.js";

const router = express.Router();

router.post("/addVotos", addVotos);



export default router;
