import { 
  getPropuestaByGrupDirDB, 
  getCategoriasDB, 
  getPropuestasDB, 
  insertPropuestaDB, 
  updatePropuestaDB, 
  getPropuestaByIdDB,
  deletePropuestaDB 
} from "../database/propuestasDB.js";

export const getPropuestaByGrupDir = async (req, res) => {
  try {
    const { grup } = req.params; // Extrae el nombre del grupo
    const idCandidato = req.query.idCandidato || null; // Obtén el id del candidato desde la query (si existe)

    // Llama a la función con ambos parámetros
    const result = await getPropuestaByGrupDirDB(grup, idCandidato);

    res.json(result); // Responde con las propuestas obtenidas
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
    const { NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO } = req.body;

    // Manejar la imagen subida
    let imagenPath = null;
    if (req.file) {
      // Guardar la ruta relativa de la imagen para almacenar en la base de datos
      imagenPath = `/images/propuestas/${req.file.filename}`;
    } else {
      imagenPath = 'holi'; // Si no se sube imagen, pasamos una cadena vacía
    }



    // Llamar al método para insertar en la base de datos
    const result = await insertPropuestaDB(NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, imagenPath);

    res.json({ success: true, message: 'Propuesta creada con éxito', response: result });
  } catch (error) {
    console.error('Error al crear la propuesta:', error);
    res.status(500).json({ success: false, message: 'Error al crear la propuesta', error });
  }
};



// Método para actualizar una propuesta existente
export const updatePropuesta = async (req, res) => {
  try {
    const { ID_PRO, NOM_PRO, GRUP_DIR_PRO, INF_PRO, ID_CANT_PRO, ESTADO } = req.body;

    // Obtener la propuesta actual para manejar la imagen
    const currentPropuesta = await getPropuestaByIdDB(ID_PRO);

    if (!currentPropuesta) {
      return res.status(404).json({ success: false, message: 'Propuesta no encontrada' });
    }

    let imagenPath = currentPropuesta.URL_IMAGEN; // Mantener la imagen actual por defecto

    // Si se sube una nueva imagen
    if (req.file) {
      // Borrar la imagen anterior si existe
      if (currentPropuesta.URL_IMAGEN) {
        const oldImagePath = path.join(__dirname, '../public', currentPropuesta.URL_IMAGEN);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Guardar la nueva imagen
      imagenPath = `/images/propuestas/${req.file.filename}`;
    }


    // Llamar al método para actualizar en la base de datos
    const result = await updatePropuestaDB(
      ID_PRO,
      NOM_PRO,
      GRUP_DIR_PRO,
      INF_PRO,
      ID_CANT_PRO,
      ESTADO,
      imagenPath
    );

    res.json({ success: true, message: 'Propuesta actualizada con éxito', response: result });
  } catch (error) {
    console.error('Error al actualizar la propuesta:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la propuesta', error });
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
