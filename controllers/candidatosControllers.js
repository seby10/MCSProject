import { getCandidatoByIDFromDB } from "../database/candidatosDB.js";

export const getCandidatoByID = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await getCandidatoByIDFromDB(id); 
    res.json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el candidato", error });
  }
};
