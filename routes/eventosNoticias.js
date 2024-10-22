import express from 'express';
import { getConnection } from '../helpers/connection.js';

const eventosNoticiasRouter = express.Router();


eventosNoticiasRouter.get('/:fecha', async (req, res) => {
  const { fecha } = req.params;
  
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT NOM_EVE_NOT, INF_EVE_NOT, FEC_EVE_NOT, UBI_EVE_NOT FROM eventos_noticias WHERE FEC_EVE_NOT = ?',
      [fecha]
    );
    await connection.end();

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'No events or news found for this date' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events or news', error });
  }
});

export default eventosNoticiasRouter;
