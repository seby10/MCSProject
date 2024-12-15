import {
  getAdminsDB,
  updateAdminDB,
  insertAdminDB,
} from "../database/adminsDB.js";

export const getAdmins = async (req, res) => {
  try {
    const result = await getAdminsDB();
    const response = result;
    res.json({ message: "Admins Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting Admins", error });
  }
};

export const putAdmin = async (req, res) => {
  try {
    const { id, nombre, contrasenia, rol, activo } = req.body;
    const result = await updateAdminDB({
      id: id,
      nombre: nombre,
      contraseña: contrasenia,
      rol: rol,
      activo: activo,
    });

    res.json({
      success: true,
      message: "Admin actualizado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el admin: " + error.message,
      error,
    });
  }
};

export const postAdmin = async (req, res) => {
  try {
    const { nombre, contrasenia, rol } = req.body;
    console.log(nombre, contrasenia, rol);
    const result = await insertAdminDB({
      nombre: nombre,
      contraseña: contrasenia,
      rol: rol,
    });

    res.json({
      success: true,
      message: "Administrador insertado con éxito",
      response: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al insertar el Administrador",
      error,
    });
  }
};
