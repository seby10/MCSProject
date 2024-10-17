import mssql from "mssql";
import { getConnection, sql } from "../helpers/connection.js";

export const loginUs = async ({ email, password }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .execute("dbo.ValidateLogin");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error login user");
  }
};
