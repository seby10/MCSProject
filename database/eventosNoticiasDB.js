import { getConnection } from "../helpers/connection.js";

export const getEventosNoticiasByDateFromDB = async (date) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT NOM_EVE_NOT, INF_EVE_NOT, FEC_EVE_NOT, UBI_EVE_NOT FROM eventos_noticias WHERE DATE(FEC_EVE_NOT) = DATE(?)",
      [date]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos y noticias");
  }
};

export const getRecentEventosNoticias = async (limit = 5) => {
  try {
    console.log('Consultando eventos recientes, límite:', limit);
    const connection = await getConnection();
    const [result] = await connection.query(
      `SELECT NOM_EVE_NOT, INF_EVE_NOT, FEC_EVE_NOT, UBI_EVE_NOT 
       FROM eventos_noticias 
       WHERE FEC_EVE_NOT >= CURDATE() 
       ORDER BY FEC_EVE_NOT ASC 
       LIMIT ?`,
      [limit]
    );
    console.log('Resultados de la consulta:', result);
    return result;
  } catch (error) {
    console.error("Error en getRecentEventosNoticias:", error);
    throw error;
  }
};
