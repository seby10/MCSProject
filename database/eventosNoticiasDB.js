import { getConnection } from "../helpers/connection.js";

export const getEventosNoticiasByDateFromDB = async (date) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_GetEventosNoticiasByDate(?)", 
      [date]
    );
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos y noticias");
  }
};

export const getRecentEventosNoticias = async (limit = 5) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_GetRecentEventosNoticias(?)", 
      [limit]
    );
    return result[0];  // Recuerda acceder al primer array que contiene los resultados.
  } catch (error) {
    console.error("Error en getRecentEventosNoticias:", error);
    throw error;
  }
};
