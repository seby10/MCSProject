import {
  getCandidatoByIDFromDB,
  getCandidatosDB,
  updateCandidatoDB,
  insertCandidatoDB,
} from "../database/candidatosDB.js";

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

    const result = await updateCandidatoDB(
      id,
      nombre,
      apellido,
      fechaNacimiento,
      cargo,
      informacion,
      partido,
      activo
    );

    res.json({
      success: true,
      message: "Candidato actualizado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error al actualizar el candidato",
        error,
      });
  }
};

export const postCandidato = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      position,
      information,
      party,
      isActive,
    } = req.body;

    const result = await insertCandidatoDB(
      firstName,
      lastName,
      birthDate,
      position,
      information,
      party,
      isActive
    );

    res.json({
      success: true,
      message: "Candidato insertado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error al insertar el candidato",
        error,
      });
  }
};
