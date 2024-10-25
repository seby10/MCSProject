import { getPropuestaByGrupDirDB } from "../database/propuestasDB.js";

export const getPropuestaByGrupDir = async (req, res) => {
  try {
    const { grup } = req.params; 
    console.log('Grupo recibido:', grup);
    const result = await getPropuestaByGrupDirDB(grup); 
    console.log('Resultados:', result);
    res.json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las propuestas", error });
  }
};
