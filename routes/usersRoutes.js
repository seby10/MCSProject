import express from "express";
import { getEmail,findByEmail, createUser  } from "../controllers/usersControllers.js";


const router = express.Router();

router.post("/findByEmail", findByEmail);

router.post("/createUser", createUser);

router.post("/getEmail", getEmail);


export default router;