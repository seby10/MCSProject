import {
  getCandidatoByIDFromDB,
  getCandidatosDB,
  updateCandidatoDB,
  insertCandidatoDB,
} from "../database/candidatosDB.js";

import path from "path";
import fs from "fs";

export const getCandidatoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCandidatoByIDFromDB(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el candidato", error });
  }
};

export const getCandidatos = async (req, res) => {
  try {
    const result = await getCandidatosDB();
    const response = result;
    res.json({ message: "Menus Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting menus", error });
  }
};

export const putCandidato = async (req, res) => {
  try {
    const {
      id,
      nombre,
      apellido,
      fechaNacimiento,
      cargo,
      informacion,
      partido,
      activo,
    } = req.body;
    const currentCandidato = await getCandidatoByIDFromDB(id);

    let imagenPath = currentCandidato.IMG_CAN;

    if (req.file) {
      if (currentCandidato.IMG_CAN) {
        const oldImagePath = path.join(
          __dirname,
          "../public",
          currentCandidato.IMG_CAN
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      imagenPath = `/images/candidatos/${req.file.filename}`;
    }

    const result = await updateCandidatoDB({
      id:id,
      nombre: nombre,
      apellido: apellido, 
      fechaNacimiento: fechaNacimiento, 
      cargo: cargo, 
      informacion: informacion, 
      partido: partido, 
      activo: activo, 
      imagen: imagenPath,
    });

    res.json({
      success: true,
      message: "Candidato actualizado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el candidato",
      error,
    });
  }
};

export const postCandidato = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      fechaNacimiento,
      cargo,
      informacion,
      partido,
      activo,
    } = req.body;
    
    let imagenPath = null;
    if (req.file) {
      imagenPath = `/images/candidatos/${req.file.filename}`;
    }

    const result = await insertCandidatoDB({
      nombre: nombre,
      apellido: apellido, 
      fechaNacimiento: fechaNacimiento, 
      cargo: cargo, 
      informacion: informacion, 
      partido: partido, 
      activo: activo, 
      imagen: imagenPath,
    });

    res.json({
      success: true,
      message: "Candidato insertado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al insertar el candidato",
      error,
    });
  }
};


