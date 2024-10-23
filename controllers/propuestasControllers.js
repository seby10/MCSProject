import { getPropuestaByIDFromDB } from "../database/propuestasDB.js";

export const getPropuestaByID = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await getPropuestaByIDFromDB(id); 
    res.json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las propuestas", error });
  }
};
