import { getConnection } from "../helpers/connection.js"; 

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