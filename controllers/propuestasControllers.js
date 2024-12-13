import { 
  getPropuestaByGrupDirDB, 
  getCategoriasDB, 
  getPropuestasDB, 
  insertPropuestaDB, 
  updatePropuestaDB, 
  deletePropuestaDB 
} from "../database/propuestasDB.js";

export const getPropuestaByGrupDir = async (req, res) => {
  try {
    const { grup } = req.params;
    console.log('Grupo recibido:', grup);
    const result = await getPropuestaByGrupDirDB(grup);
    console.log('Resultados:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las propuestas", error });
  }
};

export const getCategorias = async (req, res) => {
  try {
    const categorias = await getCategoriasDB();
    res.json(categorias);
    console.log(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};

export const getPropuestas = async (req, res) => {
  try {
    const result = await getPropuestasDB();
    const response = result;
    res.json({ message: "Propuestas obtenidas con éxito", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las propuestas", error });
  }
};

export const insertPropuesta = async (req, res) => {
  try {
    const { NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, URL_IMAGEN } = req.body; // Nuevos parámetros
    await insertPropuestaDB(NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, URL_IMAGEN);
    res.status(201).json({ message: "Propuesta creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la propuesta" });
  }
};

export const updatePropuesta = async (req, res) => {
  try {
    const { ID_PRO, NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, ESTADO, URL_IMAGEN } = req.body; // Nuevos parámetros
    await updatePropuestaDB(ID_PRO, NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, ESTADO, URL_IMAGEN);
    res.status(200).json({ message: "Propuesta actualizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la propuesta" });
  }
};

export const deletePropuesta = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePropuestaDB(id);
    res.status(200).json({ message: "Propuesta eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la propuesta" });
  }
};
