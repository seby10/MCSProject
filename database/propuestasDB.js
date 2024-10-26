import { getConnection } from "../helpers/connection.js";

export const getPropuestaByGrupDirDB = async (grup) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL GetPropuestaByGrupDir(?)", [
      grup,
    ]);
    return result[0]; 
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la propuesta");
  }
};
