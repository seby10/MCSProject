import { insertSugerenciasDB } from "../database/sugerenciasDB.js";
import { sendMail } from "../helpers/mailer.js"; 

export const addSugerencias = async (req, res) => {
    try {
        const { fecha, descripcion, userId, correo } = req.body; 
        const result = await insertSugerenciasDB({ fecha, descripcion, userId });

        await sendMail(correo, 'Sugerencia Recibida', `Tu sugerencia: ${descripcion} ha sido recibida.`);

        res.json({ message: "Sugerencia añadida y correo enviado!", sugerenciaID: result.recordset });
    } catch (error) {
        console.error("Error adding Sugerencia:", error);
        res.status(500).json({ message: "Error adding Sugerencia", error: error.message });
    }
};
