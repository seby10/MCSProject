import { getConnection } from "../helpers/connection.js"; 


export const getSugerenciasDB = async () => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("CALL sp_GetSugerencias()");
    console.log(result[0]);
    if (result.length === 0 || result[0].length === 0) {
      return [];
    }

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las sugerencias: " + error.message);
  }
};

export const updateSugerenciaEstadoDB = async ({ id, estado }) => {
  try {
    const connection = await getConnection();
    const query = 'CALL spActualizarEstadoSugerencia(?, ?)'; 
    const [result] = await connection.execute(query, [id, estado]);
    console.log('Sugerencia actualizada:', result);
    return result;
  } catch (error) {
    console.error("Error al actualizar el estado de la sugerencia:", error);
    throw new Error("Error al actualizar el estado de la sugerencia: " + error.message);
  }
};

export const insertSugerenciasDB = async ({ fecha, descripcion, userId }) => {
    let connection; 
    try {
        connection = await getConnection(); 
        const query = 'CALL spInsertarSugerencia(?, ?, ?)'; 
        const [result] = await connection.execute(query, [fecha, descripcion, userId]);
        
        console.log('Suggestion inserted:', result);
        return result;
    } catch (error) {
        console.error("Error inserting suggestion:", error);
        throw new Error("Error inserting suggestion: " + error.message);}
};

export const insertVotosDB = async ({ canVoto, date }) => {
    try {
      const connection = await getConnection(); 
      const query = 'CALL spInsertarVoto(?, ?)'; 
      const [result] = await connection.execute(query, [canVoto, date]);
      console.log('Vote inserted:', result);
      return result;
    } catch (error) {
      console.error("Error inserting vote:", error);
      throw new Error("Error inserting vote: " + error.message);
    }
  };
  