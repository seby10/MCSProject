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

export const updateCandidatoDB = async (candidatoData)=> {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL sp_updateCandidato(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        candidatoData.id,
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
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el candidato: " + error.message);
  }
};
export const insertCandidatoDB = async (candidatoData) => {
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

