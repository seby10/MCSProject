import { loginUs } from "../database/loginDB.js";
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUs({ email, password });

    if (response?.recordset?.length > 0) {
        const user = response.recordset[0]; 
        res.json({ success: true, user });
      } else {
        res.json({ success: false });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
