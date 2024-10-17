import express from "express";
import { getAllUsers, removeUser, updateUser, getEmail, checkEmail } from "../controllers/usersControllers.js";


const router = express.Router();

router.post("/getAllUsers", getAllUsers);

router.post("/deleteUser", removeUser);

router.post("/updateUser", updateUser);

router.post("/getEmail", getEmail);

router.post("/checkEmail", checkEmail);

export default router;