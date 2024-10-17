import { selectEvents, insertEvent, updateEventDB, deleteEventDB } from "../database/calendarDB.js";

export const getEvents = async (req, res) => {
  try {
    const { usuarioID } = req.body;
    const events = await selectEvents({ usuarioID });
    res.json(events.recordset);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia } = req.body;
    const result = await insertEvent({ usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia });
    res.json({ message: "Event added!", eventID: result.recordset[0].NuevoEventoID });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Error adding event", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventoID, usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia } = req.body;
    await updateEventDB({ eventoID, usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia });
    res.json({ message: "Event updated!" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventData } = req.body;
    await deleteEventDB({ eventData });
    res.json({ message: "Event deleted!" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event", error });
  }
};