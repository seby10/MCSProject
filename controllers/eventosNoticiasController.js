import {
  getEventosNoticiasByDateFromDB,
  getRecentEventosNoticias,
  getAllEventosNoticias,
  addEventoNoticia,
  updateEventoNoticia,
  changeEventoNoticiaStatus,
  getEventoNoticiaByIdFromDB,
} from "../database/eventosNoticiasDB.js";

import path from "path";
import fs from "fs";

export const getEventosNoticiasByDate = async (req, res) => {
  try {
    const { date } = req.params;
    console.log("Fecha recibida:", date);
    const result = await getEventosNoticiasByDateFromDB(date);
    //console.log("Resultados:", result);
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
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEventoNoticia = async (req, res) => {
  try {
    const { nombre, fecha, informacion, ubicacion } = req.body;
    console.log("Noticia:", req.body);
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
    console.log("Noticia Details:", result);
    res.json({
      success: true,
      message: "Noticia insertada con éxito",
      response: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEventoNoticiaDetails = async (req, res) => {
  try {
    const { id, nombre, fecha, informacion, ubicacion } = req.body;

    console.log("Datos recibidos del cliente:", req.body);
    if (req.file) {
      console.log("Imagen recibida:", req.file.filename);
    }

    const currentNoticia = await getEventoNoticiaByIdFromDB(id);

    let imagenPath = currentNoticia.IMG_EVE_NOT;

    if (req.file) {
      if (currentNoticia.IMG_EVE_NOT) {
        const oldImagePath = path(
          currentNoticia.IMG_EVE_NOT
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagenPath = `/images/noticias/${req.file.filename}`;
    }

    const result = await updateEventoNoticia({
      id,
      nombre,
      fecha,
      informacion,
      ubicacion,
      imagen: imagenPath,
    });

    res.json({
      success: true,
      message: "Noticia actualizada con éxito",
      response: result,
    });
  } catch (error) {
    console.error("Error en updateEventoNoticiaDetails:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const getEventoNoticiaById = async (req, res) => {
//   try {
//     const { id } = req.params || {}; // Asegúrate de que params no es undefined
//     if (!id) {
//       return res.status(400).json({ error: "ID is required" });
//     }
//     console.log("Id recibido:", id);
//     const result = await getEventosNoticiasByIdFromDB(id);
//     console.log("Resultados:", result);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error al obtener eventos y noticias", error });
//   }
// };

export const toggleEventoNoticiaStatus = async (req, res) => {
  console.log("Método de solicitud:", req.method);
  console.log("Encabezados de la solicitud:", req.headers);
  console.log("Cuerpo de la solicitud:", req.body);

  try {
    const { id, estado } = req.body;

    if (!id || estado === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "ID y estado son obligatorios" 
      });
    }

    const result = await changeEventoNoticiaStatus(id, estado);

    res.json({ success: true, response: result });
  } catch (error) {
    console.error("Error en toggleEventoNoticiaStatus:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
