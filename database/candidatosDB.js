import sql from 'mssql';
import { getConnection } from "../helpers/connection.js";

export const getCandidatoByIDFromDB = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_CAN", sql.Int, id) 
      .execute("sp_GetCandidatoByID");

    return result.recordset;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el candidato");
  }
};
