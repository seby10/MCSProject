import {
  getEventosNoticiasByDateFromDB,
  getRecentEventosNoticias,
  getAllEventosNoticias,
  getEventoNoticiaById,
  addEventoNoticia, 
  updateEventoNoticia,
  changeEventoNoticiaStatus
} from "../database/eventosNoticiasDB.js";

import path from 'path';
import fs from 'fs';

export const getEventosNoticiasByDate = async (req, res) => {
  try {
    const { date } = req.params;
    console.log("Fecha recibida:", date);
    const result = await getEventosNoticiasByDateFromDB(date);
    console.log("Resultados:", result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener eventos y noticias", error });
  }
};

export const getRecentEventos = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const result = await getRecentEventosNoticias(limit);
    //console.log('Resultados:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener eventos recientes", error });
  }
};

export const getEventosNoticias = async (req, res) => {
  try {
    const eventosNoticias = await getAllEventosNoticias();
    res.json({ success: true, response: eventosNoticias });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEventoNoticia = async (req, res) => {
  try {
    const { nombre, fecha, informacion, ubicacion, estado } = req.body;
    
    // Manejar la imagen subida
    let imagenPath = null;
    if (req.file) {
      // Guardar la ruta relativa de la imagen para almacenar en la base de datos
      imagenPath = `/images/noticias/${req.file.filename}`;
    }

    const result = await addEventoNoticia({
      nombre,
      fecha,
      informacion,
      ubicacion,
      imagen: imagenPath,
    });

    res.json({ success: true, response: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEventoNoticiaDetails = async (req, res) => {
  try {
    const { id, nombre, fecha, informacion, ubicacion, estado } = req.body;
    
    // Primero, obtener la información actual de la noticia para manejar la imagen anterior
    const currentNoticia = await getEventoNoticiaById(id);
    
    let imagenPath = currentNoticia.imagen; // Mantener la imagen actual por defecto
    
    // Si se sube una nueva imagen
    if (req.file) {
      // Borrar la imagen anterior si existe
      if (currentNoticia.imagen) {
        const oldImagePath = path.join(__dirname, '../public', currentNoticia.imagen);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Guardar la nueva imagen
      imagenPath = `/images/noticias/${req.file.filename}`;
    }

    const result = await updateEventoNoticia({
      id,
      nombre,
      fecha,
      informacion,
      ubicacion,
      imagen: imagenPath,
      estado
    });

    res.json({ success: true, response: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleEventoNoticiaStatus = async (req, res) => {
  try {
    const { id, estado } = req.body;

    const result = await changeEventoNoticiaStatus(id, estado);

    res.json({ success: true, response: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
