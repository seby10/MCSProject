import { getEventosNoticiasByDateFromDB } from "../database/eventosNoticiasDB.js";

export const getEventosNoticiasByDate = async (req, res) => {
  try {
    const { date } = req.params;
    //console.log('Fecha recibida:', date);
    const result = await getEventosNoticiasByDateFromDB(date);
    //console.log('Resultados:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener eventos y noticias", error });
  }
};