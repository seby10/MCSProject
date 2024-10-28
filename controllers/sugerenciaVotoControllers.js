import { insertSugerenciasDB, insertVotosDB } from "../database/sugerenciaVotoDB.js";
import { sendMail } from "../helpers/mailer.js"; 

export const addSugerencias = async (req, res) => {
    try {
        const { fecha, descripcion, userId, correo } = req.body; 
        const result = await insertSugerenciasDB({ fecha, descripcion, userId });

        await sendMail(correo, 'Sugerencia Recibida', `Tu sugerencia en la página de candidatos de la UTA es la siguiente: ${descripcion}.`);

        res.json({ message: "Sugerencia añadida y correo enviado!", sugerenciaID: result.recordset });
    } catch (error) {
        console.error("Error adding Sugerencia:", error);
        res.status(500).json({ message: "Error adding Sugerencia", error: error.message });
    }
};


export const addVotos = async (req, res) => {
    try {
      const { canVoto, date} = req.body;
      const result = await insertVotosDB({canVoto, date});
      res.json({ message: "Voto added!", votoID: result.recordset });
    } catch (error) {
      console.error("Error adding voto:", error);
      res.status(500).json({ message: "Error adding voto", error });
    }
  };
  
