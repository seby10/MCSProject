import mssql from "mssql";
import { getConnection, sql } from "../helpers/connection.js";

export const registerAuthor = async ({ fName, lName, email, password }) => {
  try {
      const pool = await getConnection();
      const result = await pool
          .request()
          .input("first_name", sql.VarChar, fName)
          .input("last_name", sql.VarChar, lName)
          .input("email", sql.VarChar, email)
          .input("password", sql.VarChar, password)
          .execute("spInsertUser");

      return result;
  } catch (error) {
      console.error(error);
      throw new Error("Error inserting author");
  }
};

