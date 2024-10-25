import { getConnection } from "../helpers/connection.js";

export const getPropuestaByGrupDirDB = async (grup) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CAN FROM propuestas WHERE GRUP_DIR_PRO = ?",
      [grup]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la propuesta");
  }
};
