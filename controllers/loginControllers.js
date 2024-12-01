import { loginUs } from "../database/loginDB.js";
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const response = await loginUs({ name, password });
    console.log(response);
    if (response) {
      res.json({ success: true, user: response });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
