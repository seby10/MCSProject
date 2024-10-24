import { getEventosNoticiasByDateFromDB, getRecentEventosNoticias } from "../database/eventosNoticiasDB.js";

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


export const getRecentEventos = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const result = await getRecentEventosNoticias(limit);
    //console.log('Resultados:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener eventos recientes", error });
  }
};