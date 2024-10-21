import { getConnection } from "../helpers/connection.js"; // Asegúrate de que la ruta sea correcta

export const insertVotosDB = async ({ canVoto, date }) => {
  try {
    const connection = await getConnection(); // Obtén la conexión
    const query = 'CALL spInsertarVoto(?, ?)'; // Llama al stored procedure
    const [result] = await connection.execute(query, [canVoto, date]);
    console.log('Vote inserted:', result);
    return result;
  } catch (error) {
    console.error("Error inserting vote:", error);
    throw new Error("Error inserting vote: " + error.message);
  }
};
