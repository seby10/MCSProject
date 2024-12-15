import { getConnection } from "../helpers/connection.js";

export const getPropuestaByGrupDirDB = async (grup, idCandidato) => {
  try {
    const connection = await getConnection();
    // Ejecutamos el procedimiento pasando ambos parámetros
    const [result] = await connection.query("CALL GetPropuestaByGrupDir(?, ?)", [
      grup,
      idCandidato,
    ]);
    return result[0]; // Se asume que result es un array de propuestas
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la propuesta");
  }
};

export const getCategoriasDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL GetCategorias()");
    console.log(result);
    return result; // Devuelve las categorías únicas
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las categorías");
  }
};

export const getPropuestasDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL obtenerPropuestas()" ) ;
    console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los propuestas: " + error.message);
  }
};


export const insertPropuestaDB = async (NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, URL_IMAGEN) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL InsertarPropuesta(?, ?, ?, ?, ?)",
      [NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, URL_IMAGEN]  // Pasar los parámetros como valores
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al insertar la propuesta");
  }
};


export const updatePropuestaDB = async (ID_PRO, NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, ESTADO, URL_IMAGEN) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "CALL ActualizarPropuesta(?, ?, ?, ?, ?, ?, ?)",
      [ID_PRO, NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, ESTADO, URL_IMAGEN]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar la propuesta");
  }
};

export const getPropuestaByIdDB = async (idPropuesta) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query('CALL getPropuestaById(?)', [idPropuesta]);
    console.log(result);
    return result[0]; // Asumiendo que el procedimiento devuelve una única propuesta
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la propuesta");
  }
};


export const deletePropuestaDB = async (ID_PRO) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL EliminarPropuesta(?)", [
      ID_PRO,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la propuesta");
  }
};
