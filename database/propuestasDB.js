import { getConnection } from "../helpers/connection.js";

export const getPropuestaByIDFromDB = async (id) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetPropuestaByID(?)", [id]);

    return result[0]; // Retorna los resultados del procedimiento almacenado
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la propuesta");
  }
};
