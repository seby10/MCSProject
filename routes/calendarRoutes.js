import express from "express";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../controllers/calendarController.js";

const router = express.Router();

router.post("/getEvents", getEvents);

router.post("/addEvent", addEvent);

router.post("/updateEvent", updateEvent);

router.post("/deleteEvent", deleteEvent);

export default router;