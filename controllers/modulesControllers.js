import { selectModules, deleteModule, updateActiveModuleDB, getModulenotId, updateModuleDB, GetModulebyName, registerModule, deleteRelModule } from "../database/modulesDB.js";

export const getAllModules = async (req, res) => {
  try {
    const result = await selectModules();
    const response = result.recordset;
    res.json({ message: "Modules Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting modules", error });
  }
};
export const removeModule = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const result = await deleteModule({ moduleId });

    if (result.recordset) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
export const removeRelModule = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const result = await deleteRelModule({ moduleId });

    if (result.recordset) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateActiveModule = async (req, res) => {
  try {
    const { moduleId, isActive } = req.body;

    const result = await updateActiveModuleDB({ moduleId, isActive });
    console.log("Database update result:", result);
    res.json({ message: "Module Updated!", result });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Error updating module!", error });
  }
};

export const checkModule = async (req, res) => {
  try {
    const { id,nombre } = req.body;
    const roleExists = await getModulenotId({ id, nombre });

    res.json(roleExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting role", error });
  }
};

  
export const updateModule = async (req, res) => {
  try {
    const {id,nombre} = req.body;
    const result = await updateModuleDB({ id,nombre });
    res.json({ message: "Module Updated!", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating module!", error });
  }
};

export const checkName = async (req, res) => {
  try {
    const { mName } = req.body;
    const response = await GetModulebyName({ mName });

    if (response && response.recordset && response.recordset.length > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting name", error });
  }
};

export const addModule = async (req, res) => {
  try {
      const { mName, isActive } = req.body;
      const result = await registerModule({ mName, isActive });
      res.json({ message: "Module inserted!", result });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error inserting module", error });
  }
};
