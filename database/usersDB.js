import { getConnection } from "../helpers/connection.js"; 
export const GetUserbyEmail = async ({ email }) => {
  try {
    const connection = await getConnection();
    const query = 'CALL spGetUserbyEmail(?)';
    const [result] = await connection.execute(query, [email]);
    
    if (result[0].length > 0) {
      return result[0][0]; 
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error obteniendo el usuario por correo:", error);
    throw new Error("Error obteniendo el usuario por correo: " + error.message);
  }
};


export const insertUser = async ({ email }) => {
  try {
    const connection = await getConnection();
    const query = 'CALL spInsertUser(?)';
    const [result] = await connection.execute(query, [email]);
    
    console.log('Resultado del procedimiento almacenado:', result);

    if (result && result[0] && result[0][0]) {
      return { userId: result[0][0].userId }; 
    } else {
      throw new Error('No se pudo obtener el ID del usuario insertado');
    }
  } catch (error) {
    console.error("Error insertando el usuario:", error);
    throw new Error("Error insertando el usuario: " + error.message);
  }
};
