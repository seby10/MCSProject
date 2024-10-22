import mssql from "mssql";
import { getConnection} from "../helpers/connection.js";

export const selectUsers = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spSelectUsers");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error selecting users: " + error.message);
  }
};

export const deleteUser = async ({ id }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .execute("spDeleteUser");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const updateUserDB = async ({ fName, lName, email, password, id , role }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("first_name", sql.VarChar, fName)
      .input("last_name", sql.VarChar, lName)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("role", sql.Int, role)
      .execute("spUpdateUser");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting: " + error.message);
  }
};

export const GetUserbyEmail = async ({ email }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .execute("spGetUserbyEmail");
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting email");
  }
};

export const getEmailnotId = async ({ email, id }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("id", sql.Int, id)
      .execute("spGetEmailnotId");
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user");
  }
};
