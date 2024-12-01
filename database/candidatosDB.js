import { getConnection } from "../helpers/connection.js";

export const getCandidatoByIDFromDB = async (id) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetCandidatoByID(?)", [
      id,
    ]);

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el candidato");
  }
};

export const getCandidatosDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetCandidatos()");
    console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los candidatos: " + error.message);
  }
};
