import mssql from "mssql";
import { getConnection } from "../helpers/connection.js";

export const registerRole = async ({ rName, rDescription }) => {
  try {
      const pool = await getConnection();
      const result = await pool
          .request()
          .input("role_name", sql.VarChar, rName)
          .input("description", sql.VarChar, rDescription)
          .execute("spInsertRole");

      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting role");
  }
};

export const registerMenuRole = async ({ roleID, menuID }) => {
  try {
      const pool = await getConnection();
      const result = await pool
          .request()
          .input("roleID", sql.Int, roleID)
          .input("menuID", sql.Int, menuID)
          .execute("spInsertMenuRole");

      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting role");
  }
};


export const selectRoles = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spSelectRoles");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting roles: " + error.message);
  }
};

export const selectRelMenus = async ({ id }) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
    .input("RolID", sql.Int, id)
    .execute("spSelectRelMenus");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting relations: " + error.message);
  }
};
export const deleteRole = async ({ roleId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, roleId)
      .execute("spDeleteRole");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};
export const deleteMenuRole = async ({ roleId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("RolID", sql.Int, roleId)
      .execute("DesactivarRelacionesPorRol");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const deleteMenuFromRole = async ({ roleId, menuId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("RolID", sql.Int, roleId)
      .input("MenuID", sql.Int, menuId)
      .execute("spDeactivateMenuRole");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const updateRoleDB = async ({ role_id ,role_name, description }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("role_id", sql.Int, role_id)
      .input("role_name", sql.VarChar, role_name)
      .input("description", sql.VarChar, description)
      .execute("spUpdateRole");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const GetRolebyName = async ({ rName }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("role_name", sql.VarChar, rName)
      .execute("spGetRolebyName");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting email");
  }
};

export const getRolenotId = async ({ name, id }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("role_name", sql.VarChar, name)
      .input("role_id", sql.Int, id)
      .execute("spGetRolenotId");
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting role");
  }
};
