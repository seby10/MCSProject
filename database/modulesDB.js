import mssql from "mssql";
import { getConnection, sql } from "../helpers/connection.js";

export const selectModules = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spSelectModules");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting modules: " + error.message);
  }
};

export const deleteModule = async ({ moduleId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, moduleId)
      .execute("spDeleteModule");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const deleteRelModule = async ({ moduleId }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, moduleId)
      .execute("spDeleteRelModule");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const updateActiveModuleDB = async ({ moduleId, isActive }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, moduleId)
      .input("activo", sql.Int, isActive)
      .execute("spUpdateActiveModule");

    console.log("Rows affected:", result.rowsAffected); 
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error updating module active status: " + error.message);
  }
};

export const getModulenotId = async ({ id, nombre }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("id", sql.Int, id)
      .execute("spGetModulenotId");
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting role");
  }
};

export const updateModuleDB = async ({ id, nombre }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .execute("spUpdateModule");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const GetModulebyName = async ({ mName }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, mName)
      .execute("spGetModulebyName");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting module name");
  }
};

export const registerModule = async ({ mName, isActive }) => {
  try {
      const pool = await getConnection();
      const result = await pool
          .request()
          .input("nombre", sql.VarChar, mName)
          .input("activo", sql.Int, isActive)
          .execute("spInsertModule");

      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting role");
  }
};
