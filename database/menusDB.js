import mssql from "mssql";
import { getConnection} from "../helpers/connection.js";

export const selectMenus = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spSelectMenus");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting menus: " + error.message);
  }
};

export const selectRelations = async ({ id }) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
    .input("MenuID", sql.Int, id)
    .execute("spSelectRelations");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting relations: " + error.message);
  }
};

export const deleteMenu = async ({ menuId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, menuId)
      .execute("spDeleteMenu");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};
export const deleteRelMenu = async ({ menuId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, menuId)
      .execute("spDeleteRelMenu");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const deleteRel = async ({ menuId, moduleId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("MenuID", sql.Int, menuId)
      .input("ModuleID", sql.Int, moduleId)
      .execute("spDeleteMenuModule");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const deleteMenuRole = async ({ menuId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("MenuID", sql.Int, menuId)
      .execute("DesactivarRelacionesPorMenu");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const updateActiveMenuDB = async ({ menuId, isActive }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, menuId)
      .input("activo", sql.Int, isActive)
      .execute("spUpdateActiveMenu");

    console.log("Rows affected:", result.rowsAffected); 
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error updating menu active status: " + error.message);
  }
};

export const getMenunotId = async ({ id, nombre }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("id", sql.Int, id)
      .execute("spGetMenunotId");
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting menu");
  }
};

export const updateMenuDB = async ({ id, nombre }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .execute("spUpdateMenu");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating: " + error.message);
  }
};

export const GetMenubyName = async ({ mName }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, mName)
      .execute("spGetMenubyName");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting module name");
  }
};

export const registerMenu = async ({ mName, isActive }) => {
  try {
      const pool = await getConnection();
      console.log(isActive);
      const result = await pool
          .request()
          .input("nombre", sql.VarChar, mName)
          .input("activo", sql.Int, isActive)
          .execute("spInsertMenu");
      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting menu");
  }
};

export const registerMenuModule = async ({ idMenu, idModule }) => {
  try {
      const pool = await getConnection();
      const result = await pool
          .request()
          .input("MenuID", sql.Int, idMenu)
          .input("ModuleID", sql.Int, idModule)
          .execute("spInsertMenuModule");
      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting menu-module relation");
  }
};
