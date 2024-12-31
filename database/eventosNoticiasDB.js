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
    return result[0]; // Recuerda acceder al primer array que contiene los resultados.
  } catch (error) {
    console.error("Error en getRecentEventosNoticias:", error);
    throw error;
  }
};

export const getAllEventosNoticias = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetAllEventosNoticias()");
    //console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos y noticias" + error.message);
  }
};

export const addEventoNoticia = async (eventoNoticiaData) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_AddEventoNoticia(?, ?, ?, ?, ?)",
      [
        eventoNoticiaData.nombre,
        eventoNoticiaData.fecha,
        eventoNoticiaData.informacion,
        eventoNoticiaData.ubicacion,
        eventoNoticiaData.imagen,
      ]
    );
    console.log(result[0]);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar evento/noticia");
  }
};

export const updateEventoNoticia = async (eventoNoticiaData) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_UpdateEventoNoticia(?, ?, ?, ?, ?, ?)",
      [
        eventoNoticiaData.id,
        eventoNoticiaData.nombre,
        eventoNoticiaData.fecha,
        eventoNoticiaData.informacion,
        eventoNoticiaData.ubicacion,
        eventoNoticiaData.imagen,
      ]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar evento/noticia");
  }
};



export const getEventoNoticiaByIdFromDB = async (id) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_GetEventoNoticiaById(?)",
      [id]
    );
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos y noticias");
  }
};

export const changeEventoNoticiaStatus = async (id, estado) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_ChangeEventoNoticiaStatus(?, ?)",
      [id, estado]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cambiar el estado del evento/noticia");
  }
};