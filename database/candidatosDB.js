import { getConnection } from "../helpers/connection.js";

export const getCandidatoByIDFromDB = async (id) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetCandidatoByID(?)", [id]);

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el candidato");
  }
};
