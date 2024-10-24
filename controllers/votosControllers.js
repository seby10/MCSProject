import { insertVotosDB} from "../database/votosDB.js";

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
  
