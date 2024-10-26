import { getConnection } from "../helpers/connection.js"; 
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
