import { getConnection } from "../helpers/connection.js";

export const getAdminsDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetAdmins()");
    console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los Administradores: " + error.message);
  }
};

export const updateAdminDB = async (admin)=> {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_updateAdmin(?, ?, ?, ?, ?)",
      [
        admin.id,
        admin.nombre, 
        admin.contraseña,
        admin.rol,
        admin.activo,
      ]
    );
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el candidato: " + error.message);
  }
};
export const insertAdminDB = async (candidatoData) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_insertCandidato(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        candidatoData.nombre, 
        candidatoData.apellido,
        candidatoData.fechaNacimiento,
        candidatoData.cargo,
        candidatoData.informacion,
        candidatoData.partido,
        candidatoData.activo,
        candidatoData.imagen
      ]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al insertar el candidato: " + error.message);
  }
};