import {
    selectRoles,
    deleteRole,
    updateRoleDB,
    GetRolebyName,
    getRolenotId,
    registerRole,
    deleteMenuRole,
    registerMenuRole,
    selectRelMenus,
    deleteMenuFromRole,
  } from "../database/rolesDB.js";

  export const addRole = async (req, res) => {
    try {
        const { rName, rDescription } = req.body;
        const result = await registerRole({ rName, rDescription });
        res.json({ message: "Role inserted!", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error inserting author", error });
    }
};
export const addMenuToRole = async (req, res) => {
  try {
      const { roleID, menuID } = req.body;
      const result = await registerMenuRole({ roleID, menuID });
      res.json({ message: "Role inserted!", result });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error inserting author", error });
  }
};
  export const getAllRoles = async (req, res) => {
    try {
      const result = await selectRoles();
      const response= result.recordset;
      res.json({ message: "Roles Selected!", response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error selecting roles", error });
    }
  };

  export const getAllRelMenus = async (req, res) => {
    try {
      const { id } = req.body;
      const result = await selectRelMenus({id});
      const response = result.recordset;
      res.json({ message: "Relations Selected!", response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error selecting relations", error });
    }
  };
  
  export const removeRole = async (req, res) => {
    try {
      const { roleId } = req.body;
      const result = await deleteRole({ roleId });
  
      if (result.recordset) {
        res.json({ success: true});
      } else {
        res.json({ success: false});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user", error });
    }
  };
  export const removeMenuRole = async (req, res) => {
    try {
      const { roleId } = req.body;
      const result = await deleteMenuRole({ roleId });
  
      if (result.recordset) {
        res.json({ success: true});
      } else {
        res.json({ success: false});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user", error });
    }
  };
  export const removeMenuFromRole = async (req, res) => {
    try {
      const { roleId, menuId } = req.body;
      const result = await deleteMenuFromRole({ roleId, menuId });
  
      if (result.recordset) {
        res.json({ success: true});
      } else {
        res.json({ success: false});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting rel", error });
    }
  };
  
  export const updateRole = async (req, res) => {
    try {
      const {role_id, role_name, description } = req.body;
      const result = await updateRoleDB({ role_id, role_name, description });
      res.json({ message: "Role Updated!", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating role!", error });
    }
  };
  
  export const getRole = async (req, res) => {
    try {
      const { rName } = req.body;
      const response = await GetRolebyName({ rName });
  
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
  
  export const checkRole = async (req, res) => {
    try {
      const { name,id } = req.body;
      const roleExists = await getRolenotId({ name, id });
  
      res.json(roleExists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting role", error });
    }
  };
  