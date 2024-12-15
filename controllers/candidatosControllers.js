import { getCandidatoByIDFromDB, getCandidatosDB} from "../database/candidatosDB.js";

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

export const getCandidatos = async (req, res) => {
  try {
    const result = await getCandidatosDB();
    const response = result;
    res.json({ message: "Menus Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting menus", error });
  }
};
