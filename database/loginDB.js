import { getConnection } from "../helpers/connection.js";

export const loginUs = async ({ name, password }) => {
  try {
    const pool = await getConnection();
    const [rows, fields] = await pool.execute("CALL spValidateLogin(?, ?)", [
      name,
      password,
    ]);
    console.log(rows);
    if (rows[0].length === 0) {
      return null; 
    }
    console.log(rows);
    const loggedInUser = rows[0][0];
    return {
      id: loggedInUser.id,
      name: loggedInUser.name,
      role: loggedInUser.role,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in user");
  }
};
