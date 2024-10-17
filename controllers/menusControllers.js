import {
  selectMenus,
  deleteMenu,
  updateActiveMenuDB,
  getMenunotId,
  updateMenuDB,
  GetMenubyName,
  registerMenu,
  registerMenuModule,
  deleteRelMenu,
  selectRelations,
  deleteRel,
  deleteMenuRole,
} from "../database/menusDB.js";

export const getAllMenus = async (req, res) => {
  try {
    const result = await selectMenus();
    const response = result.recordset;
    res.json({ message: "Menus Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting menus", error });
  }
};
export const getAllRel = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await selectRelations({id});
    const response = result.recordset;
    res.json({ message: "Relations Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting relations", error });
  }
};
export const removeMenu = async (req, res) => {
  try {
    const { menuId } = req.body;
    const result = await deleteMenu({ menuId });

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

export const removeRelMenu = async (req, res) => {
  try {
    const { menuId } = req.body;
    const result = await deleteRelMenu({ menuId });

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

export const removeMenuRole = async (req, res) => {
  try {
    const { menuId } = req.body;
    const result = await deleteMenuRole({ menuId });

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

export const removeRel = async (req, res) => {
  try {
    const { menuId, moduleId } = req.body;
    const result = await deleteRel({ menuId , moduleId });

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

export const updateActiveMenu = async (req, res) => {
  try {
    const { menuId, isActive } = req.body;

    const result = await updateActiveMenuDB({ menuId, isActive });
    console.log("Database update result:", result);
    res.json({ message: "Menu Updated!", result });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Error updating menu!", error });
  }
};

export const checkMenu = async (req, res) => {
  try {
    const { id, nombre } = req.body;
    const menuExists = await getMenunotId({ id, nombre });

    res.json(menuExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting menu", error });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id, nombre } = req.body;
    const result = await updateMenuDB({ id, nombre });
    res.json({ message: "Module Updated!", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating module!", error });
  }
};

export const checkName = async (req, res) => {
  try {
    const { mName } = req.body;
    const response = await GetMenubyName({ mName });

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

export const addMenu = async (req, res) => {
  try {
    const { mName, isActive } = req.body;
    const result = await registerMenu({ mName, isActive });
    const response = result.recordset[0];
    res.json({ message: "Menu inserted!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting menu", error });
  }
};

export const addMenuModule = async (req, res) => {
  try {
    const { idMenu, idModule } = req.body;
    const result = await registerMenuModule({ idMenu, idModule });
    res.json({ message: "Menu-Module relation inserted!", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting menu-module", error });
  }
};
