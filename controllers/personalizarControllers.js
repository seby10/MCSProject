import {
    updateDataInDB,
    getDataDB
} from "../database/personalizarDB.js";

export const updateData = async (req, res) => {
  try {
    const { Title1, Title2, Title3, color } = req.body;

    let logoPath = null;
    let iconPath = null;
    let backgroundPath = null;

    if (req.files) {
      if (req.files.logo) {
        logoPath = `/images/personalizacion/${req.files.logo[0].filename}`;
      }
      if (req.files.icon) {
        iconPath = `/images/personalizacion/${req.files.icon[0].filename}`;
      }
      if (req.files.background) {
        backgroundPath = `/images/personalizacion/${req.files.background[0].filename}`;
      }
    }

    const result = await updateDataInDB({
      Title1,
      Title2,
      Title3,
      color,
      logo: logoPath,
      icon: iconPath,
      background: backgroundPath,
    });

    res.json({
      success: true,
      message: "Datos actualizados con éxito",
      response: result,
    });
  } catch (error) {
    console.error("Error al actualizar datos:", error);

    res.status(500).json({
      success: false,
      message: "Error al actualizar los datos",
      error,
    });
  }
};


export const getData = async (req, res) => {
  try {
    const result = await getDataDB(); 
    
    const success = result ? true : false;

    res.json({
      success: success, 
      message: "Data Selected!",
      response: result 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false, 
      message: "Error selecting data",
      error: error.message 
    });
  }
};