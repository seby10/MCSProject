import { getConnection } from "../helpers/connection.js";

export const updateDataInDB = async (data) => {
  try {
    const connection = await getConnection();

    const [result] = await connection.query(
      "CALL sp_updateData(?, ?, ?, ?, ?, ?, ?)",
      [
        data.Title1,
        data.Title2,
        data.Title3,
        data.color,
        data.logo || null,    
        data.icon || null,   
        data.background || null 
      ]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error al actualizar datos en la base de datos:", error);
    throw new Error("Error al actualizar datos en la base de datos: " + error.message);
  }
};

export const getDataDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetData()");
    console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los Data: " + error.message);
  }
};