import {
  GetUserbyEmail,
  insertUser,
} from "../database/usersDB.js";

export const findByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await GetUserbyEmail({ email });

    if (user) {
      res.json({ userId: user.ID_USU });
    } else {
      // Si no existe el usuario, crearlo
      const result = await insertUser({ email });
      res.json({ userId: result.userId }); // Devuelve el nuevo ID de usuario creado
    }
  } catch (error) {
    console.error("Error en findByEmail:", error);
    res.status(500).json({ message: "Error al buscar o crear el usuario por correo", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "El correo electrónico es obligatorio" });
    }

    const result = await insertUser({ email });
    console.log('Usuario insertado con ID:', result.userId);

    res.json({ userId: result.userId });
  } catch (error) {
    console.error('Error en createUser:', error);
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};


export const getEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await GetUserbyEmail({ email });

    if (response && response.recordset && response.recordset.length > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting email", error });
  }
};
